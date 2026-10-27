import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

interface Props {
  count?: number;
  onPress?: () => void;
}

export default function FloatingCartButton({ count = 6, onPress }: Props) {
  return ( 
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.cartButton}
      onPress={onPress}
    >
      <Text style={styles.cartText}>Giỏ hàng</Text>
 
      {count > 0 && (
        <View style={styles.badgeContainer}>
          <Text style={styles.badgeText}>{count}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cartButton: {
    position: 'absolute',
    bottom: 24,
    right: 20,
    width: 68,
    height: 68,
    borderRadius: 34,  
    backgroundColor: '#4C82F7', 
    justifyContent: 'center',
    alignItems: 'center', 
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    zIndex: 999,  
  },
  cartText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  }, 
  badgeContainer: {
    position: 'absolute',
    top: -4,
    right: -4,
    minWidth: 24,
    height: 20,
    paddingHorizontal: 6,
    borderRadius: 4, 
    backgroundColor: '#E11D48', 
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});