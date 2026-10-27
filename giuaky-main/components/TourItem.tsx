import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Tour, formatDate, getSeatLabel } from '../utils/tour';

export interface TourItemProps {
  tour: Tour;
  compact?: boolean;
  onPress: (tour: Tour) => void;
  onToggleFavorite: (id: string, next: boolean) => void;
}

const TourItem: React.FC<TourItemProps> = ({ tour, compact = false, onPress, onToggleFavorite }) => {
  const seatLabel = getSeatLabel(tour.seats);
  const isSeatCritical = tour.seats <= 3;

  return (
    <TouchableOpacity 
      style={[styles.card, compact && styles.cardCompact]} 
      onPress={() => onPress(tour)}
    >
      <Image 
        source={{ uri: tour.image }} 
        style={compact ? styles.imageCompact : styles.imageNormal} 
      />
      
      <View style={compact ? styles.infoCompact : styles.infoNormal}>
        <Text style={styles.name} numberOfLines={compact ? 1 : undefined}>
          {tour.name}
        </Text>

        {!compact && (
          <>
            <Text style={styles.city}>{tour.city}</Text>
            <Text style={styles.date}>📅 {formatDate(tour.departure)} · {tour.days} ngày</Text>
          </>
        )}
        
        <Text style={styles.price}>{tour.price.toLocaleString('vi-VN')} ₫</Text>
        
        {!compact && (
          <Text style={[styles.seats, isSeatCritical && styles.seatsRed]}>
            {seatLabel}
          </Text>
        )}
      </View>

      <TouchableOpacity
        testID="fav-btn"
        style={[styles.favBtn, compact && styles.favBtnCompact]}
        onPress={() => onToggleFavorite(tour.id, !tour.isFavorite)}
      >
        <Text style={styles.favIcon}>{tour.isFavorite ? '♥' : '♡'}</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: { flexDirection: 'row', backgroundColor: '#fff', marginBottom: 10, padding: 10, borderRadius: 8 },
  cardCompact: { flexDirection: 'column', width: 160, padding: 0, overflow: 'hidden', marginRight: 10 },
  imageNormal: { width: 90, height: 90, borderRadius: 6, backgroundColor: '#ddd' },
  imageCompact: { width: '100%', aspectRatio: 4 / 3, backgroundColor: '#ddd' },
  infoNormal: { flex: 1, marginLeft: 10, justifyContent: 'center' },
  infoCompact: { padding: 8 },
  name: { fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
  city: { fontSize: 14, color: '#555' },
  date: { fontSize: 13, color: '#666', marginVertical: 4 },
  price: { fontSize: 15, fontWeight: 'bold', color: '#0055ff' },
  seats: { fontSize: 13, marginTop: 4 },
  seatsRed: { color: 'red', fontWeight: 'bold' },
  favBtn: { justifyContent: 'center', padding: 10 },
  favBtnCompact: { position: 'absolute', top: 5, right: 5, backgroundColor: 'rgba(255,255,255,0.7)', borderRadius: 15, padding: 5 },
  favIcon: { fontSize: 24, color: 'red' }
});

export default React.memo(TourItem);