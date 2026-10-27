import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';

const NewsFeed = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => response.json())
      .then(json => setData(json));
  }, []);

  return (
    <FlatList
      data={data}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => <Text>{item.title}</Text>}
    />
  );
}

export default function App() {
  return (
    <View style={{ marginTop: 50 }}>
      <NewsFeed />
    </View>
  );
}