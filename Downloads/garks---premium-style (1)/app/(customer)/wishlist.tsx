import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../../src/theme';

export default function Wishlist() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cabinet</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.brandBg || '#ffffff', // Agar theme load na ho toh white backup
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontFamily: FONTS.serif || 'System', // Agar custom font na mile toh system font backup
    color: COLORS.brandText || '#000000',
  },
});