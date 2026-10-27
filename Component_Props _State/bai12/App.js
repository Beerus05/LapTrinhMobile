import React from 'react';
import { View, Button, Alert } from 'react-native';

const ErrorHandling = () => {
  const fetchWithError = async () => {
    try {
      await fetch('https://api-bi-loi.com/abc');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <Button title="Call API" onPress={fetchWithError} />
  );
}

export default function App() {
  return (
    <View style={{ marginTop: 50 }}>
      <ErrorHandling />
    </View>
  );
}