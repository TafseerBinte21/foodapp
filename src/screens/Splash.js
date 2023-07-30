import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Splash = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      checkLogin();
    }, 4000);
  }, []);
  const checkLogin = async () => {
    const email = null;
    console.log(email);
    if (email !== null) {
      navigation.navigate('Home');
    } else {
      navigation.navigate('SelectLogin');
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Food-App</Text>
    </View>
  );
};

export default Splash;
const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    fontSize: 30,
    fontWeight: '800',
    color: 'blue',
  },
});
