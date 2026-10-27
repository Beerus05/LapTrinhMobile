import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';

const Counter = () => {
  // Đã bỏ <number> đi
  const [count, setCount] = useState(0);

  return (
    <View style={{ marginTop: 50 }}>
      <Text>Số đếm: {count}</Text>
      
      <Button title="Giảm" onPress={() => setCount(count - 1)} disabled={count === 0} />
      <Button title="Tăng" onPress={() => setCount(count + 1)} />
    </View>
  );
}

export default function App() {
  return <Counter />;
}