import React, { useState } from 'react';
import { View, Text } from 'react-native';

const TodoBasic = () => {
  // Tạo state là một mảng các object
  const [todos] = useState([
    { id: '1', title: 'Học React Native' },
    { id: '2', title: 'Làm bài tập TypeScript' }
  ]);

  return (
    <View style={{ marginTop: 50 }}>
      {todos.map(item => (
        <Text key={item.id}>- {item.title}</Text>
      ))}
    </View>
  );
}

export default function App() {
  return <TodoBasic />;
}