import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const phoneImages = {
  silver: require('./image/vs_silver.png'),
  red: require('./image/vs_red.png'),
  black: require('./image/vs_black.png'),
  blue: require('./image/vs_blue.png'),
};

const colorOptions = [
  { name: 'silver', hex: '#C5F0FF' },
  { name: 'red', hex: '#F30D0D' },
  { name: 'black', hex: '#000000' },
  { name: 'blue', hex: '#234896' },
];

function HomeScreen({ navigation, route }) {
  const selectedColor = route.params?.selectedColor || 'blue';

  return (
    <SafeAreaView style={styles.container}>
      <Image source={phoneImages[selectedColor]} style={styles.mainImage} />
      
      <View style={styles.infoContainer}>
        <Text style={styles.title}>Điện Thoại Vsmart Joy 3 - Hàng chính hãng</Text>
        
        <View style={styles.ratingRow}>
          <Text style={styles.stars}>★★★★★</Text>
          <Text style={styles.ratingText}>(Xem 828 đánh giá)</Text>
        </View>

        <View style={styles.priceRow}>
           <Text style={styles.price}>1.790.000 đ</Text>
           <Text style={styles.oldPrice}>1.790.000 đ</Text>
        </View>

        <View style={styles.sloganRow}>
          <Text style={styles.slogan}>Ở ĐÂU RẺ HƠN HOÀN TIỀN</Text>
          <View style={styles.questionIcon}><Text style={styles.questionText}>?</Text></View>
        </View>

        <TouchableOpacity 
          style={styles.outlineButton} 
          onPress={() => navigation.navigate('ColorSelection', { currentColor: selectedColor })}
        >
          <Text style={styles.outlineButtonText}>4 MÀU-CHỌN MÀU</Text>
          <Text style={styles.arrowIcon}>{">"}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.buyButton}>
          <Text style={styles.buyText}>CHỌN MUA</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

function ColorSelectionScreen({ navigation, route }) {
  const [tempColor, setTempColor] = useState(route.params?.currentColor || 'blue');

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: '#c4c4c4' }]}>
      <View style={styles.headerM2}>
        <Image source={phoneImages[tempColor]} style={styles.smallImage} />
        <View style={styles.headerTextM2}>
           <Text style={styles.titleM2}>Điện Thoại Vsmart Joy 3{"\n"}Hàng chính hãng</Text>
        </View>
      </View>

      <View style={styles.colorContainer}>
        <Text style={styles.instructionText}>Chọn một màu bên dưới:</Text>
        
        {/* Vòng lặp map() giúp tạo 4 nút màu ngắn gọn hơn */}
        <View style={styles.boxes}>
          {colorOptions.map((item) => (
            <TouchableOpacity 
              key={item.name}
              style={[styles.colorBox, { backgroundColor: item.hex }]} 
              onPress={() => setTempColor(item.name)} 
            />
          ))}
        </View>

        <TouchableOpacity 
          style={styles.doneButton} 
          onPress={() => navigation.navigate('Home', { selectedColor: tempColor })}
        >
          <Text style={styles.doneText}>XONG</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ColorSelection" component={ColorSelectionScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// --- STYLES ---
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  mainImage: { width: '100%', height: 360, resizeMode: 'contain', marginTop: 10, marginBottom: 15 },
  infoContainer: { paddingHorizontal: 22, flex: 1 },
  title: { fontSize: 15, fontWeight: '400', marginBottom: 12, color: '#000' },
  ratingRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  stars: { color: '#E0E41A', fontSize: 24, letterSpacing: 2 },
  ratingText: { fontSize: 15, color: '#000', marginLeft: 20 },
  priceRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  price: { fontSize: 18, fontWeight: 'bold', color: 'black' },
  oldPrice: { fontSize: 15, color: '#808080', textDecorationLine: 'line-through', marginLeft: 40 },
  sloganRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  slogan: { fontSize: 12, color: '#FA0000', fontWeight: 'bold', marginRight: 8 },
  questionIcon: { width: 18, height: 18, borderRadius: 9, borderWidth: 1, borderColor: '#000', alignItems: 'center', justifyContent: 'center' },
  questionText: { fontSize: 12, fontWeight: 'bold', color: '#000' },
  outlineButton: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'rgba(0, 0, 0, 0.46)', borderRadius: 10, paddingVertical: 12, backgroundColor: '#fff', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  outlineButtonText: { fontSize: 15, fontWeight: '400', color: '#000' },
  arrowIcon: { position: 'absolute', right: 15, fontSize: 18, color: '#000' },
  bottomContainer: { paddingHorizontal: 22, paddingBottom: 20 },
  buyButton: { backgroundColor: '#EE0A0A', borderRadius: 10, paddingVertical: 15, alignItems: 'center',marginBottom: 100, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 4, elevation: 4 },
  buyText: { color: 'white', fontWeight: 'bold', fontSize: 20 },
  headerM2: { flexDirection: 'row', backgroundColor: '#fff', padding: 10, paddingBottom: 15 },
  smallImage: { width: 100, height: 120, resizeMode: 'contain', marginRight: 15 },
  headerTextM2: { flex: 1, justifyContent: 'flex-start', marginTop: 10 },
  titleM2: { fontSize: 15, fontWeight: '400', lineHeight: 22 },
  colorContainer: { flex: 1, padding: 20, justifyContent: 'space-between' },
  instructionText: { fontSize: 18, marginBottom: 10 },
  boxes: { alignItems: 'center', flex: 1, justifyContent: 'center' },
  colorBox: { width: 85, height: 80, marginBottom: 15, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.25, shadowRadius: 4, elevation: 4 },
  doneButton: { backgroundColor: 'rgba(25, 82, 226, 0.58)', borderRadius: 10, padding: 15, alignItems: 'center', marginBottom: 100, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 4, elevation: 4 },
  doneText: { color: 'white', fontWeight: 'bold', fontSize: 20 },
});