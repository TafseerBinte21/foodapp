import {View, Text, StyleSheet, FlatList, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../common/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    getWishlistItems();
  }, []);

  const getWishlistItems = async () => {
    const userId = await AsyncStorage.getItem('USERID');
    const user = await firestore().collection('users').doc(userId).get();
    setWishlistItems(user._data.wishlist);
  };

  return (
    <View style={styles.container}>
      <Header title={'My Wishlist'} />
      <FlatList
        data={wishlistItems}
        keyExtractor={({item, index}) => index}
        renderItem={({item, index}) => {
          return (
            <View style={styles.wishlistItem}>
              <Image
                source={{uri: item.data.imageUrl}}
                style={styles.itemImage}
              />
              <View>
                <Text style={styles.nameText}>{item.data.name}</Text>
                <Text style={styles.nameText}>
                  {'Price: ' + item.data.discountPrice}
                </Text>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

export default Wishlist;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wishlistItem: {
    width: '90%',
    borderRadius: 10,
    elevation: 5,
    alignSelf: 'center',
    backgroundColor: '#fff',
    marginTop: 20,
    marginBottom: 10,
    flexDirection: 'row',
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  nameText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginLeft: 20,
    marginTop: 5,
  },
});
