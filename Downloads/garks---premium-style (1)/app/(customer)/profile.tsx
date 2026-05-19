import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, FONTS } from '../../src/theme';
import { useStore } from '../../src/store/useStore';
import { useRouter } from 'expo-router';

export default function Profile() {
  const { user, logout } = useStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.replace('/login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Text style={styles.name}>{user?.name}</Text>
      
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.brandBg, alignItems: 'center', justifyContent: 'center', padding: 24 },
  title: { fontSize: 32, fontFamily: FONTS.serif, color: COLORS.brandText, marginBottom: 16 },
  name: { fontSize: 16, fontFamily: FONTS.mono, color: COLORS.brandMuted, marginBottom: 48 },
  button: { backgroundColor: COLORS.brandPrimary, paddingVertical: 16, paddingHorizontal: 32, borderRadius: 32 },
  buttonText: { color: '#000', fontFamily: FONTS.mono, fontWeight: 'bold' }
});
