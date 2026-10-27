import React from 'react';
import { View, Button } from 'react-native';

const MyButton = ({ label, onPress, color = 'blue' }) => {
  return (
    <View style={{ marginBottom: 10 }}>
      <Button title={label} onPress={onPress} color={color} />
    </View>
  );
}

export default function App() {
  return (
    <View style={{ marginTop: 50, padding: 20 }}>
      <MyButton label="Nút Mặc Định (Xanh)" onPress={() => alert('Bấm mặc định')} />
      <MyButton label="Nút Màu Đỏ" onPress={() => alert('Bấm nút đỏ')} color="red" />
    </View>
  );
}