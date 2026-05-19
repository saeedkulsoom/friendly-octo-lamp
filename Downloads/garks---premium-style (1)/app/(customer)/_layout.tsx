import { Tabs } from 'expo-router';
import { Home, ShoppingBag, Grid, Heart, User } from 'lucide-react-native';
import { COLORS, FONTS } from '../../src/theme';
import { View, Platform, StyleSheet } from 'react-native';

export default function CustomerLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: COLORS.brandBg,
          borderTopColor: 'rgba(255,255,255,0.05)',
          height: Platform.OS === 'ios' ? 88 : 68,
          paddingBottom: Platform.OS === 'ios' ? 28 : 8,
          paddingTop: 8,
        },
        tabBarActiveTintColor: COLORS.brandPrimary,
        tabBarInactiveTintColor: COLORS.brandMuted,
        tabBarLabelStyle: {
          fontFamily: FONTS.mono,
          fontSize: 10,
          textTransform: 'uppercase',
          marginTop: 4,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconContainer, focused && styles.activeIcon]}>
              <Home size={20} color={color} strokeWidth={focused ? 2.5 : 2} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="shop"
        options={{
          title: 'Shop',
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconContainer, focused && styles.activeIcon]}>
              <ShoppingBag size={20} color={color} strokeWidth={focused ? 2.5 : 2} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="categories"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconContainer, focused && styles.activeIcon]}>
              <Grid size={20} color={color} strokeWidth={focused ? 2.5 : 2} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="wishlist"
        options={{
          title: 'Cabinet',
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconContainer, focused && styles.activeIcon]}>
              <Heart size={20} color={color} strokeWidth={focused ? 2.5 : 2} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconContainer, focused && styles.activeIcon]}>
              <User size={20} color={color} strokeWidth={focused ? 2.5 : 2} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    padding: 8,
    borderRadius: 12,
  },
  activeIcon: {
    backgroundColor: 'rgba(224, 201, 168, 0.1)',
  }
});
