import React from 'react';
import { View, Text } from 'react-native';

const ProgressBar = ({ progress }) => {
  // Giới hạn số truyền vào luôn nằm từ 0 đến 100
  const safeValue = Math.max(0, Math.min(progress, 100)); 

  return (
    <View>
      <Text style={{ fontSize: 18 }}>Tiến độ công việc: {safeValue}%</Text>
    </View>
  );
}

export default function App() {
  return (
    <View style={{ marginTop: 50, padding: 20 }}>
      <ProgressBar progress={85} />
    </View>
  );
}