import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';

const { width } = Dimensions.get('window');

export default function OnboardingScreen() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: 'Book rides instantly',
      description: 'Find a reliable ride in Yola, Jimeta, or Mubi with just a few taps.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBbHPpcF3s4hmTXXbn7ht14bAyDCZoNm_y3f-mascTuUrNYnxpYFyKh9-NfU5OjSI5OZZDUwHo7jUkTvARdA5shHlxIUz_OoA7P0h95wifXxLhhh2iMByI1Coy7NwMCLes65WqHX-APsIA5n9WKaMf2pailY5kUScOXx1jI5HCzXjYq-uYabVvA1Z-SSofV1qG5QgvOioxttTrUzlgzTKtazY5eQfgzsc538U327q6QgPGvxACfXo4G1sjMRDzSylp2LhIsDczeGs8',
    },
    {
      title: 'Real-time Tracking',
      description: 'Watch your driver approach on the map in real-time.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCwnP-RJMVdVX48uzq4ro_Uy5Pks4iQSH1RuCnPKewICmKUtVjs1mmhrQo6Gmye2fAvrMrUncG4qmuv8up6oCj-VgCqm759gngkrOXzagpOYJDRzN9ho28AdFtVkIkWECIkMgPPK22ojB_D7WAdtWu5HxyZ6_QtMqHRcP3anJvEQK7XLA0d0CuoibydkVq6EXwQwaskA4tl6snJXtEvJFkPCjWhXXmkOuiD-LrPyXdPnvAjLpPAPEIMAG4vAwRhZxoH9WWpwCHFvt8',
    },
    {
      title: 'Affordable & Safe',
      description: 'Transparent pricing and professional drivers you can trust.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCHX-V7Y0A4_7LdM6X3zT_S_E3V3D_0_9_E_8_H_7_D_5_C_4_B_3_A_2_1_0_9_8_7_6_5_4_3_2_1_0_9_8_7_6_5_4_3_2_1_0_9_8_7_6_5_4_3_2_1_0', // Placeholder
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      router.replace('/login' as any);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Bar with Skip */}
      <View style={styles.topBar}>
        <View style={{ width: 40 }} />
        <TouchableOpacity onPress={() => router.replace('/login' as any)}>
          <ThemedText style={styles.skipText}>Skip</ThemedText>
        </TouchableOpacity>
      </View>

      {/* Illustration Area */}
      <View style={styles.illustrationArea}>
        <View style={styles.decorativeBlob} />
        <ImageBackground
          source={{ uri: steps[currentStep].image }}
          style={styles.illustration}
          resizeMode="contain"
        />
      </View>

      {/* Content Area */}
      <View style={styles.contentArea}>
        <ThemedText style={styles.title}>{steps[currentStep].title}</ThemedText>
        <ThemedText style={styles.description}>{steps[currentStep].description}</ThemedText>

        {/* Progress Indicators */}
        <View style={styles.progressRow}>
          {steps.map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                currentStep === i ? styles.activeDot : styles.inactiveDot,
              ]}
            />
          ))}
        </View>

        {/* Action Button */}
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <ThemedText style={styles.nextText}>
            {currentStep === steps.length - 1 ? 'Get Started' : 'Next'}
          </ThemedText>
          <Ionicons name="arrow-forward" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 12,
  },
  skipText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#94a3b8',
  },
  illustrationArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  decorativeBlob: {
    position: 'absolute',
    width: width * 1.2,
    height: width * 0.8,
    backgroundColor: 'rgba(11, 111, 80, 0.08)',
    borderRadius: 999,
    top: '30%',
    left: '-10%',
    zIndex: -1,
  },
  illustration: {
    width: '100%',
    aspectRatio: 4 / 3,
    borderRadius: 24,
  },
  contentArea: {
    paddingHorizontal: 32,
    paddingTop: 24,
    paddingBottom: 48,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#0f172a',
    textAlign: 'center',
    lineHeight: 40,
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
    maxWidth: 280,
  },
  progressRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
  activeDot: {
    width: 32,
    backgroundColor: '#0b6f50',
  },
  inactiveDot: {
    width: 8,
    backgroundColor: '#e2e8f0',
  },
  nextButton: {
    width: '100%',
    backgroundColor: '#0b6f50',
    height: 56,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    shadowColor: '#0b6f50',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  nextText: {
    fontSize: 16,
    fontWeight: '700',
    color: 'white',
  },
});
