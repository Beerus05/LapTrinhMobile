import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

export interface BookItem {
  id: string;
  title: string;
  author: string;
  price: string;
  imageUrl: string;
}

interface Props {
  item: BookItem;
}

export default function BookCard({ item }: Props) {
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.7}>
      <Image
        source={{ uri: item.imageUrl }}
        style={styles.bookImage}
        resizeMode="cover"
      />
      
      <View style={styles.contentRight}>
        <View>
          <Text style={styles.title} numberOfLines={2}>
            {item.title}
          </Text>
          <Text style={styles.author} numberOfLines={1}>
            {item.author}
          </Text>
        </View>

        <View style={styles.priceContainer}>
          <Text style={styles.priceText}>{item.price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 12,
    marginHorizontal: 12,
    marginVertical: 6,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  bookImage: {
    width: 75,
    height: 105,
    borderRadius: 6,
    backgroundColor: '#e0e0e0',
  },
  contentRight: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
    paddingVertical: 2,
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1a1a1a',
    lineHeight: 20,
    marginBottom: 4,
  },
  author: {
    fontSize: 13,
    color: '#666666',
  },
  priceContainer: {
    alignSelf: 'flex-start',
  },
  priceText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#d32f2f',
  },
});