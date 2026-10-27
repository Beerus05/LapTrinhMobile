import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';

const GenderSelector = () => {
  const [gender, setGender] = useState('Nam');

  return (
    <View>
      <Text style={{ fontSize: 18, marginBottom: 10 }}>Đang chọn: {gender}</Text>
      <View style={{ flexDirection: 'row', gap: 10 }}>
        <Button title="Nam" onPress={() => setGender('Nam')} />
        <Button title="Nữ" onPress={() => setGender('Nữ')} />
      </View>
    </View>
  );
}

export default function App() {
  return (
    <View style={{ marginTop: 50, padding: 20 }}>
      <GenderSelector />
    </View>
  );
}