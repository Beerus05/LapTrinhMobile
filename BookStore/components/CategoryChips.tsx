import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const CATEGORIES = [
  'Văn học',
  'Kinh tế',
  'Thiếu nhi',
  'Kỹ năng sống',
  'Truyện tranh',
];

export default function CategoryChips() {
  const [selectedCategory, setSelectedCategory] = useState<string>('Văn học');

  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Category Chips</Text>

      <View style={styles.chipsContainer}>
        {CATEGORIES.map((item, index) => {
          const isSelected = selectedCategory === item;
          return (
            <TouchableOpacity
              key={index}
              activeOpacity={0.7}
              onPress={() => setSelectedCategory(item)}
              style={[
                styles.chip,
                isSelected && styles.chipActive,
              ]}
            >
              <Text
                style={[
                  styles.chipText,
                  isSelected && styles.chipTextActive,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          );
        })}
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
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    alignContent: 'flex-start', 
    padding: 16,
    borderWidth: 1.5,
    borderColor: '#6366F1', 
    borderStyle: 'dashed',  
    borderRadius: 8,
    minHeight: 180,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#4F46E5',
    backgroundColor: '#fff',
  },
  chipActive: {
    backgroundColor: '#4F46E5',
  },
  chipText: {
    fontSize: 14,
    color: '#4F46E5',
  },
  chipTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
});