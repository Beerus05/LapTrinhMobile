import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';

export default function DetailScreen({ bike, onNavigate }) {
  if (!bike) return null;

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={{ alignSelf: 'flex-start', marginBottom: 10 }}
        onPress={onNavigate}
      >
        <Text style={{ fontSize: 18, color: '#E94141', fontWeight: 'bold' }}>← Back</Text>
      </TouchableOpacity>

      <View style={styles.detailImageContainer}>
        <Image 
          source={bike.image} 
          style={styles.detailImage} 
          resizeMode="contain"
        />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.detailTitle}>{bike.name}</Text>
        <View style={styles.priceRow}>
          <Text style={styles.discountText}>15% OFF | 350$</Text>
          <Text style={styles.detailPrice}>{bike.price}$</Text>
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
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
  primaryButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});