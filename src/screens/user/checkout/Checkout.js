import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import Header from '../../common/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';

const Checkout = ({ navigation }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    getCartItems();
  }, []);

  const getCartItems = async () => {
    const userId = await AsyncStorage.getItem('USERID');
    const user = await firestore().collection('users').doc(userId).get();
    setCartItems(user._data.cart);
    calculateTotalPrice(user._data.cart);
  };

  const calculateTotalPrice = (cart) => {
    let total = 0;
    cart.forEach((item) => {
      total += item.data.discountPrice * item.data.qty;
    });
    setTotalPrice(total);
  };

  const handleCheckout = async () => {
    const userId = await AsyncStorage.getItem('USERID');
    await firestore()
      .collection('users')
      .doc(userId)
      .update({ cart: [], orders: [...cartItems] });
    navigation.navigate('Orders');
  };

  return (
    <View style={styles.container}>
      <Header title={'Checkout'} />
      <View style={styles.cartItems}>
        {cartItems.map((item, index) => (
          <View key={index} style={styles.cartItem}>
            <Text style={styles.nameText}>{item.data.name}</Text>
            <Text style={styles.priceText}>
              {'Price: $' + item.data.discountPrice}
            </Text>
            <Text style={styles.priceText}>
              {'Quantity: ' + item.data.qty}
            </Text>
          </View>
        ))}
      </View>
      <View style={styles.totalPrice}>
        <Text style={styles.totalText}>{'Total Price: $' + totalPrice}</Text>
      </View>
      <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
        <Text style={styles.checkoutText}>CHECKOUT</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Checkout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cartItems: {
    marginHorizontal: 20,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 10,
  },
  cartItem: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  nameText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    flex: 1,
  },
  priceText: {
    fontSize: 14,
    color: '#555',
    marginHorizontal: 10,
  },
  totalPrice: {
    marginVertical: 20,
    alignItems: 'center',
  },
  totalText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
  },
  checkoutButton: {
    marginHorizontal: 20,
    marginVertical: 10,
    backgroundColor: '#55b',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  checkoutText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
});
