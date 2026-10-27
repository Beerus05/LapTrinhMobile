import React, { useEffect, useState, useMemo } from 'react';
import { 
  View, Text, TextInput, ActivityIndicator, FlatList, 
  Alert, StyleSheet, RefreshControl 
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import TourItem from './components/TourItem';
import { Tour, prepareFlatListData } from './utils/tour';

const API_URL = 'https://6a0b079821e4456256971c5a.mockapi.io/tours';

export default function App() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState('');

  const fetchTours = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setTours(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => { fetchTours(); }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchTours();
  };

  const handleToggleFavorite = async (id: string, next: boolean) => {
    const prevTours = [...tours];
    setTours(prev => prev.map(t => t.id === id ? { ...t, isFavorite: next } : t));

    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isFavorite: next })
      });
      if (!res.ok) throw new Error('Cập nhật thất bại');
    } catch (error) {
      setTours(prevTours);
      Alert.alert('Lỗi', 'Không thể cập nhật yêu thích. Vui lòng kiểm tra mạng.');
    }
  };

  const handlePressTour = (tour: Tour) => {
    Alert.alert('Thông tin', `${tour.name}\nKhởi hành: ${tour.departure}\nThời gian: ${tour.days} ngày\nGiá: ${tour.price.toLocaleString()} ₫`);
  };

  const { flatData, stickyIndices } = useMemo(() => {
    const trimmedSearch = search.trim().toLowerCase();
    const filtered = tours.filter(t => t.name.toLowerCase().includes(trimmedSearch));
    return prepareFlatListData(filtered);
  }, [tours, search]);

  const favoriteTours = useMemo(() => tours.filter(t => t.isFavorite), [tours]);

  const ListHeader = () => (
    <View style={styles.favSection}>
      <Text style={styles.sectionTitle}>Tour yêu thích ({favoriteTours.length})</Text>
      {favoriteTours.length === 0 ? (
        <Text style={styles.emptyFavText}>Chưa có tour yêu thích</Text>
      ) : (
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={favoriteTours}
          keyExtractor={item => `fav_${item.id}`}
          ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
          renderItem={({ item }) => (
            <TourItem 
              tour={item} 
              compact={true} 
              onPress={handlePressTour} 
              onToggleFavorite={handleToggleFavorite} 
            />
          )}
        />
      )}
    </View>
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.appTitle}>Tour Việt</Text>
          <Text style={styles.studentInfo}>NguyenDinhPhi_23633271</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm tour theo tên..."
            value={search}
            onChangeText={setSearch}
          />
        </View>

        {loading ? (
          <ActivityIndicator size="large" style={{ marginTop: 20 }} />
        ) : (
          <FlatList
            data={flatData}
            keyExtractor={item => item.id}
            stickyHeaderIndices={stickyIndices}
            ListHeaderComponent={ListHeader}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            ListEmptyComponent={<Text style={styles.emptyText}>Không tìm thấy tour phù hợp</Text>}
            renderItem={({ item }) => {
              if (item.isHeader) {
                return (
                  <View style={styles.groupHeader}>
                    <Text style={styles.groupHeaderText}>{item.title}</Text>
                  </View>
                );
              }
              return (
                <View style={{ paddingHorizontal: 10 }}>
                  <TourItem 
                    tour={item} 
                    onPress={handlePressTour} 
                    onToggleFavorite={handleToggleFavorite} 
                  />
                </View>
              );
            }}
          />
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f2f5' },
  header: { padding: 15, backgroundColor: '#fff', borderBottomWidth: 1, borderColor: '#ddd' },
  appTitle: { fontSize: 24, fontWeight: 'bold', color: '#0055ff' },
  studentInfo: { fontSize: 14, color: '#666', marginBottom: 10 },
  searchInput: { backgroundColor: '#f0f0f0', padding: 10, borderRadius: 8 },
  favSection: { padding: 10, backgroundColor: '#fff', marginBottom: 10 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  emptyFavText: { fontStyle: 'italic', color: '#888' },
  emptyText: { textAlign: 'center', marginTop: 30, fontSize: 16, color: '#555' },
  groupHeader: { backgroundColor: '#e0e0e0', padding: 8, paddingHorizontal: 15 },
  groupHeaderText: { fontWeight: 'bold', fontSize: 15 }
});