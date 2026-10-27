import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { configureStore, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Provider, useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

// ==========================================
// 1. ASYNC THUNKS: GỌI API & BỘ NHỚ
// ==========================================
// Lấy sản phẩm (Dùng FakeStore API để có dữ liệu thật về sản phẩm)
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const res = await fetch('https://fakestoreapi.com/products?limit=4');
  return res.json();
});

// Khôi phục giỏ hàng từ AsyncStorage
export const loadCartFromStorage = createAsyncThunk('cart/loadCart', async () => {
  const savedCart = await AsyncStorage.getItem('cartItems');
  return savedCart ? JSON.parse(savedCart) : [];
});

// ==========================================
// 2. PRODUCTS SLICE
// ==========================================
const productsSlice = createSlice({
  name: 'products',
  initialState: { items: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => { state.status = 'loading'; })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

// ==========================================
// 3. CART SLICE
// ==========================================
const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    discountCode: null,
    taxRate: 0.1, // Thuế 10%
    shippingCost: 10
  },
  reducers: {
    addToCart: (state, action) => {
      const existing = state.items.find(item => item.id === action.payload.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    increaseQuantity: (state, action) => {
      const item = state.items.find(item => item.id === action.payload);
      if (item) item.quantity += 1;
    },
    decreaseQuantity: (state, action) => {
      const item = state.items.find(item => item.id === action.payload);
      if (item && item.quantity > 1) item.quantity -= 1;
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    applyDiscount: (state, action) => {
      state.discountCode = action.payload;
    },
    setShippingCost: (state, action) => {
      state.shippingCost = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loadCartFromStorage.fulfilled, (state, action) => {
      state.items = action.payload;
    });
  }
});

const { addToCart, increaseQuantity, decreaseQuantity, removeFromCart, applyDiscount, setShippingCost } = cartSlice.actions;

// ==========================================
// 4. SELECTORS (TÍNH TOÁN HÓA ĐƠN)
// ==========================================
const selectCartSummary = (state) => {
  const items = state.cart.items;
  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
  
  const discountRates = { 'SUMMER10': 0.1, 'SPECIAL20': 0.2 };
  const discountRate = discountRates[state.cart.discountCode] || 0;
  const discount = subtotal * discountRate;
  
  const tax = subtotal * state.cart.taxRate;
  const shipping = state.cart.shippingCost;
  const total = subtotal - discount + tax + shipping;
  const itemCount = items.reduce((count, item) => count + item.quantity, 0);

  return { subtotal, discount, tax, shipping, total, itemCount };
};

// ==========================================
// 5. CẤU HÌNH STORE (MIDDLEWARE LƯU TRỮ)
// ==========================================
// Middleware tự động lưu giỏ hàng vào AsyncStorage mỗi khi thay đổi
const persistenceMiddleware = store => next => action => {
  const result = next(action);
  if (action.type.startsWith('cart/') && action.type !== 'cart/loadCart/fulfilled') {
    const currentCart = store.getState().cart.items;
    AsyncStorage.setItem('cartItems', JSON.stringify(currentCart));
  }
  return result;
};

const store = configureStore({
  reducer: { cart: cartSlice.reducer, products: productsSlice.reducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(persistenceMiddleware)
});

// ==========================================
// 6. GIAO DIỆN CHÍNH (REACT NATIVE)
// ==========================================
function ShoppingCart() {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products.items);
  const status = useSelector(state => state.products.status);
  const cartItems = useSelector(state => state.cart.items);
  const summary = useSelector(selectCartSummary);

  useEffect(() => {
    dispatch(loadCartFromStorage()); // Tải giỏ hàng cũ từ bộ nhớ
    if (status === 'idle') dispatch(fetchProducts()); // Tải danh sách sản phẩm
  }, [dispatch, status]);

  if (status === 'loading') return <View style={styles.center}><ActivityIndicator size="large" /></View>;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>🛍️ Cửa Hàng Chuyên Nghiệp</Text>

      {/* DANH SÁCH SẢN PHẨM */}
      <Text style={styles.sectionTitle}>Sản Phẩm Có Sẵn</Text>
      {products.map(p => (
        <View key={p.id} style={styles.card}>
          <View style={{ flex: 1 }}>
            <Text style={styles.productName} numberOfLines={1}>{p.title}</Text>
            <Text style={styles.price}>${p.price.toFixed(2)}</Text>
          </View>
          <TouchableOpacity style={styles.addBtn} onPress={() => dispatch(addToCart(p))}>
            <Text style={styles.btnText}>Thêm</Text>
          </TouchableOpacity>
        </View>
      ))}

      {/* GIỎ HÀNG */}
      <Text style={styles.sectionTitle}>Giỏ Hàng ({summary.itemCount})</Text>
      {cartItems.length === 0 ? <Text style={styles.empty}>Giỏ hàng trống</Text> : 
        cartItems.map(item => (
          <View key={item.id} style={styles.cartCard}>
            <Text style={styles.productName} numberOfLines={1}>{item.title}</Text>
            <Text style={styles.price}>${(item.price * item.quantity).toFixed(2)}</Text>
            <View style={styles.qtyRow}>
              <TouchableOpacity style={styles.qtyBtn} onPress={() => dispatch(decreaseQuantity(item.id))}><Text>-</Text></TouchableOpacity>
              <Text style={{ marginHorizontal: 10 }}>{item.quantity}</Text>
              <TouchableOpacity style={styles.qtyBtn} onPress={() => dispatch(increaseQuantity(item.id))}><Text>+</Text></TouchableOpacity>
              <TouchableOpacity style={styles.delBtn} onPress={() => dispatch(removeFromCart(item.id))}><Text style={styles.btnText}>Xóa</Text></TouchableOpacity>
            </View>
          </View>
        ))
      }

      {/* MÃ GIẢM GIÁ & VẬN CHUYỂN */}
      <View style={styles.optionsRow}>
        <View style={{ flex: 1, marginRight: 5 }}>
          <Text style={styles.bold}>Mã Giảm Giá:</Text>
          <TouchableOpacity style={styles.tagBtn} onPress={() => dispatch(applyDiscount('SUMMER10'))}><Text>SUMMER10 (-10%)</Text></TouchableOpacity>
        </View>
        <View style={{ flex: 1, marginLeft: 5 }}>
          <Text style={styles.bold}>Vận Chuyển:</Text>
          <TouchableOpacity style={styles.tagBtn} onPress={() => dispatch(setShippingCost(10))}><Text>Tiêu chuẩn ($10)</Text></TouchableOpacity>
          <TouchableOpacity style={styles.tagBtn} onPress={() => dispatch(setShippingCost(25))}><Text>Nhanh ($25)</Text></TouchableOpacity>
        </View>
      </View>

      {/* TÓM TẮT HÓA ĐƠN */}
      <View style={styles.summaryCard}>
        <View style={styles.sumRow}><Text>Tạm tính:</Text><Text>${summary.subtotal.toFixed(2)}</Text></View>
        {summary.discount > 0 && <View style={styles.sumRow}><Text style={{ color: 'green' }}>Giảm giá:</Text><Text style={{ color: 'green' }}>-${summary.discount.toFixed(2)}</Text></View>}
        <View style={styles.sumRow}><Text>Thuế (10%):</Text><Text>${summary.tax.toFixed(2)}</Text></View>
        <View style={styles.sumRow}><Text>Vận chuyển:</Text><Text>${summary.shipping.toFixed(2)}</Text></View>
        <View style={[styles.sumRow, { borderTopWidth: 1, marginTop: 10, paddingTop: 10 }]}>
          <Text style={styles.totalText}>THÀNH TIỀN:</Text>
          <Text style={styles.totalText}>${summary.total.toFixed(2)}</Text>
        </View>
      </View>
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

export default function App() {
  return <Provider store={store}><ShoppingCart /></Provider>;
}

// ==========================================
// 7. STYLES
// ==========================================
const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: '#f0f2f5', marginTop: 30 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20, color: '#333' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 15, marginBottom: 10 },
  card: { flexDirection: 'row', backgroundColor: '#fff', padding: 15, borderRadius: 8, marginBottom: 10, alignItems: 'center' },
  productName: { fontSize: 16, fontWeight: '500', width: '80%' },
  price: { color: '#e53935', fontWeight: 'bold', marginTop: 4 },
  addBtn: { backgroundColor: '#1976D2', padding: 10, borderRadius: 6 },
  btnText: { color: '#fff', fontWeight: 'bold' },
  empty: { textAlign: 'center', color: '#666', fontStyle: 'italic', marginVertical: 10 },
  cartCard: { backgroundColor: '#fff', padding: 15, borderRadius: 8, marginBottom: 10 },
  qtyRow: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  qtyBtn: { backgroundColor: '#ddd', paddingHorizontal: 12, paddingVertical: 5, borderRadius: 4 },
  delBtn: { backgroundColor: '#d32f2f', paddingHorizontal: 12, paddingVertical: 5, borderRadius: 4, marginLeft: 'auto' },
  optionsRow: { flexDirection: 'row', marginTop: 20 },
  bold: { fontWeight: 'bold', marginBottom: 5 },
  tagBtn: { backgroundColor: '#e0e0e0', padding: 8, borderRadius: 4, marginBottom: 5, alignItems: 'center' },
  summaryCard: { backgroundColor: '#fff', padding: 15, borderRadius: 8, marginTop: 20, borderWidth: 1, borderColor: '#ccc' },
  sumRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
  totalText: { fontSize: 18, fontWeight: 'bold', color: '#d32f2f' }
});