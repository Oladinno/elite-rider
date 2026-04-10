import { useRouter } from 'expo-router';
import React from 'react';
import {
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useRideStore } from '@/store/use-ride-store';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const router = useRouter();
  const { pickup } = useRideStore();

  return (
    <View style={styles.container}>
      {/* Map Background Layer */}
      <View style={styles.mapContainer}>
        <ImageBackground
          source={{
            uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCwnP-RJMVdVX48uzq4ro_Uy5Pks4iQSH1RuCnPKewICmKUtVjs1mmhrQo6Gmye2fAvrMrUncG4qmuv8up6oCj-VgCqm759gngkrOXzagpOYJDRzN9ho28AdFtVkIkWECIkMgPPK22ojB_D7WAdtWu5HxyZ6_QtMqHRcP3anJvEQK7XLA0d0CuoibydkVq6EXwQwaskA4tl6snJXtEvJFkPCjWhXXmkOuiD-LrPyXdPnvAjLpPAPEIMAG4vAwRhZxoH9WWpwCHFvt8',
          }}
          style={styles.mapImage}
          resizeMode="cover">
          <View style={styles.mapOverlay} />

          {/* Simulated Map Markers */}
          <View style={[styles.marker, { top: '40%', left: '30%' }]}>
            <View style={styles.markerBadge}>
              <Ionicons name="car" size={20} color="#0b6f50" />
            </View>
          </View>
          <View style={[styles.marker, { top: '32%', right: '25%' }]}>
            <View style={styles.markerBadge}>
              <Ionicons name="car" size={20} color="#0b6f50" />
            </View>
          </View>
          <View style={[styles.marker, { bottom: '45%', left: '60%' }]}>
            <View style={styles.markerBadge}>
              <Ionicons name="car" size={20} color="#0b6f50" />
            </View>
          </View>

          {/* Current Location Pin */}
          <View style={styles.currentLocationContainer}>
            <View style={styles.pingEffect} />
            <View style={styles.locationPinOuter}>
              <View style={styles.locationPinInner} />
            </View>
          </View>
        </ImageBackground>
      </View>

      {/* UI Overlay Layer */}
      <SafeAreaView style={styles.overlay} edges={['top']}>
        {/* Top Search Bar */}
        <View style={styles.searchBarContainer}>
          <TouchableOpacity style={styles.menuButton}>
            <Ionicons name="menu" size={24} color="#64748b" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.searchPrompt}
            onPress={() => router.push('/ride-search')}
          >
            <View style={styles.statusDot} />
            <ThemedText style={styles.searchText}>Where to?</ThemedText>
          </TouchableOpacity>
          <View style={styles.topRightActions}>
            <TouchableOpacity style={styles.scheduleButton}>
              <Ionicons name="time" size={20} color="#94a3b8" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.profileButton}>
              <Image
                source={{
                  uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDMNsBgeeUUHbYuy1nKC3En5FtUG5s9C9ulkPYZdkecTP-NTQz-HjCOrOQONQ-Wl2y3a6osfpGm2igBL4KcMXe2_3VsvC1FGfSBxACrQITMQyzHNRBZI5CJW7_Ll1ShzpIgqbY8Jd84PPPofe32uhJzHtoSJxPRIZVm1kI8kvEkQloMDXnRrJ9IMTTiSqDtTJgJpm1VGU0JjmObIzUOy40oMgZAruW2KcgqhcFhiSgdfbgGsoW0-W4aC1k82Gc6bL4cND1LqVVw_yM',
                }}
                style={styles.profileImage}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ flex: 1 }} />

        {/* SOS & Recenter Buttons */}
        <View style={styles.floatingButtonsContainer}>
          <TouchableOpacity style={styles.recenterButton}>
            <Ionicons name="location" size={24} color="#334155" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.sosButton}>
            <Ionicons name="shield" size={20} color="white" />
            <ThemedText style={styles.sosText}>SOS</ThemedText>
          </TouchableOpacity>
        </View>

        {/* Bottom Sheet Section */}
        <ThemedView style={styles.bottomSheet}>
          <View style={styles.sheetHandleContainer}>
            <View style={styles.sheetHandle} />
          </View>

          <View style={styles.sheetContent}>
            {/* Trip Inputs */}
            <View style={styles.tripInputsRow}>
              <View style={styles.timelineContainer}>
                <View style={styles.timelineDot} />
                <View style={styles.timelineLine} />
                <View style={styles.timelineSquare} />
              </View>
              <View style={styles.inputContainer}>
                <View style={styles.pickupSection}>
                  <ThemedText style={styles.label}>Pickup</ThemedText>
                  <View style={styles.pickupRow}>
                    <ThemedText style={styles.pickupText}>{pickup?.address || 'Current Location'}</ThemedText>
                    <Ionicons name="pencil" size={14} color="#94a3b8" />
                  </View>
                </View>
                <TouchableOpacity 
                  style={styles.destinationSearch}
                  onPress={() => router.push('/ride-search')}
                >
                  <Ionicons name="search" size={20} color="#94a3b8" />
                  <ThemedText style={styles.destinationPlaceholder}>
                    Where are you going?
                  </ThemedText>
                </TouchableOpacity>
              </View>
            </View>

            {/* Quick Actions */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.quickActionsContainer}>
              <QuickActionButton icon="home" label="Home" theme={theme} color="#0b6f50" />
              <QuickActionButton icon="briefcase" label="Work" theme={theme} color="#3b82f6" />
              <QuickActionButton icon="school" label="FUTY" theme={theme} color="#f97316" />
              <QuickActionButton icon="star" label="Saved" theme={theme} color="#a855f7" />
            </ScrollView>
          </View>
          <View style={{ height: insets.bottom + 20 }} />
        </ThemedView>
      </SafeAreaView>
    </View>
  );
}

