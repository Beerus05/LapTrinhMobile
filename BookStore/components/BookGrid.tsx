import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

interface GridBookItem {
  id: string;
  title: string;
  price: string;
  imageUrl: string;
  badge?: string; 
}

const GRID_BOOKS: GridBookItem[] = [
  {
    id: 'g1',
    title: 'Clean Code',
    price: '350.000 đ',
    imageUrl: 'https://images.unsplash.com/photo-1532012164546-f432f2e3777a?w=400',
    badge: '-20%',
  },
  {
    id: 'g2',
    title: 'Design Patterns',
    price: '420.000 đ',
    imageUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400',
    badge: 'Mới',
  },
  {
    id: 'g3',
    title: 'Refactoring',
    price: '390.000 đ',
    imageUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400',
    badge: '-15%',
  },
  {
    id: 'g4',
    title: 'Algorithms 4th',
    price: '550.000 đ',
    imageUrl: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400',
    badge: '-25%',
  },
];

export default function BookGrid() {
  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Book Grid</Text>

      <View style={styles.gridContainer}>
        {GRID_BOOKS.map((item) => (
          <View key={item.id} style={styles.cardItem}>
            
            <View style={styles.imageWrapper}>
              <Image
                source={{ uri: item.imageUrl }}
                style={styles.bookImage}
                resizeMode="cover"
              />

              {item.badge && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{item.badge}</Text>
                </View>
              )}
            </View>

            <View style={styles.infoContainer}>
              <Text style={styles.titleText} numberOfLines={1}>
                {item.title}
              </Text>
              <Text style={styles.priceText}>{item.price}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    padding: 16,
    backgroundColor: '#fff',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
    color: '#333',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 12,
    borderWidth: 1.5,
    borderColor: '#6366F1',
    borderStyle: 'dashed',
    borderRadius: 8,
  },
  cardItem: {
    width: '48%',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#6366F1',
    borderStyle: 'dashed',
    padding: 8,
    borderRadius: 6,
    backgroundColor: '#fafafa',
  },
  imageWrapper: {
    position: 'relative',  
    width: '100%',
    aspectRatio: 3 / 4,
    borderRadius: 4,
    overflow: 'hidden',  
    backgroundColor: '#e5e7eb',
  },
  bookImage: {
    width: '100%',
    height: '100%',
  },
  
  badge: {
    position: 'absolute',
    top: 6,
    left: 6,
    backgroundColor: 'red', 
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,  
    zIndex: 1,  
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: 'bold',
  },
  infoContainer: {
    marginTop: 8,
    padding: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#9CA3AF',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1F2937',
  },
  priceText: {
    fontSize: 12,
    color: '#DC2626',
    fontWeight: 'bold',
    marginTop: 2,
  },
});