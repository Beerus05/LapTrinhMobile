import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

export default function HomeScreen({ onNavigate }) {
  return (
    <View style={styles.container}>
      <Text style={styles.homeSubtitle}>A premium online store for sporter and their stylish choice</Text>
      
      <View style={styles.homeImageContainer}>
        <Image 
          source={require('../images/bione-removebg-preview.png')} 
          style={styles.homeImage} 
          resizeMode="contain"
        />
      </View>
      
      <Text style={styles.homeTitle}>POWER BIKE{'\n'}SHOP</Text>
      
      <TouchableOpacity style={styles.primaryButton} onPress={onNavigate}>
        <Text style={styles.primaryButtonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
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
});