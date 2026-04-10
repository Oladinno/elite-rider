import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { useRideStore, Location } from '@/store/use-ride-store';

const RECENT_SEARCHES: Location[] = [
  { address: '123 Victoria Island, Lagos', latitude: 6.4281, longitude: 3.4219 },
  { address: 'Ikeja City Mall', latitude: 6.6194, longitude: 3.3504 },
  { address: 'Murtala Muhammed Airport', latitude: 6.5774, longitude: 3.3210 },
];

const SAVED_PLACES = [
  { label: 'Home', address: 'Jimeta Road, Yola', icon: 'home', color: '#0b6f50' },
  { label: 'Work', address: 'FUTY Main Campus', icon: 'briefcase', color: '#3b82f6' },
];

export default function RideSearchScreen() {
  const router = useRouter();
  const { pickup, destination, setPickup, setDestination } = useRideStore();
  
  const [pickupInput, setPickupInput] = useState(pickup?.address || '');
  const [destInput, setDestInput] = useState(destination?.address || '');

  const handleSelectLocation = (loc: Location) => {
    setDestination(loc);
    router.push('/ride-options');
  };

  const swapLocations = () => {
    const tempInput = pickupInput;
    setPickupInput(destInput);
    setDestInput(tempInput);
    
    // In a real app we'd swap store values too
    const tempPickup = pickup;
    setPickup(destination);
    setDestination(tempPickup);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Search Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#0f172a" />
          </TouchableOpacity>
          <ThemedText style={styles.headerTitle}>Plan your trip</ThemedText>
        </View>

        <View style={styles.searchInputsContainer}>
          <View style={styles.timelineContainer}>
            <View style={styles.timelineDot} />
            <View style={styles.timelineLine} />
            <View style={styles.timelineSquare} />
          </View>

          <View style={styles.inputsWrapper}>
            <View style={styles.inputBox}>
              <TextInput
                style={styles.input}
                placeholder="Pickup location"
                value={pickupInput}
                onChangeText={setPickupInput}
                placeholderTextColor="#94a3b8"
              />
              {pickupInput.length > 0 && (
                <TouchableOpacity onPress={() => setPickupInput('')}>
                  <Ionicons name="close-circle" size={16} color="#cbd5e1" />
                </TouchableOpacity>
              )}
            </View>

            <View style={[styles.inputBox, styles.destInput]}>
              <TextInput
                style={styles.input}
                placeholder="Where to?"
                value={destInput}
                onChangeText={setDestInput}
                autoFocus
                placeholderTextColor="#94a3b8"
              />
              {destInput.length > 0 && (
                <TouchableOpacity onPress={() => setDestInput('')}>
                  <Ionicons name="close-circle" size={16} color="#cbd5e1" />
                </TouchableOpacity>
              )}
            </View>
          </View>

          <TouchableOpacity style={styles.swapButton} onPress={swapLocations}>
            <Ionicons name="swap-vertical" size={20} color="#0b6f50" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Saved Places */}
        <View style={styles.section}>
          {SAVED_PLACES.map((place, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.locationItem}
              onPress={() => handleSelectLocation({ address: place.address, latitude: 0, longitude: 0 })}
            >
              <View style={[styles.locationIconContainer, { backgroundColor: `${place.color}1A` }]}>
                <Ionicons name={place.icon as any} size={18} color={place.color} />
              </View>
              <View style={styles.locationDetails}>
                <ThemedText style={styles.locationLabel}>{place.label}</ThemedText>
                <ThemedText style={styles.locationAddress}>{place.address}</ThemedText>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Recent Searches */}
        <View style={styles.sectionHeader}>
          <ThemedText style={styles.sectionTitle}>RECENT SEARCHES</ThemedText>
        </View>
        <View style={styles.section}>
          {RECENT_SEARCHES.map((search, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.locationItem}
              onPress={() => handleSelectLocation(search)}
            >
              <View style={styles.locationIconContainer}>
                <Ionicons name="time" size={18} color="#64748b" />
              </View>
              <View style={styles.locationDetails}>
                <ThemedText style={styles.locationLabel} numberOfLines={1}>{search.address}</ThemedText>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Set on Map */}
        <TouchableOpacity style={styles.setMapButton}>
          <View style={[styles.locationIconContainer, { backgroundColor: '#f1f5f9' }]}>
            <Ionicons name="map" size={18} color="#334155" />
          </View>
          <ThemedText style={styles.setMapText}>Set destination on map</ThemedText>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 24,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
    zIndex: 10,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 16,
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0f172a',
  },
  searchInputsContainer: {
    flexDirection: 'row',
    marginTop: 12,
    gap: 16,
    alignItems: 'center',
  },
  timelineContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingTop: 4,
  },
  timelineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#0b6f50',
  },
  timelineLine: {
    width: 2,
    height: 36,
    backgroundColor: '#f1f5f9',
  },
  timelineSquare: {
    width: 8,
    height: 8,
    backgroundColor: '#0f172a',
  },
  inputsWrapper: {
    flex: 1,
    gap: 12,
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 48,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  destInput: {
    borderColor: '#0b6f50',
    backgroundColor: 'white',
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#0f172a',
  },
  swapButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    marginTop: 24,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#94a3b8',
    letterSpacing: 1,
  },
  section: {
    gap: 4,
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f8fafc',
  },
  locationIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f8fafc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  locationDetails: {
    flex: 1,
  },
  locationLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
  },
  locationAddress: {
    fontSize: 13,
    color: '#64748b',
    marginTop: 2,
  },
  setMapButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
    paddingVertical: 12,
    gap: 16,
  },
  setMapText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#334155',
  },
});
