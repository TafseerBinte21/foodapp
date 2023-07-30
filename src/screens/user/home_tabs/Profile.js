
import {View, Text, StyleSheet, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../common/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    const userId = await AsyncStorage.getItem('USERID');
    const userRef = firestore().collection('users').doc(userId);
    userRef.get().then((doc) => {
      if (doc.exists) {
        setUser(doc.data());
      } else {
        console.log('No such document!');
      }
    }).catch((error) => {
      console.log('Error getting document:', error);
    });
  };

  return (
    <View style={styles.container}>
      <Header title={'Profile'} />
      {user ? (
        <View style={styles.content}>
          <Image
            source={{uri: user.photoURL}}
            style={styles.profileImage}
          />
          <Text style={styles.nameText}>Name: {user.name}</Text>
          <Text style={styles.emailText}>Email: {user.email}</Text>
          <Text style={styles.phoneText}>Mobile: {user.mobile}</Text>
          
        </View>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  nameText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color:'blue',
  },
  emailText: {
    fontSize: 18,
    marginBottom: 20,
    color:'blue',
  },
  phoneText: {
    fontSize: 18,
    marginBottom: 20,
    color:'blue',
  }
});

export default Profile;
