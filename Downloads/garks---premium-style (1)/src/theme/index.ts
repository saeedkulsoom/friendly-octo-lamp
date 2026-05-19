import { StyleSheet } from 'react-native';

export const COLORS = {
  brandBg: '#020617',
  brandCard: '#0f172a',
  brandText: '#f8fafc',
  brandMuted: '#64748b',
  brandPrimary: '#e0c9a8', // gold
  brandSecondary: '#fef3c7',
  brandBorder: '#1e293b',
  black: '#000000',
  white: '#ffffff',
  transparent: 'transparent',
  success: '#4ADE80',
  danger: '#F87171',
};

// We will use standard React Native fonts or expo-font
export const FONTS = {
  regular: 'System',
  medium: 'System',
  bold: 'System',
  serif: 'System',
  mono: 'System',
};

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.brandBg,
  },
  text: {
    color: COLORS.brandText,
    fontFamily: FONTS.regular,
  },
  textMuted: {
    color: COLORS.brandMuted,
    fontFamily: FONTS.regular,
  },
  heading: {
    color: COLORS.brandSecondary,
    fontFamily: FONTS.serif,
    fontSize: 24,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: COLORS.brandCard,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.brandBorder,
  },
  button: {
    backgroundColor: COLORS.brandPrimary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#000000',
    fontWeight: 'bold',
    fontFamily: FONTS.medium,
  },
  border: {
    borderColor: COLORS.brandBorder,
    borderWidth: 1,
  }
});
