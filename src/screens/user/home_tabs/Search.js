
import React, {useState} from 'react';
import {View, TextInput, StyleSheet, Button, FlatList, Text} from 'react-native';
import Header from '../../common/Header';
import firestore from '@react-native-firebase/firestore';

const Search = () => {
  const [searchText, setSearchText] = useState('');
  const [searchResult, setSearchResult] = useState([]);

  const handleSearch = async () => {
    const itemsRef = firestore().collection('items');
    const query = itemsRef.where('name', '==', searchText).get();
    const snapshot = await query;
    const results = snapshot.docs.map(doc => doc.data());
    setSearchResult(results);
  };

  return (
    <View style={styles.container}>
      <Header title={'Search'} />
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          value={searchText}
          onChangeText={text => setSearchText(text)}
          placeholder="Enter item name"
        />
        <Button title="Search" onPress={handleSearch} />
      </View>
      <View style={styles.resultContainer}>
        {searchResult.length > 0 ? (
          <FlatList
            data={searchResult}
            keyExtractor={({item, index}) => index}
            renderItem={({item, index}) => {
              return (
                <View style={styles.itemContainer}>
                  <Text style={styles.nameText}>{item.name}</Text>
                  <Text style={styles.priceText}>
                    {'Price: ' + item.discountPrice}
                  </Text>
                  <Text style={styles.priceText}>
                    {item.description}
                  </Text>
                </View>
              );
            }}
          />
        ) : (
          <Text style={styles.noResultText}>No search results found.</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginVertical: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginRight: 10,
    paddingHorizontal: 10,
  },
  resultContainer: {
    flex: 1,
    marginHorizontal: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    paddingBottom: 5,
  },
  nameText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  priceText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#666',
  },
  noResultText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    textAlign: 'center',
    marginTop: 50,
  },
});

export default Search;


