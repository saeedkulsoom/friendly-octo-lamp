import { Stack } from 'expo-router';
import { COLORS } from '../../src/theme';

export default function AdminLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: COLORS.brandBg,
        },
      }}
    >
      <Stack.Screen name="index" />
    </Stack>
  );
}
