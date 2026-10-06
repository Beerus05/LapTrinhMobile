import React, { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
// Gọi đúng tên file bị sai chính tả của bạn là HomeScrenn
import HomeScreen from './components/HomeScreen'; 
import ListScreen from './components/ListScreen';
import DetailScreen from './components/DetailScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('Home');
  const [selectedBike, setSelectedBike] = useState(null);

  return (
    <SafeAreaView style={styles.safeArea}>
      {currentScreen === 'Home' && (
        <HomeScreen onNavigate={() => setCurrentScreen('List')} />
      )}
      
      {currentScreen === 'List' && (
        <ListScreen 
          onNavigate={() => setCurrentScreen('Detail')}
          onSelectBike={(bike) => setSelectedBike(bike)}
        />
      )}
      
      {currentScreen === 'Detail' && (
        <DetailScreen 
          bike={selectedBike}
          onNavigate={() => setCurrentScreen('List')}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});