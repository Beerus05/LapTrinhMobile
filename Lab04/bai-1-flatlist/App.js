import React from 'react';
import { 
  SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity, FlatList, StatusBar 
} from 'react-native';

// Dữ liệu mẫu sử dụng ảnh từ thư mục local của bạn
const DATA = [
  { id: '1', name: 'Ca nấu lẩu, nấu mì mini...', shop: 'Devang', shopColor: 'red', image: require('./images/ca_nau_lau.png') },
  { id: '2', name: '1KG KHÔ GÀ BƠ TỎI ...', shop: 'LTD Food', shopColor: 'red', image: require('./images/ga_bo_toi.png') },
  { id: '3', name: 'Xe cần cẩu đa năng', shop: 'Thế giới đồ chơi', shopColor: '#000', image: require('./images/xa_can_cau.png') },
  { id: '4', name: 'Đồ chơi dạng mô hình', shop: 'Thế giới đồ chơi', shopColor: '#000', image: require('./images/do_choi_dang_mo_hinh.png') },
  { id: '5', name: 'Lãnh đạo giản đơn', shop: 'Minh Long Book', shopColor: '#000', image: require('./images/lanh_dao_gian_don.png') },
  { id: '6', name: 'Hiểu lòng con trẻ', shop: 'Minh Long Book', shopColor: '#000', image: require('./images/hieu_long_con_tre.png') },
];

export default function App() {
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={item.image} style={styles.itemImage} />
      
      <View style={styles.infoContainer}>
        <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.itemShop}>
          Shop <Text style={{ color: item.shopColor }}>{item.shop}</Text>
        </Text>
      </View>

      <TouchableOpacity style={styles.chatBtn}>
        <Text style={styles.chatBtnText}>Chat</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#1BA9FF" />
      <View style={styles.container}>
        
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity><Text style={styles.headerIcon}>←</Text></TouchableOpacity>
          <Text style={styles.headerTitle}>Chat</Text>
          <TouchableOpacity><Text style={styles.headerIcon}>🛒</Text></TouchableOpacity>
        </View>

        {/* Sub-header */}
        <View style={styles.subHeader}>
          <Text style={styles.subHeaderText}>
            Bạn có thắc mắc với sản phẩm vừa xem. Đừng ngại chát với shop!
          </Text>
        </View>

        {/* FlatList */}
        <FlatList
          data={DATA}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          style={styles.list}
          showsVerticalScrollIndicator={false}
        />

        {/* Bottom Navigation */}
        <View style={styles.bottomNav}>
          <TouchableOpacity><Text style={styles.navIcon}>≡</Text></TouchableOpacity>
          <TouchableOpacity><Text style={styles.navIcon}>🏠</Text></TouchableOpacity>
          <TouchableOpacity><Text style={styles.navIcon}>⮐</Text></TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1BA9FF', 
  },
  container: {
    flex: 1,
    backgroundColor: '#e5e5e5', 
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1BA9FF',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  headerIcon: {
    color: '#fff',
    fontSize: 24,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
  },
  subHeader: {
    padding: 15,
    backgroundColor: '#e5e5e5',
  },
  subHeaderText: {
    fontSize: 14,
    color: '#000',
  },
  list: {
    flex: 1,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#e5e5e5',
  },
  itemImage: {
    width: 60,
    height: 60,
    marginRight: 10,
    resizeMode: 'contain',
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  itemName: {
    fontSize: 15,
    fontWeight: '400',
    marginBottom: 5,
  },
  itemShop: {
    fontSize: 13,
    color: '#666',
  },
  chatBtn: {
    backgroundColor: '#F31111',
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginLeft: 10,
  },
  chatBtnText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1BA9FF',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  navIcon: {
    color: '#fff',
    fontSize: 24,
  },
});