import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../../src/theme';

export default function Shop() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shop</Text>
      <Text style={styles.subtitle}>Curated selection coming soon.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.brandBg,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontFamily: FONTS.serif,
    color: COLORS.brandText,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: FONTS.mono,
    color: COLORS.brandMuted,
  }
});
