import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, TextInput, KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft, Plus, MessageSquare, MapPin, Activity, Package, Building2, Scissors } from 'lucide-react-native';
import { COLORS, FONTS } from '../../src/theme';

type Vendor = {
  id: string;
  name: string;
  category: 'Fabrics' | 'Accessories' | 'Leather';
  contactInfo: string;
  location: string;
  status: string;
};

const INITIAL_VENDORS: Vendor[] = [
  { id: '1', name: 'Milan Fabrics Co.', category: 'Fabrics', contactInfo: 'marco@milanfabrics.it', location: 'Karachi Hub', status: 'In-Transit' },
  { id: '2', name: 'Indus Textiles', category: 'Fabrics', contactInfo: 'ahmed@industext.com', location: 'Lahore Warehouse', status: 'Processing Order' },
  { id: '3', name: 'Zhejiang Accessories', category: 'Accessories', contactInfo: 'li.wei@zjacce.com', location: 'Islamabad Hub', status: 'Idle' },
  { id: '4', name: 'Tokyo Trim & Zipper', category: 'Accessories', contactInfo: 'y.watanabe@tokyotrim.jp', location: 'Karachi Hub', status: 'Processing Order' },
  { id: '5', name: 'Premium Leather Ltd.', category: 'Leather', contactInfo: 'john@premiumleather.co.uk', location: 'Lahore Warehouse', status: 'In-Transit' },
  { id: '6', name: 'Tuscan Leather S.p.A', category: 'Leather', contactInfo: 'enzo@tuscanleather.it', location: 'Karachi Hub', status: 'Idle' },
];

