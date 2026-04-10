import { Ionicons } from '@expo/vector-icons';
import React, { useRef, useEffect } from 'react';
import {
  Animated,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useRideStore } from '@/store/use-ride-store';

export default function DriverAssignedScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { destination } = useRideStore();
  
  const pulseAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        })
      ])
    ).start();
  }, []);

  return (
    <View style={styles.container}>
      {/* Top Status Bar Mockup */}
      <SafeAreaView style={styles.topStatusBar} edges={['top']}>
        <View style={styles.statusBadge}>
          <ThemedText style={styles.statusBadgeText}>Ride to {destination?.address.split(',')[0] || 'Destination'}</ThemedText>
        </View>
      </SafeAreaView>

      {/* Map Area */}
      <View style={styles.mapContainer}>
        <ImageBackground
          source={{
            uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBG8I2-CeN3oj0QWcWcteVuQifHhXCeRZfX2LCR1NVbY4D7RtAbgyKmY63YQHIY_oWDcnCK6QGH2TRGj5TMySEdHsHy1CLbE_fr337aREnlxirUU9w9U3hUF7xuZQVgIg5mznlpWFxyOVusEF6wdwNy48Xte1gzzygKLBLYtTvNdoVzdM6v383uFfOUbxAhhvFv6l_yIjEi6KRfzE22fL4y1Siaa0jNfjdaVxpwcsSmb9TDsHqp7tRgCa0P5euNvhx2g4iwkgcZX18'
          }}
          style={styles.mapImage}
          resizeMode="cover"
        >
          <View style={styles.mapGradient} />

          {/* Top Buttons (Back & SOS) */}
          <SafeAreaView style={styles.buttonsHeader} edges={['top']}>
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={20} color="#0f172a" />
            </TouchableOpacity>

            <Animated.View style={{ opacity: pulseAnim.interpolate({ inputRange: [0, 1], outputRange: [0.8, 1] }) }}>
              <TouchableOpacity style={styles.sosButton}>
                <Ionicons name="shield" size={16} color="white" />
                <ThemedText style={styles.sosText}>SOS</ThemedText>
              </TouchableOpacity>
            </Animated.View>
          </SafeAreaView>

          {/* Driver Car Icon */}
          <View style={styles.driverCarContainer}>
            <View style={styles.driverCarInner}>
              <Ionicons name="car" size={24} color="#0b6f50" style={{ transform: [{ rotate: '45deg' }] }} />
            </View>
            <View style={styles.carEtaBadge}>
              <ThemedText style={styles.carEtaText}>5 mins away</ThemedText>
            </View>
          </View>

          {/* Destination Pin */}
          <View style={styles.destinationPinContainer}>
            <Ionicons name="location" size={36} color="#ef4444" />
          </View>
        </ImageBackground>
      </View>

      {/* Driver Card Bottom Sheet */}
      <ThemedView style={styles.bottomSheet}>
        <View style={styles.sheetHandleContainer}>
          <View style={styles.sheetHandle} />
        </View>

        <View style={styles.sheetContent}>
          {/* Driver Header & Status */}
          <View style={styles.headerRow}>
            <View>
              <ThemedText style={styles.headerTitle}>Driver is arriving</ThemedText>
              <ThemedText style={styles.headerSubtitle}>Arriving in 5 mins</ThemedText>
            </View>
            <View style={styles.onTimeBadge}>
              <ThemedText style={styles.onTimeText}>On Time</ThemedText>
            </View>
          </View>

          {/* Driver Profile */}
          <View style={styles.profileRow}>
            <View style={styles.avatarContainer}>
              <ImageBackground
                source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBQPqi9yEGGWrpmNqwgL_7urDjQx_dFN44lU0yTzQ_u1iAGV52oARtI7I8wDDlF0H6Weryk_IKMiXUkxkOF4sdD5CABIeuogqZcFjXunUnCgGilRTy9XHI0frQQjLsZsfYLLhI0gGFQUjUrY8BJJiELe7NokD_Z0ISeZPOuHHC_GVExO1y3yAEsPiHgf--KsGM5CXQc4EMUcmeErt_cT7eV--pBu9LtidcXprUvU58fuE9ehfzOL6if3qS3Kbg8ZQNnpvqUw8LNWmQ' }}
                style={styles.avatarInner}
                resizeMode="cover"
              />
              <View style={styles.ratingBadge}>
                <Ionicons name="star" size={10} color="#fbbf24" />
                <ThemedText style={styles.ratingText}>4.9</ThemedText>
              </View>
            </View>

            <View style={styles.profileDetails}>
              <ThemedText style={styles.driverName}>Musa</ThemedText>
              <View style={styles.carDetailsRow}>
                <ThemedText style={styles.carDetailText}>Toyota Corolla</ThemedText>
                <View style={styles.dotSeparator} />
                <ThemedText style={styles.carDetailText}>Silver</ThemedText>
              </View>
            </View>

            <View style={styles.plateContainer}>
              <ThemedText style={styles.plateText}>ABC-123-YZ</ThemedText>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionsRow}>
            <TouchableOpacity style={styles.callButton}>
              <Ionicons name="call" size={20} color="white" />
              <ThemedText style={styles.callButtonText}>Call Driver</ThemedText>
            </TouchableOpacity>

            <TouchableOpacity style={styles.messageButton}>
              <Ionicons name="chatbubble" size={20} color="#a16207" />
              <ThemedText style={styles.messageButtonText}>Message</ThemedText>
            </TouchableOpacity>
          </View>

          {/* Footer Actions */}
          <View style={[styles.footerActions, { paddingBottom: Math.max(20, insets.bottom + 8) }]}>
            <TouchableOpacity style={styles.footerActionLeft}>
              <Ionicons name="location" size={16} color="#64748b" />
              <ThemedText style={styles.footerActionText}>Share Trip Status</ThemedText>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push('/trip-completed')}>
              <ThemedText style={[styles.cancelActionText, { color: '#0fbd58' }]}>Complete Trip (Demo)</ThemedText>
            </TouchableOpacity>

            <TouchableOpacity>
              <ThemedText style={styles.cancelActionText}>Cancel Ride</ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </ThemedView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f6f8f7' },
  topStatusBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 20,
    alignItems: 'center',
    paddingTop: 8,
    pointerEvents: 'none',
  },
  statusBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 999,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  statusBadgeText: { fontSize: 12, fontWeight: '600', color: '#0f172a' },
  mapContainer: { flex: 1 },
  mapImage: { width: '100%', height: '100%' },
  mapGradient: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  buttonsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  backButton: {
    width: 44,
    height: 44,
    backgroundColor: 'white',
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sosButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ef4444',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 999,
    gap: 8,
    shadowColor: '#ef4444',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  sosText: { color: 'white', fontWeight: '700', letterSpacing: 0.5 },
  driverCarContainer: {
    position: 'absolute',
    top: '40%',
    left: '45%',
    transform: [{ translateX: -20 }, { translateY: -20 }],
    zIndex: 10,
    alignItems: 'center',
  },
  driverCarInner: {
    backgroundColor: 'white',
    padding: 6,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#0b6f50',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  carEtaBadge: {
    position: 'absolute',
    top: -36,
    backgroundColor: 'white',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  carEtaText: { fontSize: 12, fontWeight: '700', color: '#0f172a' },
  destinationPinContainer: {
    position: 'absolute',
    top: '30%',
    left: '65%',
    transform: [{ translateX: -18 }, { translateY: -18 }],
  },
  bottomSheet: {
    backgroundColor: 'white',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10,
  },
  sheetHandleContainer: { width: '100%', alignItems: 'center', paddingTop: 12, paddingBottom: 4 },
  sheetHandle: { width: 48, height: 6, backgroundColor: '#e2e8f0', borderRadius: 3 },
  sheetContent: { paddingHorizontal: 20, paddingTop: 16 },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
    paddingBottom: 16,
  },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#0f172a' },
  headerSubtitle: { fontSize: 14, fontWeight: '500', color: '#0b6f50', marginTop: 2 },
  onTimeBadge: {
    backgroundColor: 'rgba(11, 111, 80, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 4,
  },
  onTimeText: { color: '#0b6f50', fontSize: 14, fontWeight: '600' },
  profileRow: { flexDirection: 'row', alignItems: 'center', gap: 16, paddingVertical: 20 },
  avatarContainer: { width: 64, height: 64, position: 'relative' },
  avatarInner: {
    width: '100%',
    height: '100%',
    borderRadius: 32,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'white',
  },
  ratingBadge: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#f1f5f9',
    gap: 2,
  },
  ratingText: { fontSize: 10, fontWeight: '700', color: '#0f172a' },
  profileDetails: { flex: 1 },
  driverName: { fontSize: 20, fontWeight: '700', color: '#0f172a' },
  carDetailsRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 4 },
  carDetailText: { fontSize: 14, color: '#64748b' },
  dotSeparator: { width: 4, height: 4, borderRadius: 2, backgroundColor: '#cbd5e1' },
  plateContainer: {
    backgroundColor: '#f1f5f9',
    borderColor: '#e2e8f0',
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  plateText: { fontSize: 14, fontFamily: 'monospace', fontWeight: '700', color: '#334155' },
  actionsRow: { flexDirection: 'row', gap: 16, marginBottom: 16 },
  callButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0b6f50',
    height: 48,
    borderRadius: 8,
    gap: 8,
  },
  callButtonText: { color: 'white', fontWeight: '600', fontSize: 16 },
  messageButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(251, 191, 36, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(251, 191, 36, 0.3)',
    height: 48,
    borderRadius: 8,
    gap: 8,
  },
  messageButtonText: { color: '#a16207', fontWeight: '600', fontSize: 16 },
  footerActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    paddingTop: 16,
  },
  footerActionLeft: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  footerActionText: { fontSize: 14, fontWeight: '500', color: '#64748b' },
  cancelActionText: { fontSize: 12, fontWeight: '500', color: '#ef4444' },
});
