import React from 'react';
import { View, Text } from 'react-native';

// 1. Khai báo kiểu dữ liệu
type MyType = {
  name: string;
  age: number;
  isAdmin: boolean;
}

// 2. Tạo Component UserCard
const UserCard = ({ name, age, isAdmin }: MyType) => {
  return (
    <View style={{ marginBottom: 20, padding: 10, borderWidth: 1 }}>
      <Text>Tên: {name}</Text>
      <Text>Tuổi: {age}</Text>
      <Text>Quyền: {isAdmin ? 'Quản trị viên' : 'Người dùng thường'}</Text>
    </View>
  );
}

// 3. Component chính để hiển thị ra màn hình
export default function App() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      {/* Gọi Component bằng cú pháp thẻ (JSX) */}
      <UserCard name="Phi" age={21} isAdmin={true} />
      
      {/* Thử gọi thêm một thẻ khác để thấy sự khác biệt */}
      <UserCard name="Khách" age={18} isAdmin={false} />
    </View>
  );
}