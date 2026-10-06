import React, { useState, useEffect } from 'react';
import { 
  SafeAreaView, View, Text, FlatList, ActivityIndicator, StyleSheet 
} from 'react-native';

export default function App() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('https://6ac49b7554a61668c5f5d38c.mockapi.io/users')
      .then((response) => response.json())
      .then((json) => {
        setData(json);
        setIsLoading(false); 
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, []);
  const renderItem = ({ item }) => ( 
    <View style={styles.item}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.email}>{item.email}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Danh sách User</Text>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
      ) : (
        <View style={styles.listWrapper}>
          <FlatList
            data={data}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            horizontal={true} 
            showsHorizontalScrollIndicator={false}
          />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listWrapper: {
    height: 120,
  },
  item: {
    backgroundColor: '#fff',
    padding: 20,
    marginHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'center',
    minWidth: 200, 
  },
  name: {
    fontWeight: 'bold', 
    fontSize: 16,
    marginBottom: 8,
  },
  email: {
    fontSize: 14,
    color: '#666',
  },
});