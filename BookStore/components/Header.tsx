import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
export default function Header() {
  return (
    <View style={styles.container}>
        <View>
            <Text>
            <FontAwesome name="book" size={24} color="black" />
                BookStore</Text>
        </View>
        <View style={{flexDirection: 'row', gap: 10}}>
            <View>
                <Text>
                <Feather name="search" size={24} color="black" />
                    Find</Text>
            </View>
            <View>
                <Text>
                <AntDesign name="shopping-cart" size={24} color="black" />
                    Card
                </Text>
            </View>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: 'green',
        justifyContent: 'space-between',
        padding:16,
        height: 56
    }
})