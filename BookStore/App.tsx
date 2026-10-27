import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text, SafeAreaView, ScrollView } from "react-native";
import Header from "./components/Header";
import BookCard, { BookItem } from "./components/BookCard";
import CategoryChips from "./components/CategoryChips";
import BookGrid from "./components/BookGrid";
import FloatingCartButton from "./components/FloatingCartButton";

const LIST_BOOKS: BookItem[] = [
  {
    id: "1",
    title: "Clean Code: A Handbook of Agile Software Craftsmanship",
    author: "Robert C. Martin",
    price: "350.000 đ",
    imageUrl: "https://images.unsplash.com/photo-1532012164546-f432f2e3777a?w=400",
  },
  {
    id: "2",
    title: "Design Patterns: Elements of Reusable Object-Oriented Software",
    author: "Gang of Four",
    price: "420.000 đ",
    imageUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400",
  },
  {
    id: "3",
    title: "Refactoring: Improving the Design of Existing Code",
    author: "Martin Fowler",
    price: "390.000 đ",
    imageUrl: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400",
  },
];

export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
       
      <Header />
 
      <View style={styles.mainContainer}> 
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        > 
          <CategoryChips />

          <View style={styles.divider} />
 
          <BookGrid />

          <View style={styles.divider} />
 
          <View style={styles.listSection}>
            <Text style={styles.sectionHeader}>Danh Sách Sản Phẩm</Text>
            {LIST_BOOKS.map((book) => (
              <BookCard key={book.id} item={book} />
            ))}
          </View>
        </ScrollView>

        {/* 4. Nút giỏ hàng nổi cố định ở góc dưới-phải màn hình */}
        <FloatingCartButton count={4} onPress={() => console.log('Mở giỏ hàng')} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "green",
  },
  // Container ngoài cùng bao quanh ScrollView và Floating Button
  mainContainer: {
    flex: 1,
    position: "relative", // Containing block cho Floating Button
    backgroundColor: "#ffffff",
  },
  scrollContent: {
    paddingBottom: 100, // Độn đáy để nội dung dưới cùng không bị nút giỏ hàng che khuất
  },
  divider: {
    height: 8,
    backgroundColor: "#f3f4f6",
    marginVertical: 4,
  },
  listSection: {
    backgroundColor: "#fff",
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 6,
  },
});