function QuickActionButton({
  icon,
  label,
  theme,
  color,
}: {
  icon: string;
  label: string;
  theme: any;
  color: string;
}) {
  return (
    <TouchableOpacity style={[styles.quickActionButton, { borderColor: theme.backgroundElement }]}>
      <View style={[styles.quickActionIconContainer, { backgroundColor: `${color}1A` }]}>
        <Ionicons name={icon as any} size={16} color={color} />
      </View>
      <ThemedText style={styles.quickActionLabel}>{label}</ThemedText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#e2e8f0',
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
  mapOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(11, 111, 80, 0.05)',
  },
  marker: {
    position: 'absolute',
  },
  markerBadge: {
    backgroundColor: 'white',
    padding: 6,
    borderRadius: 999,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: 'rgba(11, 111, 80, 0.2)',
  },
  currentLocationContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 64,
    height: 64,
    marginLeft: -32,
    marginTop: -32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pingEffect: {
    position: 'absolute',
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(11, 111, 80, 0.2)',
  },
  locationPinOuter: {
    width: 64,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
  },
  locationPinInner: {
    width: 16,
    height: 16,
    backgroundColor: '#0b6f50',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  overlay: {
    flex: 1,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: 16,
    marginTop: 12,
    padding: 12,
    borderRadius: 999,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#f1f5f9',
    gap: 12,
  },
  menuButton: {
    padding: 8,
  },
  searchPrompt: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#22c55e',
  },
  searchText: {
    fontWeight: '500',
    fontSize: 14,
    color: '#0f172a',
  },
  topRightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  scheduleButton: {
    padding: 8,
    backgroundColor: '#f8fafc',
    borderRadius: 999,
  },
  profileButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#e2e8f0',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'white',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  floatingButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  recenterButton: {
    width: 48,
    height: 48,
    backgroundColor: 'white',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  sosButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#dc2626',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 999,
    gap: 8,
    shadowColor: '#dc2626',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 5,
  },
  sosText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 14,
    letterSpacing: 0.5,
  },
  bottomSheet: {
    backgroundColor: 'white',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  sheetHandleContainer: {
    width: '100%',
    alignItems: 'center',
    paddingTop: 12,
    paddingBottom: 4,
  },
  sheetHandle: {
    width: 48,
    height: 6,
    backgroundColor: '#e2e8f0',
    borderRadius: 3,
  },
  sheetContent: {
    paddingHorizontal: 20,
    paddingBottom: 32,
    paddingTop: 8,
  },
  tripInputsRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 24,
  },
  timelineContainer: {
    alignItems: 'center',
    paddingTop: 12,
    gap: 4,
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#0b6f50',
    borderWidth: 3,
    borderColor: 'rgba(11, 111, 80, 0.3)',
  },
  timelineLine: {
    width: 2,
    height: 32,
    backgroundColor: '#e2e8f0',
    borderRadius: 1,
  },
  timelineSquare: {
    width: 12,
    height: 12,
    backgroundColor: '#1e293b',
  },
  inputContainer: {
    flex: 1,
    gap: 16,
  },
  pickupSection: {
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
    paddingBottom: 8,
  },
  label: {
    fontSize: 12,
    color: '#94a3b8',
    fontWeight: '500',
    marginBottom: 4,
  },
  pickupRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pickupText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#0f172a',
  },
  destinationSearch: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    padding: 12,
    borderRadius: 12,
    gap: 12,
  },
  destinationPlaceholder: {
    fontSize: 16,
    color: '#64748b',
    fontWeight: '500',
  },
  quickActionsContainer: {
    gap: 12,
    paddingBottom: 8,
  },
  quickActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    paddingLeft: 12,
    paddingRight: 16,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
    gap: 8,
  },
  quickActionIconContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickActionLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#334155',
  },
});
