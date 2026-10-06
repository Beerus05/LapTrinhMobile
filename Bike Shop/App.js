import React, { useState } from 'react';
import { 
  StyleSheet, Text, View, Image, TouchableOpacity, FlatList, SafeAreaView, ScrollView 
} from 'react-native';

const BIKE_DATA = [
  { id: '1', name: 'Pinarello', price: 1800, type: 'Roadbike', image: require('./images/bione-removebg-preview.png') },
  { id: '2', name: 'Pina Mountain', price: 1700, type: 'Mountain', image: require('./images/bitwo-removebg-preview.png') },
  { id: '3', name: 'Pina Bike', price: 1500, type: 'Roadbike', image: require('./images/bithree_removebg-preview.png') },
  { id: '4', name: 'Pinarello', price: 1900, type: 'Roadbike', image: require('./images/bifour_-removebg-preview.png') },
  { id: '5', name: 'Pinarello', price: 2700, type: 'Roadbike', image: require('./images/bithree_removebg-preview-1.png') },
  { id: '6', name: 'Pinarello', price: 1350, type: 'Mountain', image: require('./images/bione-removebg-preview-1.png') },
];

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('Home');
  const [selectedBike, setSelectedBike] = useState(null);
  const [filter, setFilter] = useState('All');

  const HomeScreen = () => (
    <View style={styles.container}>
      <Text style={styles.homeSubtitle}>A premium online store for sporter and their stylish choice</Text>
      <View style={styles.homeImageContainer}>
        <Image 
          source={require('./images/bione-removebg-preview.png')} 
          style={styles.homeImage} 
          resizeMode="contain"
        />
      </View>
      <Text style={styles.homeTitle}>POWER BIKE{'\n'}SHOP</Text>
      <TouchableOpacity 
        style={styles.primaryButton} 
        onPress={() => setCurrentScreen('List')}
      >
        <Text style={styles.primaryButtonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );

  const ListScreen = () => {
    const filteredData = filter === 'All' ? BIKE_DATA : BIKE_DATA.filter(bike => bike.type === filter);

    const renderItem = ({ item }) => (
      <TouchableOpacity 
        style={styles.bikeCard} 
        onPress={() => {
          setSelectedBike(item);
          setCurrentScreen('Detail');
        }}
      >
        <Text style={styles.heartIcon}>♡</Text>
        <Image source={item.image} style={styles.cardImage} resizeMode="contain" />
        <Text style={styles.cardName}>{item.name}</Text>
        <Text style={styles.cardPrice}>${item.price}</Text>
      </TouchableOpacity>
    );

    return (
      <View style={styles.listContainer}>
        <Text style={styles.listHeaderTitle}>The world's Best Bike</Text>
        
        <View style={styles.filterRow}>
          {['All', 'Roadbike', 'Mountain'].map((category) => (
            <TouchableOpacity 
              key={category}
              style={[styles.filterButton, filter === category && styles.filterButtonActive]}
              onPress={() => setFilter(category)}
            >
              <Text style={[styles.filterText, filter === category && styles.filterTextActive]}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <FlatList 
          data={filteredData}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
        />
      </View>
    );
  };
  const DetailScreen = () => (
    <View style={styles.container}>
      <TouchableOpacity 
        style={{ alignSelf: 'flex-start', marginBottom: 10 }}
        onPress={() => setCurrentScreen('List')}
      >
        <Text style={{ fontSize: 18, color: '#E94141', fontWeight: 'bold' }}>← Back</Text>
      </TouchableOpacity>

      <View style={styles.detailImageContainer}>
        <Image 
          source={selectedBike?.image} 
          style={styles.detailImage} 
          resizeMode="contain"
        />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.detailTitle}>{selectedBike?.name}</Text>
        <View style={styles.priceRow}>
          <Text style={styles.discountText}>15% OFF | 350$</Text>
          <Text style={styles.detailPrice}>{selectedBike?.price}$</Text>
        </View>

        <Text style={styles.descriptionLabel}>Description</Text>
        <Text style={styles.descriptionText}>
          It is a very important form of writing as we write almost everything in paragraphs, be it an answer, essay, story, emails, etc.
        </Text>
      </ScrollView>

      <View style={styles.bottomRow}>
        <TouchableOpacity style={styles.heartButtonDetail}>
          <Text style={styles.heartIconDetail}>♡</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addToCartButton}>
          <Text style={styles.primaryButtonText}>Add to card</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      {currentScreen === 'Home' && <HomeScreen />}
      {currentScreen === 'List' && <ListScreen />}
      {currentScreen === 'Detail' && <DetailScreen />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  homeSubtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: '500',
    marginTop: 40,
  },
  homeImageContainer: {
    backgroundColor: '#FDEAE9',
    borderRadius: 30,
    padding: 20,
    alignItems: 'center',
    marginBottom: 30,
  },
  homeImage: {
    width: '100%',
    height: 250,
  },
  homeTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  primaryButton: {
    backgroundColor: '#E94141',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  listContainer: {
    flex: 1,
    padding: 15,
  },
  listHeaderTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#E94141',
    marginBottom: 15,
    marginTop: 10,
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#E94141',
    backgroundColor: '#FFF',
  },
  filterButtonActive: {
    backgroundColor: '#E94141',
  },
  filterText: {
    color: '#E94141',
    fontWeight: '500',
  },
  filterTextActive: {
    color: '#FFF',
  },
  bikeCard: {
    backgroundColor: '#F7F8FA',
    width: '48%',
    borderRadius: 15,
    padding: 10,
    marginBottom: 15,
    alignItems: 'center',
    position: 'relative',
  },
  heartIcon: {
    position: 'absolute',
    top: 10,
    left: 10,
    fontSize: 18,
    color: '#999',
  },
  cardImage: {
    width: 100,
    height: 100,
    marginVertical: 10,
  },
  cardName: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cardPrice: {
    fontSize: 14,
    color: '#000',
    marginTop: 5,
  },
  detailImageContainer: {
    backgroundColor: '#FDEAE9',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  detailImage: {
    width: '100%',
    height: 250,
  },
  detailTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  discountText: {
    fontSize: 16,
    color: '#999',
    marginRight: 20,
  },
  detailPrice: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  descriptionLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
    marginBottom: 20,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  heartButtonDetail: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#E94141',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heartIconDetail: {
    fontSize: 24,
    color: '#E94141',
  },
  addToCartButton: {
    backgroundColor: '#E94141',
    flex: 1,
    marginLeft: 20,
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
  },
});