export default function Vendors() {
  const router = useRouter();
  const [vendors, setVendors] = useState<Vendor[]>(INITIAL_VENDORS);
  const [modalVisible, setModalVisible] = useState(false);
  
  // Modal Form State
  const [newName, setNewName] = useState('');
  const [newCategory, setNewCategory] = useState<'Fabrics' | 'Accessories' | 'Leather'>('Fabrics');
  const [newContact, setNewContact] = useState('');

  const activeDeliveries = vendors.filter(v => v.status === 'In-Transit').length;
  const processingOrders = vendors.filter(v => v.status === 'Processing Order').length;

  const handleAddVendor = () => {
    if (newName.trim() === '') return;
    
    const newVendor: Vendor = {
      id: Math.random().toString(36).substr(2, 9),
      name: newName,
      category: newCategory,
      contactInfo: newContact,
      location: 'Karachi Hub', // Default location for newly added vendors
      status: 'Idle',
    };
    
    setVendors([newVendor, ...vendors]);
    setModalVisible(false);
    setNewName('');
    setNewContact('');
    setNewCategory('Fabrics');
  };

  const renderVendorCard = (vendor: Vendor) => {
    let statusColor = COLORS.brandMuted;
    if (vendor.status === 'Processing Order') statusColor = COLORS.brandPrimary;
    if (vendor.status === 'In-Transit') statusColor = COLORS.success;

    return (
      <View key={vendor.id} style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.vendorName}>{vendor.name}</Text>
          <TouchableOpacity style={styles.messageBtn}>
            <MessageSquare size={16} color={COLORS.brandPrimary} />
          </TouchableOpacity>
        </View>
        <Text style={styles.contactInfo}>{vendor.contactInfo}</Text>
        
        <View style={styles.cardFooter}>
          <View style={styles.statusBadge}>
            <MapPin size={12} color={COLORS.brandMuted} />
            <Text style={styles.statusText}>{vendor.location}</Text>
          </View>
          <View style={[styles.statusBadge, { borderColor: statusColor + '40', backgroundColor: statusColor + '10' }]}>
            <Activity size={12} color={statusColor} />
            <Text style={[styles.statusText, { color: statusColor }]}>{vendor.status}</Text>
          </View>
        </View>
      </View>
    );
  };

  const renderCategorySection = (title: string, category: 'Fabrics' | 'Accessories' | 'Leather') => {
    const categoryVendors = vendors.filter(v => v.category === category);
    
    return (
      <View style={styles.categorySection}>
        <View style={styles.categoryHeader}>
          <Text style={styles.categoryTitle}>{title}</Text>
          <View style={styles.categoryCount}>
            <Text style={styles.categoryCountText}>{categoryVendors.length}</Text>
          </View>
        </View>
        {categoryVendors.length === 0 ? (
          <Text style={styles.emptyText}>No vendors in this category.</Text>
        ) : (
          categoryVendors.map(renderVendorCard)
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <ChevronLeft size={24} color={COLORS.brandText} />
        </TouchableOpacity>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle}>Vendors</Text>
          <Text style={styles.headerSubtitle}>Global Supply Chain</Text>
        </View>
        <TouchableOpacity style={styles.addBtn} onPress={() => setModalVisible(true)}>
          <Plus size={20} color={COLORS.brandBg} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Analytics Panel */}
        <View style={styles.analyticsPanel}>
          <Text style={styles.analyticsTitle}>Vendor Analytics</Text>
          <View style={styles.analyticsGrid}>
            <View style={styles.analyticsBox}>
              <Building2 size={20} color={COLORS.brandPrimary} />
              <Text style={styles.analyticsValue}>{vendors.length}</Text>
              <Text style={styles.analyticsLabel}>Total Partners</Text>
            </View>
            <View style={styles.analyticsBox}>
              <Package size={20} color={COLORS.brandSecondary} />
              <Text style={styles.analyticsValue}>{processingOrders}</Text>
              <Text style={styles.analyticsLabel}>Processing</Text>
            </View>
            <View style={styles.analyticsBox}>
              <Activity size={20} color={COLORS.success} />
              <Text style={styles.analyticsValue}>{activeDeliveries}</Text>
              <Text style={styles.analyticsLabel}>In-Transit</Text>
            </View>
          </View>
        </View>

        {/* Categorized Lists */}
        {renderCategorySection('Premium Fabrics', 'Fabrics')}
        {renderCategorySection('Leather & Skins', 'Leather')}
        {renderCategorySection('Hardware & Accessories', 'Accessories')}
      </ScrollView>

      {/* Add Vendor Modal */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <KeyboardAvoidingView style={styles.modalOverlay} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>New Vendor Profile</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Company Name</Text>
              <TextInput 
                style={styles.input} 
                placeholder="Enter company name"
                placeholderTextColor={COLORS.brandMuted}
                value={newName}
                onChangeText={setNewName}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Contact Email</Text>
              <TextInput 
                style={styles.input} 
                placeholder="contact@company.com"
                placeholderTextColor={COLORS.brandMuted}
                value={newContact}
                onChangeText={setNewContact}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Category</Text>
              <View style={styles.categorySelector}>
                {(['Fabrics', 'Accessories', 'Leather'] as const).map(cat => (
                  <TouchableOpacity 
                    key={cat} 
                    style={[styles.catOption, newCategory === cat && styles.catOptionActive]}
                    onPress={() => setNewCategory(cat)}
                  >
                    <Text style={[styles.catOptionText, newCategory === cat && styles.catOptionTextActive]}>
                      {cat}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.cancelBtn} onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveBtn} onPress={handleAddVendor}>
                <Text style={styles.saveBtnText}>Save Vendor</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.brandBg },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 24, paddingTop: Platform.OS === 'android' ? 40 : 16, paddingBottom: 16, borderBottomWidth: 1, borderBottomColor: COLORS.brandBorder },
  backBtn: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.brandCard, borderRadius: 20 },
  headerTextContainer: { alignItems: 'center' },
  headerTitle: { fontSize: 20, fontFamily: FONTS.serif, color: COLORS.brandText, fontStyle: 'italic' },
  headerSubtitle: { fontSize: 10, fontFamily: FONTS.mono, color: COLORS.brandMuted, textTransform: 'uppercase', letterSpacing: 2 },
  addBtn: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.brandPrimary, borderRadius: 20, shadowColor: COLORS.brandPrimary, shadowOpacity: 0.3, shadowRadius: 10, shadowOffset: { width: 0, height: 4 } },
  scrollContent: { padding: 24, paddingBottom: 60 },
  
  // Analytics Panel
  analyticsPanel: { backgroundColor: COLORS.brandCard, borderRadius: 24, padding: 24, marginBottom: 32, borderWidth: 1, borderColor: COLORS.brandBorder },
  analyticsTitle: { fontSize: 14, fontFamily: FONTS.mono, color: COLORS.brandText, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 20 },
  analyticsGrid: { flexDirection: 'row', justifyContent: 'space-between' },
  analyticsBox: { alignItems: 'center', flex: 1 },
  analyticsValue: { fontSize: 24, fontFamily: FONTS.serif, color: COLORS.brandText, marginVertical: 8 },
  analyticsLabel: { fontSize: 9, fontFamily: FONTS.mono, color: COLORS.brandMuted, textTransform: 'uppercase', letterSpacing: 1 },
  
  // Categories
  categorySection: { marginBottom: 32 },
  categoryHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 16, gap: 12 },
  categoryTitle: { fontSize: 20, fontFamily: FONTS.serif, color: COLORS.brandSecondary, fontStyle: 'italic' },
  categoryCount: { backgroundColor: COLORS.brandPrimary + '20', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 12 },
  categoryCountText: { color: COLORS.brandPrimary, fontSize: 10, fontFamily: FONTS.mono, fontWeight: 'bold' },
  emptyText: { color: COLORS.brandMuted, fontSize: 12, fontFamily: FONTS.mono, fontStyle: 'italic', paddingVertical: 16 },
  
  // Vendor Card
  card: { backgroundColor: 'rgba(19, 42, 74, 0.4)', borderRadius: 16, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)' },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 },
  vendorName: { fontSize: 16, color: COLORS.brandText, fontWeight: '500' },
  messageBtn: { padding: 8, backgroundColor: COLORS.brandPrimary + '15', borderRadius: 12 },
  contactInfo: { fontSize: 12, color: COLORS.brandMuted, fontFamily: FONTS.mono, marginBottom: 16 },
  cardFooter: { flexDirection: 'row', gap: 12, flexWrap: 'wrap' },
  statusBadge: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: COLORS.brandCard, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 12, borderWidth: 1, borderColor: COLORS.brandBorder },
  statusText: { fontSize: 9, fontFamily: FONTS.mono, textTransform: 'uppercase', letterSpacing: 1, color: COLORS.brandMuted },
  
  // Modal
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: COLORS.brandBg, borderTopLeftRadius: 32, borderTopRightRadius: 32, padding: 32, borderWidth: 1, borderColor: COLORS.brandBorder, borderBottomWidth: 0 },
  modalTitle: { fontSize: 24, fontFamily: FONTS.serif, color: COLORS.brandText, fontStyle: 'italic', marginBottom: 32, textAlign: 'center' },
  inputGroup: { marginBottom: 24 },
  inputLabel: { fontSize: 10, fontFamily: FONTS.mono, color: COLORS.brandSecondary, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 8 },
  input: { backgroundColor: COLORS.brandCard, borderWidth: 1, borderColor: COLORS.brandBorder, borderRadius: 16, padding: 16, color: COLORS.brandText, fontFamily: FONTS.mono, fontSize: 14 },
  categorySelector: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
  catOption: { paddingVertical: 10, paddingHorizontal: 16, borderRadius: 20, borderWidth: 1, borderColor: COLORS.brandBorder, backgroundColor: COLORS.brandCard },
  catOptionActive: { backgroundColor: COLORS.brandPrimary, borderColor: COLORS.brandPrimary },
  catOptionText: { fontSize: 10, fontFamily: FONTS.mono, color: COLORS.brandMuted, textTransform: 'uppercase', letterSpacing: 1 },
  catOptionTextActive: { color: COLORS.brandBg, fontWeight: 'bold' },
  modalActions: { flexDirection: 'row', gap: 16, marginTop: 16 },
  cancelBtn: { flex: 1, paddingVertical: 16, borderRadius: 16, borderWidth: 1, borderColor: COLORS.brandBorder, alignItems: 'center' },
  cancelBtnText: { color: COLORS.brandMuted, fontFamily: FONTS.mono, fontWeight: 'bold' },
  saveBtn: { flex: 2, paddingVertical: 16, borderRadius: 16, backgroundColor: COLORS.brandPrimary, alignItems: 'center' },
  saveBtnText: { color: COLORS.brandBg, fontFamily: FONTS.mono, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 2 }
});
