import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ActivityItem } from '@/components/activity-item';
import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/hooks/use-theme';

export default function ActivityScreen() {
  const [activeTab, setActiveTab] = useState<'past' | 'upcoming'>('past');
  const theme = useTheme();
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: 'rgba(11, 111, 80, 0.1)' }]}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
            <Ionicons name="chevron-back" size={24} color="#0b6f50" />
          </TouchableOpacity>
          <ThemedText style={styles.headerTitle}>Your Activity</ThemedText>
        </View>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="help-circle-outline" size={24} color="#0b6f50" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Segmented Control */}
        <View style={styles.tabsContainer}>
          <View style={[styles.tabsBackground, { backgroundColor: 'rgba(11, 111, 80, 0.1)' }]}>
            <TouchableOpacity
              onPress={() => setActiveTab('past')}
              style={[
                styles.tabButton,
                activeTab === 'past' && styles.activeTabButton,
              ]}>
              <ThemedText
                style={[
                  styles.tabText,
                  activeTab === 'past' ? styles.activeTabText : styles.inactiveTabText,
                ]}>
                Past
              </ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setActiveTab('upcoming')}
              style={[
                styles.tabButton,
                activeTab === 'upcoming' && styles.activeTabButton,
              ]}>
              <ThemedText
                style={[
                  styles.tabText,
                  activeTab === 'upcoming' ? styles.activeTabText : styles.inactiveTabText,
                ]}>
                Upcoming
              </ThemedText>
            </TouchableOpacity>
          </View>
        </View>

        {/* List Content */}
        <View style={styles.listContainer}>
          {activeTab === 'past' ? (
            <>
              <ActivityItem
                pickup="Current Location"
                destination="123 Victoria Island, Lagos"
                price="₦4,500"
                date="Oct 24, 10:30 AM"
              />
              <ActivityItem
                pickup="Ikeja City Mall"
                destination="Lekki Phase 1, Phase 1"
                price="₦3,200"
                date="Oct 22, 08:15 PM"
              />
              <ActivityItem
                pickup="Murtala Muhammed Airport"
                destination="Surulere Central"
                price="₦5,800"
                date="Oct 19, 02:45 PM"
              />

              {/* Promo Card */}
              <View style={[styles.promoCard, { backgroundColor: 'rgba(11, 111, 80, 0.05)' }]}>
                <View style={styles.promoContent}>
                  <ThemedText style={styles.promoTitle}>Save on your next ride</ThemedText>
                  <ThemedText style={styles.promoSubtitle}>
                    Get 20% off when you refer a friend.
                  </ThemedText>
                  <TouchableOpacity style={styles.promoButton}>
                    <ThemedText style={styles.promoButtonText}>Learn More</ThemedText>
                  </TouchableOpacity>
                </View>
                <Ionicons name="gift" size={60} color="rgba(11, 111, 80, 0.1)" />
              </View>
            </>
          ) : (
            <View style={styles.emptyContainer}>
              <Ionicons name="calendar" size={48} color="#cbd5e1" />
              <ThemedText style={styles.emptyText}>No upcoming rides scheduled</ThemedText>
            </View>
          )}
        </View>
        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f8f7',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'white',
    borderBottomWidth: 1,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0f172a',
  },
  iconButton: {
    padding: 8,
  },
  scrollView: {
    flex: 1,
  },
  tabsContainer: {
    padding: 16,
  },
  tabsBackground: {
    flexDirection: 'row',
    height: 48,
    borderRadius: 12,
    padding: 4,
  },
  tabButton: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  activeTabButton: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
  },
  activeTabText: {
    color: '#0b6f50',
  },
  inactiveTabText: {
    color: 'rgba(11, 111, 80, 0.6)',
  },
  listContainer: {
    paddingHorizontal: 16,
  },
  promoCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
    borderRadius: 16,
    marginTop: 8,
    borderWidth: 1,
    borderColor: 'rgba(11, 111, 80, 0.1)',
  },
  promoContent: {
    flex: 1,
    marginRight: 16,
  },
  promoTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0b6f50',
  },
  promoSubtitle: {
    fontSize: 14,
    color: '#475569',
    marginTop: 4,
  },
  promoButton: {
    backgroundColor: '#0b6f50',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginTop: 16,
    alignSelf: 'flex-start',
  },
  promoButtonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 12,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 64,
  },
  emptyText: {
    marginTop: 16,
    fontSize: 16,
    color: '#64748b',
  },
});
