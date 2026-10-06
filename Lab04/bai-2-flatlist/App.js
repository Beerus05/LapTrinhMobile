import React from 'react';
import { 
  SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity, FlatList, TextInput, StatusBar 
} from 'react-native';
const DATA = [
  { id: '1', name: 'Cáp chuyển từ Cổng USB sang PS2...', price: '69.900 đ', discount: '-39%', reviews: 15, image: require('./images/giacchuyen.png') },
  { id: '2', name: 'Cáp chuyển từ Cổng USB sang PS2...', price: '69.900 đ', discount: '-39%', reviews: 15, image: require('./images/daynguon.png') },
  { id: '3', name: 'Cáp chuyển từ Cổng USB sang PS2...', price: '69.900 đ', discount: '-39%', reviews: 15, image: require('./images/dauchuyendoipsps2.png') },
  { id: '4', name: 'Cáp chuyển từ Cổng USB sang PS2...', price: '69.900 đ', discount: '-39%', reviews: 15, image: require('./images/dauchuyendoi.png') },
  { id: '5', name: 'Cáp chuyển từ Cổng USB sang PS2...', price: '69.900 đ', discount: '-39%', reviews: 15, image: require('./images/daucam.png') },
  { id: '6', name: 'Cáp chuyển từ Cổng USB sang PS2...', price: '69.900 đ', discount: '-39%', reviews: 15, image: require('./images/carbusbtop2.png') },
];

export default function App() {
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={item.image} style={styles.itemImage} />
      <Text style={styles.itemName} numberOfLines={2}>{item.name}</Text>
      
      <View style={styles.ratingContainer}>
        <Text style={styles.stars}>⭐⭐⭐⭐<Text style={styles.starGray}>⭐</Text></Text>
        <Text style={styles.reviewCount}>({item.reviews})</Text>
      </View>
      
      <View style={styles.priceContainer}>
        <Text style={styles.itemPrice}>{item.price}</Text>
        <Text style={styles.itemDiscount}>{item.discount}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#1BA9FF" />
      <View style={styles.container}>
        
        <View style={styles.header}>
          <TouchableOpacity><Text style={styles.headerIcon}>←</Text></TouchableOpacity>
          
          <View style={styles.searchBar}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput 
              style={styles.searchInput} 
              placeholder="Dây cáp usb" 
              placeholderTextColor="#999"
            />
          </View>
    
          <TouchableOpacity style={styles.cartBtn}>
            <Text style={styles.headerIcon}>🛒</Text>
            <View style={styles.cartBadge}></View>
          </TouchableOpacity>
          
          <TouchableOpacity><Text style={styles.headerIcon}>•••</Text></TouchableOpacity>
        </View>
        <FlatList
          data={DATA}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          numColumns={2}
          contentContainerStyle={styles.listPadding}
          showsVerticalScrollIndicator={false}
        />
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
    alignItems: 'center',
    backgroundColor: '#1BA9FF',
    paddingVertical: 10,
    paddingHorizontal: 15,
    justifyContent: 'space-between',
  },
  headerIcon: {
    color: '#fff',
    fontSize: 24,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 35,
    marginHorizontal: 15,
    paddingHorizontal: 10,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 5,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    padding: 0,
    fontSize: 14,
  },
  cartBtn: {
    position: 'relative',
    marginRight: 15,
  },
  cartBadge: {
    position: 'absolute',
    top: -2,
    right: -4,
    width: 10,
    height: 10,
    backgroundColor: 'red',
    borderRadius: 5,
  },
  listPadding: {
    padding: 10,
  },
  itemContainer: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 5, 
    padding: 10,
  },
  itemImage: {
    width: '100%',
    height: 100,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  itemName: {
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  stars: {
    fontSize: 10,
  },
  starGray: {
    color: '#ccc', 
  },
  reviewCount: {
    fontSize: 12,
    color: '#000',
    marginLeft: 5,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  itemDiscount: {
    fontSize: 12,
    color: '#999',
    marginLeft: 10,
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