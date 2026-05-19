import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Users, LayoutDashboard, Settings, ArrowRight } from 'lucide-react-native';
import { COLORS, FONTS } from '../../src/theme';

export default function AdminDashboard() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Atelier Control</Text>
        <Text style={styles.subtitle}>System Overview & Analytics</Text>
      </View>

      {/* Quick Navigation Shortcut Added by Antigravity */}
      <TouchableOpacity
        style={styles.shortcutCard}
        onPress={() => router.push('/vendors' as any)}
        activeOpacity={0.8}
      >
        <View style={styles.shortcutLeft}>
          <View style={styles.iconWrapper}>
            <Users size={20} {...{ color: COLORS.brandSecondary || '#FFFFFF' } as any} />
          </View>
          <View>
            <Text style={styles.shortcutTitle}>Manage Vendors</Text>
            <Text style={styles.shortcutDesc}>Live supply chain analytics & chats</Text>
          </View>
        </View>
        <ArrowRight size={16} {...{ color: COLORS.brandMuted || '#888888' } as any} />
      </TouchableOpacity>

      {/* System Metrics Cards */}
      <View style={styles.grid}>
        <View style={styles.metricCard}>
          <LayoutDashboard size={18} {...{ color: COLORS.brandMuted || '#888888' } as any} style={styles.metricIcon} />
          <Text style={styles.metricLabel}>Total Orders</Text>
          <Text style={styles.metricValue}>142</Text>
        </View>
        <View style={styles.metricCard}>
          <Settings size={18} {...{ color: COLORS.brandMuted || '#888888' } as any} style={styles.metricIcon} />
          <Text style={styles.metricLabel}>System Health</Text>
          <Text style={styles.metricValue}>Optimal</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.brandBg },
  content: { paddingBottom: 60, paddingTop: 40 },
  header: { padding: 24, marginBottom: 16 },
  title: { fontSize: 32, fontFamily: FONTS.serif, fontStyle: 'italic', color: COLORS.brandText, marginBottom: 4 },
  subtitle: { fontSize: 10, fontFamily: FONTS.mono, color: COLORS.brandMuted, textTransform: 'uppercase', letterSpacing: 3 },
  shortcutCard: { marginHorizontal: 24, backgroundColor: COLORS.brandCard, borderRadius: 24, padding: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)', marginBottom: 24 },
  shortcutLeft: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  iconWrapper: { width: 44, height: 44, borderRadius: 14, backgroundColor: 'rgba(255,255,255,0.02)', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: COLORS.brandBorder },
  shortcutTitle: { color: COLORS.brandText, fontSize: 16, fontWeight: '600', marginBottom: 2 },
  shortcutDesc: { color: COLORS.brandMuted, fontSize: 12 },
  grid: { flexDirection: 'row', paddingHorizontal: 24, gap: 16 },
  metricCard: { flex: 1, backgroundColor: COLORS.brandCard, borderRadius: 24, padding: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.03)' },
  metricIcon: { marginBottom: 12 },
  metricLabel: { color: COLORS.brandMuted, fontSize: 11, fontFamily: FONTS.mono, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 },
  metricValue: { color: COLORS.brandText, fontSize: 24, fontFamily: FONTS.serif, fontStyle: 'italic' }
});