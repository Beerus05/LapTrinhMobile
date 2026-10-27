import React from 'react';
import { View, Text } from 'react-native';

const LoadingWrapper = ({ isLoading, children }) => {
  if (isLoading) {
    return <Text>Đang tải dữ liệu, vui lòng chờ...</Text>;
  }
  return <View>{children}</View>;
}

export default function App() {
  return (
    <View style={{ marginTop: 50, padding: 20 }}>
      {/* Sửa isLoading thành true để xem màn hình đang tải */}
      <LoadingWrapper isLoading={false}>
        <Text style={{ fontSize: 18, color: 'green' }}>Dữ liệu đã tải thành công!</Text>
      </LoadingWrapper>
    </View>
  );
}