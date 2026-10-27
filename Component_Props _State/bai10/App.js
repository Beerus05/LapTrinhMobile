import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';

const UserProfile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users/1')
      .then(res => res.json())
      .then(setUser);
  }, []);

  if (!user) return <Text>Loading...</Text>;

  return (
    <View>
      <Text>{user?.name}</Text>
      <Text>{user?.email}</Text>
    </View>
  );
}

export default function App() {
  return (
    <View style={{ marginTop: 50 }}>
      <UserProfile />
    </View>
  );
}