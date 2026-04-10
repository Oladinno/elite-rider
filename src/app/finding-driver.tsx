import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  Image,
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

export default function FindingDriverScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { destination } = useRideStore();

  // Simulation state
  const [statusText, setStatusText] = useState('Finding your driver...');
  const [isCompleted, setIsCompleted] = useState(false);

  // Animation values
  const pulse1 = useRef(new Animated.Value(0)).current;
  const pulse2 = useRef(new Animated.Value(0)).current;
  const spin = useRef(new Animated.Value(0)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;
  const carFloat = useRef(new Animated.Value(0)).current;

  // Use a ref to store active animations for cleanup
  const activeAnimations = useRef<Animated.CompositeAnimation[]>([]);

  useEffect(() => {
    // 1. Improved Repeating Pulse Animations
    const pulseLoop1 = Animated.loop(
      Animated.timing(pulse1, {
        toValue: 1,
        duration: 3000,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      })
    );
    
    const pulseLoop2 = Animated.loop(
      Animated.sequence([
        Animated.delay(1000),
        Animated.timing(pulse2, {
          toValue: 1,
          duration: 3000,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );

    // 2. Spinner animation
    const spinLoop = Animated.loop(
      Animated.timing(spin, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );

    // 3. Floating Car animation
    const floatLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(carFloat, {
          toValue: 1,
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(carFloat, {
          toValue: 0,
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );

    // Start background animations
    activeAnimations.current = [pulseLoop1, pulseLoop2, spinLoop, floatLoop];
    activeAnimations.current.forEach(anim => anim.start());

    // 4. Ride Simulation Flow (10 seconds)
    const simulationDuration = 10000;
    
    // Animate progress bar
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: simulationDuration,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();

    // Timeline of status updates
    const timeouts = [
      setTimeout(() => setStatusText('Scanning nearby drivers...'), 2000),
      setTimeout(() => setStatusText('Connecting to Musa...'), 5000),
      setTimeout(() => setStatusText('Finalizing match...'), 8000),
      setTimeout(() => {
        setStatusText('Driver found!');
        setIsCompleted(true);
        router.replace('/driver-assigned' as any);
      }, simulationDuration),
    ];

    return () => {
      // Cleanup: Stop all animations and clear timeouts
      activeAnimations.current.forEach(anim => anim.stop());
      timeouts.forEach(t => clearTimeout(t));
    };
  }, []);

  const spinInterpolate = spin.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  const carTranslateY = carFloat.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -4],
  });

  // Safe address display to prevent crashes
  const destinationName = destination?.address 
    ? destination.address.split(',')[0].trim() 
    : 'Destination';

  return (
    <View style={styles.container}>
      {/* Top Header - Using dynamic padding for responsiveness */}
      <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
        <View style={styles.headerContent}>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => router.back()}
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={24} color="#00543b" />
          </TouchableOpacity>
          <ThemedText style={styles.headerTitle}>Finding Your Ride</ThemedText>
        </View>
      </View>

      {/* Main Map Content */}
      <View style={styles.mapContainer}>
        <ImageBackground
          source={{
            uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBpX2HIj22dbpiBpqYZwsUC_UzKvnNAefhJThWp-WUQceg0KQmFvS1GRoy6hAN3bHL_bVKjRObmLhY1YRJqsoogYRRBYKBczENLekcb9BRFNv51yPDNykw2gZnRuWQCgE0vb7MKRSVumpsniq1hjGWB2b38F6cnB_PuXCoFPM9_-Ll9Ky7f4ZP-OtooLfLdF00yNLS5ntx3mqlzfmns3JIWWIlkl4m_hSAGapHLzqj8M-PkkYPJ4X9eFeI6rKQNjQZmQbecHPcVImE',
          }}
          style={styles.mapImage}
          imageStyle={{ opacity: 0.8, backgroundColor: '#e2e8f0' }} // Background color for slow loading
          resizeMode="cover"
        >
          {/* User Location Pulse - Robust centering */}
          <View style={styles.centerPulseWrapper}>
            <View style={styles.pulseContainer}>
              <Animated.View
                style={[
                  styles.pulseRing,
                  {
                    opacity: pulse1.interpolate({ inputRange: [0, 1], outputRange: [0.6, 0] }),
                    transform: [
                      { scale: pulse1.interpolate({ inputRange: [0, 1], outputRange: [0.5, 2.5] }) },
                    ],
                  },
                ]}
              />
              <Animated.View
                style={[
                  styles.pulseRing,
                  {
                    opacity: pulse2.interpolate({ inputRange: [0, 1], outputRange: [0.4, 0] }),
                    transform: [
                      { scale: pulse2.interpolate({ inputRange: [0, 1], outputRange: [0.5, 2.5] }) },
                    ],
                  },
                ]}
              />
              <View style={styles.userDot} />
            </View>
          </View>

          {/* Contextual Nearby Cars with floating animation */}
          <Animated.View style={[styles.nearbyCar1, { transform: [{ translateY: carTranslateY }, { rotate: '-12deg' }] }]}>
            <View style={styles.nearbyCarBadge}>
              <Ionicons name="car" size={16} color="#0b6e4f" />
              <ThemedText style={styles.nearbyCarText}>2 MIN</ThemedText>
            </View>
          </Animated.View>

          <Animated.View style={[styles.nearbyCar2, { transform: [{ translateY: Animated.multiply(carTranslateY, -1) }, { rotate: '6deg' }] }]}>
            <View style={styles.nearbyCarBadge}>
              <Ionicons name="car" size={16} color="#0b6e4f" />
              <ThemedText style={styles.nearbyCarText}>5 MIN</ThemedText>
            </View>
          </Animated.View>
        </ImageBackground>

        {/* Floating Status Overlay - Responsive positioning */}
        <View style={[styles.statusOverlay, { top: insets.top + 80 }]}>
          <View style={styles.statusInner}>
            <View style={styles.statusLeftRow}>
              <View style={styles.statusIconContainer}>
                <Ionicons name="radio" size={20} color="white" />
              </View>
              <View>
                <ThemedText style={styles.statusLabel}>STATUS</ThemedText>
                <ThemedText style={styles.statusTitle}>{statusText}</ThemedText>
              </View>
            </View>
            <Animated.View style={[styles.spinner, { transform: [{ rotate: spinInterpolate }] }]} />
          </View>
        </View>

        {/* Bottom Sheet Persistence */}
        <View style={[styles.bottomCard, { paddingBottom: Math.max(30, insets.bottom + 24) }]}>
          {/* Trip Summary Card */}
          <View style={styles.tripSummaryHeader}>
            <View style={styles.tripSummaryLeft}>
              <View style={styles.boltIconContainer}>
                <Ionicons name="flash" size={20} color="#261900" />
              </View>
              <View style={{ flex: 1 }}>
                <ThemedText style={styles.serviceName} numberOfLines={1}>Economy Class</ThemedText>
                <ThemedText style={styles.servicePrice} numberOfLines={1}>To {destinationName}</ThemedText>
              </View>
            </View>
            <View style={styles.statusBadgeContainer}>
              <View style={[styles.searchingBadge, isCompleted && styles.completedBadge]}>
                <ThemedText style={[styles.searchingText, isCompleted && styles.completedText]}>
                  {isCompleted ? 'FOUND' : 'SEARCHING'}
                </ThemedText>
              </View>
            </View>
          </View>

          {/* Real Animated Progress Bar */}
          <View style={styles.progressBarContainer}>
            <View style={styles.progressBackground}>
              <Animated.View style={[styles.progressFill, { width: progressWidth }]} />
            </View>
          </View>

          {/* Improved Car Selection Display */}
          <View style={styles.carSuggestionsRow}>
            <View style={styles.carSuggestionCard}>
              <Image 
                source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCkYvq6aCwFO1NXkeFaz-ZosManMy1CVCPof1Kd3ONNiei7-K0FBMQzQT41GoH3qQS2v-idqe-XHnMbm0bsHysPNP395PjSKJIE7KpO-GPDwwkQl_ChgVVCBSmm_YnwLFxrI4M7bITpMcR1IiRMsxqe9fFYvLDeGaTTcXU4x7Nsi_Yv08hfHB5K1JAwJAFlajeyoCYDnCKY6aJm5Emz11HA8t-OOlqS45BiX1w_BbAh2nvqN9su8wOxKRWRI_qtc_zNsFSuEqnP5RU' }}
                style={styles.carSuggestionImage}
                resizeMode="contain"
              />
              <ThemedText style={styles.carSuggestionLabel}>SEDAN CLASS</ThemedText>
            </View>
            <View style={[styles.carSuggestionCard, styles.carSuggestionCardInactive]}>
              <Image 
                source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDccTFoml3BHYAklUOgNE_YHiTdJisGCMkR97JSlMJRn3PgbZQGLhcHk0ccFkVapVh05HCd5Y8n68stAFWV2aOM1NGFi8xrxBDx0tn-fCLxNwUm4ckTiRUMqfoAz8Zta_BqGDRsccvsCi-Mj0cs9hKWzuZql61LLsqza--iQbQDwBoA0ymU8Ec0g7rPPuw5MTUNXB7_mHdaUcI6In2ZeKj0PEOU7kxWrRymjMvLIwVa-RZXHWL2fRmkRz7Xtaq7fHoJRZXQxUNRbUI' }}
                style={styles.carSuggestionImage}
                resizeMode="contain"
              />
              <ThemedText style={styles.carSuggestionLabelInactive}>PREMIUM SUV</ThemedText>
            </View>
          </View>

          {/* Cancel Button - Correct logic to return back */}
          <TouchableOpacity 
            style={styles.cancelButton}
            onPress={() => router.back()}
            activeOpacity={0.8}
          >
            <Ionicons name="close-circle" size={20} color="#ba1a1a" />
            <ThemedText style={styles.cancelButtonText}>Cancel Request</ThemedText>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f9f9' },
  header: {
    position: 'absolute',
    top: 0,
    width: '100%',
    zIndex: 50,
    backgroundColor: 'rgba(249, 249, 249, 0.95)',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 16,
    gap: 16,
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(11, 110, 79, 0.1)',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#00543b',
  },
  mapContainer: { flex: 1, position: 'relative' },
  mapImage: { width: '100%', height: '100%' },
  centerPulseWrapper: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pulseContainer: {
    width: 200,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pulseRing: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#0b6e4f',
  },
  userDot: {
    width: 24,
    height: 24,
    backgroundColor: '#00543b',
    borderRadius: 12,
    borderWidth: 4,
    borderColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  nearbyCar1: {
    position: 'absolute',
    top: '33%',
    left: '25%',
  },
  nearbyCar2: {
    position: 'absolute',
    bottom: '33%',
    right: '25%',
  },
  nearbyCarBadge: {
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    borderWidth: 1,
    borderColor: 'rgba(190, 201, 193, 0.15)',
  },
  nearbyCarText: { fontSize: 10, fontWeight: '700', color: '#00543b' },
  statusOverlay: {
    position: 'absolute',
    left: 24,
    right: 24,
    zIndex: 20,
  },
  statusInner: {
    backgroundColor: 'rgba(11, 110, 79, 0.9)',
    padding: 16,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 10,
  },
  statusLeftRow: { flexDirection: 'row', alignItems: 'center', gap: 16, flex: 1 },
  statusIconContainer: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusLabel: { color: 'rgba(255, 255, 255, 0.8)', fontSize: 10, fontWeight: '600', letterSpacing: 0.5 },
  statusTitle: { color: 'white', fontSize: 16, fontWeight: '700' },
  spinner: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderTopColor: 'white',
  },
  bottomCard: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 40,
    backgroundColor: 'white',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -8 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 20,
    gap: 20,
  },
  tripSummaryHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  tripSummaryLeft: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 },
  boltIconContainer: {
    backgroundColor: '#fdbc13',
    padding: 8,
    borderRadius: 12,
  },
  serviceName: { fontSize: 16, fontWeight: '800', color: '#1a1c1c' },
  servicePrice: { fontSize: 13, fontWeight: '500', color: '#64748b', marginTop: 2 },
  statusBadgeContainer: { marginLeft: 12 },
  searchingBadge: {
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  completedBadge: {
    backgroundColor: '#dcfce7',
  },
  searchingText: { fontSize: 10, fontWeight: '800', color: '#64748b' },
  completedText: { color: '#15803d' },
  progressBarContainer: {
    height: 6,
    width: '100%',
  },
  progressBackground: {
    height: '100%',
    backgroundColor: '#f1f5f9',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#0b6e4f',
    borderRadius: 3,
  },
  carSuggestionsRow: { flexDirection: 'row', gap: 12 },
  carSuggestionCard: {
    flex: 1,
    backgroundColor: 'rgba(11, 110, 79, 0.05)',
    padding: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(11, 110, 79, 0.1)',
    alignItems: 'center',
    gap: 6,
  },
  carSuggestionCardInactive: {
    backgroundColor: '#f8fafc',
    borderColor: 'transparent',
    opacity: 0.5,
  },
  carSuggestionImage: { width: '80%', height: 40 },
  carSuggestionLabel: { fontSize: 10, fontWeight: '700', color: '#0b6e4f' },
  carSuggestionLabelInactive: { fontSize: 10, fontWeight: '700', color: '#64748b' },
  cancelButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#fef2f2',
    paddingVertical: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#fee2e2',
  },
  cancelButtonText: { fontSize: 15, fontWeight: '700', color: '#991b1b' },
});

