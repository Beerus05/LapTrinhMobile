import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from 'react-native';

const BIKE_DATA = [
  { id: '1', name: 'Pinarello', price: 1800, type: 'Roadbike', image: require('../images/bione-removebg-preview.png') },
  { id: '2', name: 'Pina Mountain', price: 1700, type: 'Mountain', image: require('../images/bitwo-removebg-preview.png') },
  { id: '3', name: 'Pina Bike', price: 1500, type: 'Roadbike', image: require('../images/bithree_removebg-preview.png') },
  { id: '4', name: 'Pinarello', price: 1900, type: 'Roadbike', image: require('../images/bifour_-removebg-preview.png') },
  { id: '5', name: 'Pinarello', price: 2700, type: 'Roadbike', image: require('../images/bithree_removebg-preview-1.png') },
  { id: '6', name: 'Pinarello', price: 1350, type: 'Mountain', image: require('../images/bione-removebg-preview-1.png') },
];

export default function ListScreen({ onNavigate, onSelectBike }) {
  const [filter, setFilter] = useState('All');

  const filteredData = filter === 'All' ? BIKE_DATA : BIKE_DATA.filter(bike => bike.type === filter);

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.bikeCard} 
      onPress={() => {
        onSelectBike(item);
        onNavigate();
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
}

const styles = StyleSheet.create({
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
});