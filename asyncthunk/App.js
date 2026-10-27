import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { configureStore, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Provider, useDispatch, useSelector } from 'react-redux';

// ==========================================
// 1. KHAI BÁO CÁC THUNKS (CRUD API)
// ==========================================
const API = "https://jsonplaceholder.typicode.com/posts";

// R (Read): Lấy danh sách
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const res = await fetch(`${API}?_limit=5`);
  return res.json();
});

// C (Create): Thêm mới
export const addPost = createAsyncThunk("posts/addPost", async (newPost) => {
  const res = await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newPost),
  });
  const data = await res.json();
  // Mẹo: JSONPlaceholder luôn trả về id: 101 khi POST. 
  // Ta thêm Date.now() để làm key duy nhất cho FlatList không báo lỗi.
  return { ...data, id: Date.now() }; 
});

// U (Update): Cập nhật
export const updatePost = createAsyncThunk("posts/updatePost", async (post) => {
  const res = await fetch(`${API}/${post.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(post),
  });
  return res.json();
});

// D (Delete): Xóa
export const deletePost = createAsyncThunk("posts/deletePost", async (id) => {
  await fetch(`${API}/${id}`, { method: "DELETE" });
  return id; // Trả về đúng ID để reducer biết cần loại bỏ phần tử nào
});

// ==========================================
// 2. KHAI BÁO SLICE VÀ XỬ LÝ EXTRA REDUCERS
// ==========================================
const postsSlice = createSlice({
  name: "posts",
  initialState: { items: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Xử lý READ
      .addCase(fetchPosts.pending, (state) => { state.status = "loading"; })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload; // Gán toàn bộ danh sách[cite: 1]
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      
      // Xử lý CREATE
      .addCase(addPost.fulfilled, (state, action) => {
        state.items.unshift(action.payload); // Thêm phần tử mới lên đầu mảng[cite: 1]
      })
      
      // Xử lý UPDATE
      .addCase(updatePost.fulfilled, (state, action) => {
        const index = state.items.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload; // Gán đè dữ liệu mới tại vị trí cũ[cite: 1]
      })
      
      // Xử lý DELETE
      .addCase(deletePost.fulfilled, (state, action) => {
        state.items = state.items.filter((p) => p.id !== action.payload); // Lọc bỏ ID cần xóa[cite: 1]
      });
  },
});

// ==========================================
// 3. KHỞI TẠO STORE
// ==========================================
const store = configureStore({
  reducer: { posts: postsSlice.reducer },
});

// ==========================================
// 4. COMPONENT GIAO DIỆN CHÍNH
// ==========================================
function PostManager() {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.posts);
  const [title, setTitle] = useState("");
  const [editingId, setEditingId] = useState(null);

  // Gọi fetchPosts ngay khi component được render lần đầu[cite: 1]
  useEffect(() => {
    if (status === "idle") dispatch(fetchPosts());
  }, [status, dispatch]);

  const handleSubmit = () => {
    if (!title.trim()) return;
    
    if (editingId) {
      // Dispatch thunk updatePost[cite: 1]
      dispatch(updatePost({ id: editingId, title, body: "Nội dung cập nhật", userId: 1 }));
    } else {
      // Dispatch thunk addPost[cite: 1]
      dispatch(addPost({ title, body: "Nội dung mới", userId: 1 }));
    }
    setTitle("");
    setEditingId(null);
  };

  const startEdit = (post) => {
    setEditingId(post.id);
    setTitle(post.title);
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.title}</Text>
      <View style={styles.row}>
        <TouchableOpacity style={[styles.btn, styles.btnEdit]} onPress={() => startEdit(item)}>
          <Text style={styles.btnText}>Sửa</Text>
        </TouchableOpacity>
        
        {/* Dispatch thunk deletePost[cite: 1] */}
        <TouchableOpacity style={[styles.btn, styles.btnDel]} onPress={() => dispatch(deletePost(item.id))}>
          <Text style={styles.btnText}>Xóa</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>CRUD Redux Toolkit</Text>
      
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="Nhập tiêu đề bài viết..."
        />
        <View style={styles.rowBtn}>
          <Button title={editingId ? "Lưu Cập Nhật" : "Thêm Bài Viết"} onPress={handleSubmit} />
          {editingId && (
            <View style={{ marginLeft: 10 }}>
              <Button title="Hủy" color="gray" onPress={() => { setEditingId(null); setTitle(""); }} />
            </View>
          )}
        </View>
      </View>

      {status === "loading" && <ActivityIndicator size="large" color="#0000ff" />}
      {status === "failed" && <Text style={styles.error}>Lỗi: {error}</Text>}
      
      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        style={{ marginTop: 10 }}
      />
    </View>
  );
}

// ==========================================
// 5. COMPONENT GỐC BỌC PROVIDER
// ==========================================
export default function App() {
  return (
    <Provider store={store}>
      <PostManager />
    </Provider>
  );
}

// STYLE CHO GIAO DIỆN
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5', marginTop: 40 },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 15, textAlign: 'center' },
  form: { backgroundColor: 'white', padding: 15, borderRadius: 8, marginBottom: 15, elevation: 2 },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 10, borderRadius: 5, marginBottom: 10 },
  card: { backgroundColor: 'white', padding: 15, borderRadius: 8, marginBottom: 10, elevation: 1 },
  title: { fontSize: 16, marginBottom: 10, fontWeight: '500' },
  row: { flexDirection: 'row', justifyContent: 'flex-end' },
  rowBtn: { flexDirection: 'row', justifyContent: 'flex-start' },
  btn: { paddingVertical: 8, paddingHorizontal: 16, borderRadius: 4, marginLeft: 10 },
  btnEdit: { backgroundColor: '#4CAF50' },
  btnDel: { backgroundColor: '#F44336' },
  btnText: { color: 'white', fontWeight: 'bold' },
  error: { color: 'red', textAlign: 'center', marginVertical: 10 }
});