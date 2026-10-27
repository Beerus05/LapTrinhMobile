import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';

const LiveInput = () => {
  const [text, setText] = useState('');

  return (
    <View>
      <TextInput 
        onChangeText={setText} 
        placeholder="Nhập nội dung vào đây..." 
        style={{ borderWidth: 1, padding: 10, borderColor: 'gray', marginBottom: 10 }}
      />
      <Text>Số lượng ký tự: {text.length}</Text>
    </View>
  );
}

export default function App() {
  return (
    <View style={{ marginTop: 50, padding: 20 }}>
      <LiveInput />
    </View>
  );
}