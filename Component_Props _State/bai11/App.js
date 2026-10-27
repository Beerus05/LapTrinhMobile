import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';

const ProductSearch = () => {
  const [keyword, setKeyword] = useState('phone');
  const [products, setProducts] = useState([]);

  const fetchProducts = async (q, limit) => {
    const res = await fetch(`https://dummyjson.com/products/search?q=${q}&limit=${limit}`);
    const data = await res.json();
    setProducts(data.products);
  };

  return (
    <View>
      <TextInput value={keyword} onChangeText={setKeyword} style={{ borderWidth: 1 }} />
      <Button title="Search" onPress={() => fetchProducts(keyword, 5)} />
      <FlatList 
        data={products} 
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => <Text>{item.title}</Text>} 
      />
    </View>
  );
}

export default function App() {
  return (
    <View style={{ marginTop: 50 }}>
      <ProductSearch />
    </View>
  );
}