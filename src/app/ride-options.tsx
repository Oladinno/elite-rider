import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useRideStore } from '@/store/use-ride-store';

interface RideOption {
  id: string;
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  capacity: string;
  eta: string;
  price: number;
  originalPrice?: number;
  isBestValue?: boolean;
  features?: string;
}

const RIDE_OPTIONS: RideOption[] = [
  {
    id: 'keke',
    title: 'Keke / Bike',
    icon: 'bicycle',
    capacity: '1-2',
    eta: '3 min away',
    price: 400,
    originalPrice: 450,
  },
  {
    id: 'economy',
    title: 'Economy',
    icon: 'car',
    capacity: '4',
    eta: '7 min away',
    price: 800,
    isBestValue: true,
  },
  {
    id: 'comfort',
    title: 'Comfort',
    icon: 'bus',
    capacity: '4',
    eta: '10 min away',
    price: 1500,
    features: 'AC • Premium',
  },
];

type PaymentMethod = 'cash' | 'wallet';

export default function RideOptionsScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { destination } = useRideStore();

  const [selectedOptionId, setSelectedOptionId] = useState('economy');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cash');

  const selectedOption = RIDE_OPTIONS.find((opt) => opt.id === selectedOptionId) || RIDE_OPTIONS[1];

  const togglePaymentMethod = () => {
    setPaymentMethod((prev) => (prev === 'cash' ? 'wallet' : 'cash'));
  };

  return (
    <View style={styles.container}>
      {/* Map Background Layer */}
      <View style={styles.mapContainer}>
        <ImageBackground
          source={{
            uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBpn1QWuGvkPEZoEp-smzKUCqhydjDtM_Rc8647JUiYzj4zxfHTYou2kbWIPva41KNXmrfA48DRLFmqKhbOvAbMrxwUv01_nt4q0G03bbFRsNaGpWbO5StZWqTM9skogGhSXaZ-TLHm7XLjiYVcIKu4KA5qypN012ViutdW_mVIEBkQ3W1GaFGlG0rhcEKyb4fUGFsO3jznjyGUSqOKuLzil0JDEKkoGvqpJozWjOj4fADycNSD1Ik7Nujh6bWvJS5-BD4VzHlT1x4',
          }}
          style={styles.mapImage}
          resizeMode="cover">
          
          <View style={styles.mapOverlay} />

          {/* Top Overlay Actions */}
          <SafeAreaView style={styles.topActionsContainer} edges={['top']}>
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={20} color="#334155" />
            </TouchableOpacity>

            <View style={styles.mapControlsContainer}>
              <View style={styles.zoomControls}>
                <TouchableOpacity style={styles.zoomButton}>
                  <Ionicons name="add" size={20} color="#334155" />
                </TouchableOpacity>
                <View style={styles.zoomDivider} />
                <TouchableOpacity style={styles.zoomButton}>
                  <Ionicons name="remove" size={20} color="#334155" />
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={styles.locationButton}>
                <Ionicons name="location" size={20} color="#0b6f50" />
              </TouchableOpacity>
            </View>
          </SafeAreaView>

          {/* Destination Pin */}
          <View style={[styles.pinContainer, { top: '33%', left: '50%', transform: [{ translateX: -40 }] }]}>
            <View style={styles.destinationBadge}>
              <ThemedText style={styles.destinationBadgeText}>
                {destination?.address || 'Selected Destination'}
              </ThemedText>
            </View>
            <Ionicons name="location" size={36} color="black" />
          </View>

          {/* Pickup Pin */}
          <View style={[styles.pickupPin, { top: '50%', left: '40%' }]} />
        </ImageBackground>
      </View>

      {/* Bottom Sheet Section */}
      <ThemedView style={styles.bottomSheet}>
        <View style={styles.sheetHandleContainer}>
          <View style={styles.sheetHandle} />
        </View>

        <View style={styles.sheetHeader}>
          <ThemedText style={styles.sheetTitle}>Choose a ride</ThemedText>
          <View style={styles.sheetSubtitleRow}>
            <Ionicons name="time" size={14} color="#64748b" />
            <ThemedText style={styles.sheetSubtitle}>Pickup in 3 min</ThemedText>
            <ThemedText style={styles.dotSeparator}>•</ThemedText>
            <ThemedText style={styles.sheetSubtitle} numberOfLines={1}>
              Drop-off at {destination?.address || 'Selected Destination'}
            </ThemedText>
          </View>
        </View>

        <ScrollView 
          style={styles.optionsList} 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          {RIDE_OPTIONS.map((option) => {
            const isSelected = selectedOptionId === option.id;
            return (
              <TouchableOpacity 
                key={option.id}
                activeOpacity={0.8}
                style={[styles.optionContainer, isSelected && styles.optionSelected]}
                onPress={() => setSelectedOptionId(option.id)}
              >
                {isSelected && (
                  <View style={styles.checkIconContainer}>
                    <Ionicons name="checkmark" size={12} color="white" />
                  </View>
                )}
                
                <View style={styles.optionLeft}>
                  <View style={[styles.vehicleIconContainer, isSelected && { backgroundColor: 'white' }]}>
                    <Ionicons 
                      name={option.icon} 
                      size={32} 
                      color={isSelected ? '#0b6f50' : '#334155'} 
                    />
                  </View>
                  <View style={styles.optionDetails}>
                    <ThemedText style={styles.optionTitle}>{option.title}</ThemedText>
                    <View style={styles.optionSpecsRow}>
                      <Ionicons 
                        name={option.id === 'keke' ? 'person' : 'people'} 
                        size={12} 
                        color="#64748b" 
                      />
                      <ThemedText style={styles.optionSpecsText}>{option.capacity}</ThemedText>
                      <ThemedText style={styles.dotSeparator}>•</ThemedText>
                      <ThemedText style={[
                        styles.optionSpecsText, 
                        isSelected && { color: '#0b6f50', fontWeight: '500' }
                      ]}>
                        {option.eta}
                      </ThemedText>
                    </View>
                    {option.isBestValue && (
                      <View style={styles.bestValueBadge}>
                        <ThemedText style={styles.bestValueText}>Best Value</ThemedText>
                      </View>
                    )}
                    {option.features && (
                      <ThemedText style={styles.premiumText}>{option.features}</ThemedText>
                    )}
                  </View>
                </View>

                <View style={styles.optionRight}>
                  <ThemedText style={styles.optionPrice}>₦{option.price}</ThemedText>
                  {option.originalPrice && (
                    <ThemedText style={styles.strikethroughPrice}>₦{option.originalPrice}</ThemedText>
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <View style={[styles.footer, { paddingBottom: insets.bottom + 20 }]}>
          <TouchableOpacity 
            style={styles.paymentSelector}
            onPress={togglePaymentMethod}
            activeOpacity={0.7}
          >
            <View style={styles.paymentLeft}>
              <View style={[
                styles.paymentIconContainer, 
                paymentMethod === 'wallet' && { backgroundColor: '#dcfce7' }
              ]}>
                <Ionicons 
                  name={paymentMethod === 'cash' ? "cash" : "wallet"} 
                  size={16} 
                  color={paymentMethod === 'cash' ? "#15803d" : "#0b6f50"} 
                />
              </View>
              <View>
                <ThemedText style={styles.paymentLabel}>Payment Method</ThemedText>
                <ThemedText style={styles.paymentValue}>
                  {paymentMethod === 'cash' ? 'Cash Payment' : 'Wallet Balance'}
                </ThemedText>
              </View>
            </View>
            <View style={styles.paymentRight}>
              <ThemedText style={styles.paymentActionText}>Switch</ThemedText>
              <Ionicons name="chevron-forward" size={16} color="#cbd5e1" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.confirmButton}
            onPress={() => router.push('/finding-driver')}
          >
            <ThemedText style={styles.confirmButtonText}>
              Confirm {selectedOption.title} • ₦{selectedOption.price}
            </ThemedText>
          </TouchableOpacity>
        </View>
      </ThemedView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  mapContainer: { flex: 1, backgroundColor: '#e2e8f0' },
  mapImage: { width: '100%', height: '100%' },
  mapOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(255, 255, 255, 0.4)' },
  topActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  mapControlsContainer: { gap: 8 },
  zoomControls: {
    backgroundColor: 'white',
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  zoomButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  zoomDivider: { height: 1, backgroundColor: '#f1f5f9' },
  locationButton: {
    width: 40,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  pinContainer: { position: 'absolute', alignItems: 'center' },
  destinationBadge: {
    backgroundColor: 'black',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 999,
    marginBottom: 4,
  },
  destinationBadgeText: { color: 'white', fontSize: 12, fontWeight: '700' },
  pickupPin: {
    position: 'absolute',
    width: 16,
    height: 16,
    backgroundColor: '#0b6f50',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  bottomSheet: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 24,
    elevation: 10,
    maxHeight: '85%',
  },
  sheetHandleContainer: { width: '100%', alignItems: 'center', paddingTop: 12, paddingBottom: 8 },
  sheetHandle: { width: 48, height: 6, backgroundColor: '#e2e8f0', borderRadius: 3 },
  sheetHeader: { paddingHorizontal: 20, paddingBottom: 8 },
  sheetTitle: { fontSize: 20, fontWeight: '700', color: '#0f172a' },
  sheetSubtitleRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 4 },
  sheetSubtitle: { fontSize: 14, color: '#64748b' },
  dotSeparator: { fontSize: 14, color: '#94a3b8' },
  optionsList: { paddingHorizontal: 12, paddingVertical: 8 },
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  optionSelected: {
    borderColor: '#0b6f50',
    borderWidth: 2,
    backgroundColor: 'rgba(11, 111, 80, 0.05)',
  },
  checkIconContainer: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#0b6f50',
    borderRadius: 12,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  optionLeft: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 16 },
  vehicleIconContainer: {
    width: 56,
    height: 56,
    backgroundColor: '#f1f5f9',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionDetails: { flex: 1 },
  optionTitle: { fontSize: 16, fontWeight: '600', color: '#0f172a' },
  optionSpecsRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 2 },
  optionSpecsText: { fontSize: 12, color: '#64748b' },
  bestValueBadge: {
    backgroundColor: 'rgba(11, 111, 80, 0.1)',
    alignSelf: 'flex-start',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginTop: 4,
  },
  bestValueText: { fontSize: 10, fontWeight: '600', color: '#0b6f50' },
  premiumText: { fontSize: 10, color: '#94a3b8', marginTop: 4 },
  optionRight: { alignItems: 'flex-end', marginLeft: 12 },
  optionPrice: { fontSize: 18, fontWeight: '700', color: '#0f172a' },
  strikethroughPrice: { fontSize: 12, color: '#94a3b8', textDecorationLine: 'line-through' },
  footer: {
    paddingHorizontal: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    backgroundColor: 'white',
  },
  paymentSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  paymentLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  paymentIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paymentLabel: { fontSize: 12, color: '#64748b', fontWeight: '500' },
  paymentValue: { fontSize: 14, fontWeight: '600', color: '#0f172a' },
  paymentRight: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  paymentActionText: { fontSize: 13, fontWeight: '700', color: '#0b6f50' },
  confirmButton: {
    backgroundColor: '#0b6f50',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#0b6f50',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  confirmButtonText: { color: 'white', fontSize: 16, fontWeight: '700' },
});

