import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/hooks/use-theme';

export default function HelpCenterScreen() {
  const router = useRouter();
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="chevron-back" size={24} color="#0b6f50" />
          </TouchableOpacity>
          <ThemedText style={styles.headerTitle}>Help Center</ThemedText>
        </View>
        <TouchableOpacity style={styles.infoButton}>
          <Ionicons name="information-circle-outline" size={24} color="#0b6f50" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Search Bar */}
        <View style={styles.searchSection}>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color="#94a3b8" />
            <TextInput
              placeholder="Search for issues, trips, or safety..."
              placeholderTextColor="#94a3b8"
              style={styles.searchInput}
            />
          </View>
        </View>

        {/* Recent Trip Section */}
        <View style={styles.sectionHeader}>
          <ThemedText style={styles.sectionTitle}>Help with a recent trip</ThemedText>
        </View>
        <View style={styles.recentTripCard}>
          <View style={styles.tripInfoRow}>
            <View style={styles.tripDetails}>
              <ThemedText style={styles.tripLocation}>Trip to Jimeta Central Market</ThemedText>
              <ThemedText style={styles.tripMeta}>14 Oct, 10:30 AM • ₦2,500</ThemedText>
            </View>
            <ImageBackground
              source={{
                uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBTHWADohCrrYjUbcwEWh1lUS5h4K8VYb1icwe7tff6z0AIgbWAwB41t0WrsdP29FhjSrrTijvYAVOXi2yNzl8grpE3Rvim5WcsMNephhLxQLry8VVueddowZXZqszB9zU5-owbf7Uj-B4wJz-CHMwNLFBOaJJpp2Pu-KU-dkGHiY-ss-6Hsl-tO5i-kyp55eGIuu_V9hTBvSXnh5-3IpUL9B5vYubox0aGqQaMZav0n4wcAsf2U38R7nFGEa-WidMAYBlRDwi9Nts',
              }}
              style={styles.mapThumb}
              imageStyle={{ borderRadius: 8 }}
            />
          </View>
          <TouchableOpacity style={styles.getHelpButton}>
            <ThemedText style={styles.getHelpText}>Get help with this trip</ThemedText>
            <Ionicons name="chevron-forward" size={16} color="#0b6f50" />
          </TouchableOpacity>
        </View>

        {/* All Topics (Grid) */}
        <View style={styles.sectionHeader}>
          <ThemedText style={styles.sectionTitle}>All topics</ThemedText>
        </View>
        <View style={styles.topicsGrid}>
          <TopicCard
            icon="person"
            title="Account"
            subtitle="Profile & settings"
            iconColor="#2563eb"
            iconBg="#eff6ff"
          />
          <TopicCard
            icon="wallet"
            title="Payment"
            subtitle="Cash, Cards & NGN"
            iconColor="#059669"
            iconBg="#ecfdf5"
          />
          <TopicCard
            icon="shield"
            title="Safety"
            subtitle="Emergency & info"
            iconColor="#dc2626"
            iconBg="#fef2f2"
          />
          <TopicCard
            icon="book"
            title="App Guide"
            subtitle="How to use & promos"
            iconColor="#d97706"
            iconBg="#fffbeb"
          />
        </View>

        {/* Popular Topics (List) */}
        <View style={styles.popularSection}>
          <ThemedText style={styles.popularLabel}>POPULAR TOPICS</ThemedText>
          <View style={styles.popularList}>
            <PopularItem label="I lost an item" />
            <PopularItem label="Reporting a fare issue" />
            <PopularItem label="Updating my phone number" isLast />
          </View>
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Sticky Footer */}
      <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 20) }]}>
        <TouchableOpacity
          style={styles.contactButton}
          onPress={() => router.push('/contact-support' as any)}>
          <Ionicons name="chatbubble" size={20} color="white" />
          <ThemedText style={styles.contactText}>Contact Support</ThemedText>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

function TopicCard({ icon, title, subtitle, iconColor, iconBg }: any) {
  return (
    <TouchableOpacity style={styles.topicCard}>
      <View style={[styles.topicIconContainer, { backgroundColor: iconBg }]}>
        <Ionicons name={icon as any} size={20} color={iconColor} />
      </View>
      <View>
        <ThemedText style={styles.topicTitle}>{title}</ThemedText>
        <ThemedText style={styles.topicSubtitle}>{subtitle}</ThemedText>
      </View>
    </TouchableOpacity>
  );
}

function PopularItem({ label, isLast }: { label: string; isLast?: boolean }) {
  return (
    <TouchableOpacity style={[styles.popularItem, isLast && { borderBottomWidth: 0 }]}>
      <ThemedText style={styles.popularItemText}>{label}</ThemedText>
      <Ionicons name="chevron-forward" size={16} color="#cbd5e1" />
    </TouchableOpacity>
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
    borderBottomColor: 'rgba(11, 111, 80, 0.1)',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0f172a',
  },
  infoButton: {
    padding: 8,
    marginRight: -8,
  },
  scrollView: {
    flex: 1,
  },
  searchSection: {
    backgroundColor: 'white',
    padding: 16,
    paddingBottom: 20,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 52,
    gap: 12,
    borderWidth: 1,
    borderColor: 'rgba(11, 111, 80, 0.05)',
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#334155',
  },
  sectionHeader: {
    paddingHorizontal: 16,
    marginTop: 24,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0f172a',
  },
  recentTripCard: {
    backgroundColor: 'white',
    marginHorizontal: 16,
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(11, 111, 80, 0.05)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 8,
    elevation: 2,
  },
  tripInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 16,
  },
  tripDetails: {
    flex: 1,
    gap: 4,
  },
  tripLocation: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
  },
  tripMeta: {
    fontSize: 13,
    color: '#64748b',
  },
  mapThumb: {
    width: 64,
    height: 64,
    borderRadius: 8,
    backgroundColor: '#f1f5f9',
  },
  getHelpButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(11, 111, 80, 0.08)',
    height: 48,
    borderRadius: 12,
    marginTop: 16,
    gap: 8,
  },
  getHelpText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0b6f50',
  },
  topicsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 12,
  },
  topicCard: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(11, 111, 80, 0.05)',
    gap: 12,
  },
  topicIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topicTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0f172a',
  },
  topicSubtitle: {
    fontSize: 11,
    color: '#64748b',
    marginTop: 2,
  },
  popularSection: {
    paddingHorizontal: 16,
    marginTop: 32,
  },
  popularLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: '#94a3b8',
    letterSpacing: 1.5,
    marginBottom: 12,
    marginLeft: 4,
  },
  popularList: {
    backgroundColor: 'white',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(11, 111, 80, 0.05)',
    overflow: 'hidden',
  },
  popularItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  popularItemText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#334155',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(11, 111, 80, 0.05)',
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0b6f50',
    height: 56,
    borderRadius: 16,
    gap: 12,
    shadowColor: '#0b6f50',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  contactText: {
    fontSize: 16,
    fontWeight: '700',
    color: 'white',
  },
});
