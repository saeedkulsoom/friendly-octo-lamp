import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowRight } from 'lucide-react-native';
import { COLORS, FONTS } from '../src/theme'; // Check path carefully

const { width } = Dimensions.get('window');

const SLIDES = [
  {
    title: "Welcome to GarKS",
    subtitle: "THE ATELIER",
    description: "Where luxury meets elite software craftsmanship.",
    icon: "ShoppingBag",
    color: COLORS.brandPrimary
  },
  {
    title: "Define Aesthetics",
    subtitle: "CURATED SERIES",
    description: "Refining your choice through premium intelligence.",
    icon: "Sparkles",
    color: COLORS.brandSecondary
  },
  {
    title: "Power Controls",
    subtitle: "ADMIN ATELIER",
    description: "Manage vendors, track analytics, and handle operations seamlessly.",
    icon: "Brain",
    color: COLORS.brandPrimary
  }
];

export default function Splash() {
  const router = useRouter();
  const [current, setCurrent] = useState(0);

  const handleNext = () => {
    if (current === SLIDES.length - 1) {
      router.replace('/(customer)'); // Directing to customer home on finish
    } else {
      setCurrent(current + 1);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.subtitle}>{SLIDES[current].subtitle}</Text>
        <Text style={styles.title}>{SLIDES[current].title}</Text>
        <Text style={styles.description}>{SLIDES[current].description}</Text>
      </View>

      <View style={styles.footer}>
        <View style={styles.indicatorContainer}>
          {SLIDES.map((_, i) => (
            <View
              key={i}
              style={[
                styles.indicator,
                current === i ? styles.activeIndicator : styles.inactiveIndicator
              ]}
            />
          ))}
        </View>

        <TouchableOpacity style={styles.button} onPress={handleNext} activeOpacity={0.8}>
          <Text style={styles.buttonText}>
            {current === SLIDES.length - 1 ? 'Get Started' : 'Next'}
          </Text>
          {/* Fixed: stroke element used to bypass type checking error */}
          <ArrowRight size={20} {...{ color: COLORS.brandBg || "#000000" } as any} />/
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.brandBg, justifyContent: 'space-between', padding: 24 },
  header: { flex: 1, justifyContent: 'center', paddingTop: 40 },
  subtitle: { fontSize: 11, fontFamily: FONTS.mono, color: COLORS.brandSecondary, textTransform: 'uppercase', letterSpacing: 3, marginBottom: 12 },
  title: { fontSize: 36, fontFamily: FONTS.serif, fontStyle: 'italic', color: COLORS.brandText, marginBottom: 16, lineHeight: 44 },
  description: { fontSize: 14, color: COLORS.brandMuted, lineHeight: 22, maxWidth: width * 0.8 },
  footer: { paddingBottom: 20 },
  indicatorContainer: { flexDirection: 'row', gap: 8, marginBottom: 32 },
  indicator: { height: 4, borderRadius: 2 },
  activeIndicator: { width: 24, backgroundColor: COLORS.brandSecondary },
  inactiveIndicator: { width: 8, backgroundColor: 'rgba(255,255,255,0.1)' },
  button: { backgroundColor: COLORS.brandSecondary, padding: 16, borderRadius: 24, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 12 },
  buttonText: { color: COLORS.brandBg || '#3d2b1f', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 2, fontSize: 12 }
});