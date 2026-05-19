import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { Sparkles, ArrowRight } from 'lucide-react-native';
import { useStore } from '../../src/store/useStore';
import { COLORS, FONTS } from '../../src/theme';

const CATEGORIES = [
  { name: 'Men', image: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&q=80' },
  { name: 'Women', image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80' },
  { name: 'Bags', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80' },
  { name: 'Leather', image: 'https://images.unsplash.com/photo-1590739225287-bd31519780c3?auto=format&fit=crop&q=80' },
];

export default function CustomerHome() {
  const { user, inventory } = useStore();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={(COLORS as any).brandPrimary || '#FFFFFF'} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Evening, {user?.username?.split(' ')[0] || 'Dear'}</Text>
        <Text style={styles.subtitle}>Welcome to your private atelier</Text>
      </View>

      <TouchableOpacity style={styles.heroSection} onPress={() => router.push('/shop')} activeOpacity={0.9}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80' }}
          style={styles.heroImage}
        />
        <View style={styles.heroOverlay}>
          <Text style={styles.heroTag}>New Summer Edition</Text>
          <Text style={styles.heroTitle}>Ethereal{"\n"}Silk & Linen</Text>
          <View style={styles.heroButton}>
            <Text style={styles.heroButtonText}>Explore Collection</Text>
            <ArrowRight size={14} {...{ color: "#3d2b1f" } as any} />
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.conciergeCard} onPress={() => router.push('/shop')} activeOpacity={0.8}>
        <View style={styles.conciergeTop}>
          <View style={styles.conciergeTextContainer}>
            <Text style={styles.conciergeTitle}>Style Discovery</Text>
            <Text style={styles.conciergeDesc}>Describe your mood or an occasion, and let our intelligence refine your selection.</Text>
          </View>
          <View style={styles.conciergeIconWrapper}>
            <Sparkles size={20} {...{ color: COLORS.brandPrimary || '#FFFFFF' } as any} />
          </View>
        </View>
        <View style={styles.conciergeStatus}>
          <View style={styles.statusDot} />
          <Text style={styles.statusText}>Concierge Active & Ready</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.categoriesSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>The Segments</Text>
          <TouchableOpacity onPress={() => router.push('/categories')}>
            <Text style={styles.seeAllText}>Refine All</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoriesList}>
          {CATEGORIES.map((cat, i) => (
            <TouchableOpacity key={i} style={styles.categoryItem} onPress={() => router.push('/shop')}>
              <View style={styles.categoryImageWrapper}>
                <Image source={{ uri: cat.image }} style={styles.categoryImage} />
              </View>
              <Text style={styles.categoryName}>{cat.name}</Text>
              <Text style={styles.categoryAction}>View Series</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.curatedSection}>
        <View style={styles.curatedHeader}>
          <View style={styles.line} />
          <Text style={styles.curatedTitle}>Curated selection</Text>
          <View style={styles.line} />
        </View>
        <View style={styles.gridContainer}>
          {inventory && inventory.slice(0, 4).map((product: any) => (
            <TouchableOpacity key={product.id} style={styles.productCard} onPress={() => router.push(`/product/${product.id}` as any)}>
              <View style={styles.productImageWrapper}>
                <Image source={{ uri: product.image }} style={styles.productImage} />
              </View>
              <View style={styles.productInfo}>
                <Text style={styles.productCategory}>{product.category}</Text>
                <Text style={styles.productName} numberOfLines={1}>{product.name}</Text>
                <Text style={styles.productPrice}>${product.price}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.brandBg },
  content: { paddingBottom: 100 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.brandBg },
  header: { padding: 24, paddingTop: 40 },
  greeting: { fontSize: 32, fontFamily: FONTS.serif, fontStyle: 'italic', color: COLORS.brandText, marginBottom: 4 },
  subtitle: { fontSize: 10, fontFamily: FONTS.mono, color: COLORS.brandMuted, textTransform: 'uppercase', letterSpacing: 3 },
  heroSection: { marginHorizontal: 24, height: 400, borderRadius: 48, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)' },
  heroImage: { width: '100%', height: '100%' },
  heroOverlay: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 32, backgroundColor: 'rgba(0,0,0,0.4)', paddingTop: 100 },
  heroTag: { color: COLORS.brandSecondary, fontFamily: FONTS.mono, fontSize: 9, textTransform: 'uppercase', letterSpacing: 4, fontWeight: 'bold', marginBottom: 8 },
  heroTitle: { color: '#fff', fontSize: 40, fontFamily: FONTS.serif, fontStyle: 'italic', marginBottom: 24, lineHeight: 48 },
  heroButton: { alignSelf: 'flex-start', backgroundColor: COLORS.brandSecondary, paddingHorizontal: 32, paddingVertical: 16, borderRadius: 32, flexDirection: 'row', alignItems: 'center', gap: 12 },
  heroButtonText: { color: '#3d2b1f', fontSize: 10, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 2 },
  conciergeCard: { margin: 24, backgroundColor: COLORS.brandCard, borderRadius: 40, padding: 32, borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)' },
  conciergeTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 },
  conciergeTextContainer: { flex: 1, paddingRight: 16 },
  conciergeTitle: { color: COLORS.brandText, fontSize: 20, fontFamily: FONTS.serif, fontStyle: 'italic', marginBottom: 8 },
  conciergeDesc: { color: COLORS.brandMuted, fontSize: 12, lineHeight: 20 },
  conciergeIconWrapper: { width: 48, height: 48, backgroundColor: COLORS.brandBg, borderRadius: 16, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: COLORS.brandBorder },
  conciergeStatus: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  statusDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: COLORS.brandSecondary },
  statusText: { color: COLORS.brandSecondary, fontFamily: FONTS.mono, fontSize: 9, textTransform: 'uppercase', letterSpacing: 2, fontWeight: 'bold' },
  categoriesSection: { paddingVertical: 24, backgroundColor: 'rgba(19, 42, 74, 0.2)', borderTopWidth: 1, borderBottomWidth: 1, borderColor: 'rgba(255,255,255,0.05)' },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 24, marginBottom: 32 },
  sectionTitle: { fontSize: 24, fontFamily: FONTS.serif, fontStyle: 'italic', color: COLORS.brandText },
  seeAllText: { color: COLORS.brandMuted, fontSize: 9, fontFamily: FONTS.mono, textTransform: 'uppercase', letterSpacing: 2 },
  categoriesList: { paddingHorizontal: 24, gap: 32 },
  categoryItem: { width: 128 },
  categoryImageWrapper: { width: 128, height: 176, borderRadius: 32, overflow: 'hidden', marginBottom: 16, borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)' },
  categoryImage: { width: '100%', height: '100%' },
  categoryName: { color: COLORS.brandSecondary, fontSize: 10, fontFamily: FONTS.mono, textTransform: 'uppercase', letterSpacing: 3, fontWeight: 'bold', marginBottom: 4 },
  categoryAction: { color: COLORS.brandMuted, fontSize: 8, fontFamily: FONTS.mono, textTransform: 'uppercase', letterSpacing: 2 },
  curatedSection: { paddingVertical: 48 },
  curatedHeader: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 24, marginBottom: 40, gap: 12 },
  line: { flex: 1, height: 1, backgroundColor: COLORS.brandBorder },
  curatedTitle: { fontSize: 24, fontFamily: FONTS.serif, fontStyle: 'italic', color: COLORS.brandText },
  gridContainer: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 16, gap: 16 },
  productCard: { width: '47%', marginBottom: 24 },
  productImageWrapper: { aspectRatio: 0.8, borderRadius: 32, overflow: 'hidden', backgroundColor: COLORS.brandCard, marginBottom: 16, borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)' },
  productImage: { width: '100%', height: '100%' },
  productInfo: { paddingHorizontal: 8 },
  productCategory: { color: COLORS.brandMuted, fontSize: 9, fontFamily: FONTS.mono, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 4 },
  productName: { color: COLORS.brandText, fontSize: 14, fontWeight: '500', marginBottom: 4 },
  productPrice: { color: COLORS.brandSecondary, fontSize: 12, fontFamily: FONTS.mono, fontWeight: 'bold' }
});