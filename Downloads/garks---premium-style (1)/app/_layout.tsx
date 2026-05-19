import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { COLORS, globalStyles } from '../src/theme';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useEffect } from 'react';
import { useStore } from '../src/store/useStore';

export default function RootLayout() {
  const { theme } = useStore();

  return (
    <SafeAreaProvider style={{ flex: 1, backgroundColor: COLORS.brandBg }}>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: COLORS.brandBg,
          },
          headerTintColor: COLORS.brandPrimary,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          contentStyle: {
            backgroundColor: COLORS.brandBg,
          },
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="login" />
        <Stack.Screen name="(customer)" />
        <Stack.Screen name="(admin)" />
      </Stack>
    </SafeAreaProvider>
  );
}
