import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../../src/theme';

export default function Categories() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Categories</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.brandBg, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 32, fontFamily: FONTS.serif, color: COLORS.brandText },
});
