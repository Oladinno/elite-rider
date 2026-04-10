import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Animated,
  Dimensions,
} from 'react-native';

import { ThemedText } from '@/components/themed-text';

const { width, height } = Dimensions.get('window');

export default function SplashScreen() {
  const router = useRouter();
  const [progress] = useState(new Animated.Value(0));
  const [fadeAnim] = useState(new Animated.Value(0));

  const [percent, setPercent] = useState(0);

  useEffect(() => {
    // Fade in content
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    // Progress bar animation
    const listenerId = progress.addListener(({ value }) => {
      setPercent(Math.floor(value * 100));
    });

    Animated.timing(progress, {
      toValue: 1,
      duration: 2500,
      useNativeDriver: false,
    }).start(() => {
      // Navigate to Onboarding after progress finishes
      router.replace('/onboarding' as any);
    });

    return () => {
      progress.removeListener(listenerId);
    };
  }, []);

  const progressWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.container}>
      {/* Decorative Background Flares */}
      <View style={[styles.flare, styles.flareTop]} />
      <View style={[styles.flare, styles.flareBottom]} />

      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <View style={styles.roadStripe} />
          <Ionicons name="car-sport" size={56} color="white" />
        </View>

        {/* Title & Tagline */}
        <ThemedText style={styles.title}>Adamawa Rides</ThemedText>
        <ThemedText style={styles.tagline}>
          Fast & Affordable Rides in Adamawa
        </ThemedText>
      </Animated.View>

      {/* Footer loading Section */}
      <View style={styles.footer}>
        <View style={styles.loaderWrapper}>
          <View style={styles.loaderHeader}>
            <ThemedText style={styles.loaderLabel}>LOADING</ThemedText>
            <ThemedText style={styles.loaderPercentage}>
              {percent}%
            </ThemedText>
          </View>
          <View style={styles.track}>
            <Animated.View style={[styles.progress, { width: progressWidth }]} />
          </View>
        </View>
        <ThemedText style={styles.version}>v1.0.2</ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f8f7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flare: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: 'rgba(11, 111, 80, 0.05)',
  },
  flareTop: {
    top: -100,
    right: -100,
  },
  flareBottom: {
    bottom: height / 2,
    left: -150,
    backgroundColor: 'rgba(11, 111, 80, 0.08)',
  },
  content: {
    alignItems: 'center',
    paddingBottom: 40,
  },
  logoContainer: {
    width: 96,
    height: 96,
    backgroundColor: '#0b6f50',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    shadowColor: '#0b6f50',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
    overflow: 'hidden',
  },
  roadStripe: {
    position: 'absolute',
    bottom: 0,
    width: 32,
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    transform: [{ skewX: '-15deg' }, { translateX: 20 }],
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#0f172a',
    marginBottom: 8,
    textAlign: 'center',
  },
  tagline: {
    fontSize: 18,
    color: '#64748b',
    textAlign: 'center',
    maxWidth: 260,
    lineHeight: 26,
  },
  footer: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    paddingHorizontal: 40,
    alignItems: 'center',
    gap: 24,
  },
  loaderWrapper: {
    width: '100%',
    gap: 8,
  },
  loaderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 2,
  },
  loaderLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0b6f50',
    letterSpacing: 1.2,
  },
  loaderPercentage: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0b6f50',
  },
  track: {
    height: 6,
    width: '100%',
    backgroundColor: 'rgba(11, 111, 80, 0.1)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
    backgroundColor: '#0b6f50',
    borderRadius: 3,
  },
  version: {
    fontSize: 12,
    color: '#94a3b8',
    fontWeight: '500',
  },
});
