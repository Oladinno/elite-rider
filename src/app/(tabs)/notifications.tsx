import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/hooks/use-theme';

export default function NotificationsScreen() {
  const [activeTab, setActiveTab] = useState<'all' | 'trips' | 'offers'>('all');
  const router = useRouter();
  const theme = useTheme();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.headerLeft}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color="#0b6f50" />
            </TouchableOpacity>
            <ThemedText style={styles.headerTitle}>Notifications</ThemedText>
          </View>
          <TouchableOpacity>
            <ThemedText style={styles.markReadText}>Mark all as read</ThemedText>
          </TouchableOpacity>
        </View>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          <TabItem
            label="All"
            active={activeTab === 'all'}
            onPress={() => setActiveTab('all')}
          />
          <TabItem
            label="Trips"
            active={activeTab === 'trips'}
            onPress={() => setActiveTab('trips')}
          />
          <TabItem
            label="Offers"
            active={activeTab === 'offers'}
            onPress={() => setActiveTab('offers')}
          />
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Today Section */}
        <View style={styles.sectionDivider}>
          <ThemedText style={styles.sectionLabel}>TODAY</ThemedText>
        </View>

        <NotificationItem
          icon="car"
          title="Trip Update"
          description="Your driver is arriving in 2 minutes."
          time="2m ago"
          unread={true}
          type="trip"
        />

        <NotificationItem
          icon="pricetag"
          title="Promotion"
          description="Get 20% off your next 3 rides in Yola!"
          time="1h ago"
          unread={true}
          type="offer"
          accentColor="#F4B400"
        />

        {/* Yesterday Section */}
        <View style={styles.sectionDivider}>
          <ThemedText style={styles.sectionLabel}>YESTERDAY</ThemedText>
        </View>

        <NotificationItem
          icon="lock-closed"
          title="Account Security"
          description="Your password was successfully changed."
          time="Yesterday"
          unread={false}
          type="account"
        />

        <NotificationItem
          icon="wallet"
          title="Wallet Top-up"
          description="Wallet topped up with ₦2,000."
          time="Yesterday"
          unread={false}
          type="wallet"
        />
        
        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

function TabItem({ label, active, onPress }: { label: string; active: boolean; onPress: () => void }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.tabItem, active && styles.activeTabItem]}>
      <ThemedText style={[styles.tabText, active && styles.activeTabText]}>{label}</ThemedText>
    </TouchableOpacity>
  );
}

function NotificationItem({
  icon,
  title,
  description,
  time,
  unread,
  type,
  accentColor,
}: {
  icon: string;
  title: string;
  description: string;
  time: string;
  unread: boolean;
  type: string;
  accentColor?: string;
}) {
  const iconBgColor = accentColor ? `${accentColor}1A` : 'rgba(11, 111, 80, 0.1)';
  const iconTintColor = accentColor || '#0b6f50';

  return (
    <TouchableOpacity
      style={[
        styles.notificationItem,
        !unread && styles.readItem,
      ]}>
      <View style={[styles.iconContainer, { backgroundColor: iconBgColor }]}>
        <Ionicons name={icon as any} size={24} color={iconTintColor} />
      </View>
      <View style={styles.itemContent}>
        <View style={styles.itemHeader}>
          <ThemedText style={styles.itemTitle}>{title}</ThemedText>
          <ThemedText style={styles.itemTime}>{time}</ThemedText>
        </View>
        <ThemedText style={styles.itemDescription}>{description}</ThemedText>
      </View>
      {unread && <View style={styles.unreadDot} />}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(11, 111, 80, 0.1)',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
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
    fontSize: 20,
    fontWeight: '700',
    color: '#1e293b',
  },
  markReadText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0b6f50',
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  tabItem: {
    flex: 1,
    paddingVertical: 12,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
    alignItems: 'center',
  },
  activeTabItem: {
    borderBottomColor: '#0b6f50',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748b',
  },
  activeTabText: {
    color: '#0b6f50',
    fontWeight: '700',
  },
  scrollView: {
    flex: 1,
  },
  sectionDivider: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#f8fafc',
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '800',
    color: '#94a3b8',
    letterSpacing: 1,
  },
  notificationItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(11, 111, 80, 0.05)',
    alignItems: 'center',
  },
  readItem: {
    opacity: 0.6,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemContent: {
    flex: 1,
    marginLeft: 16,
    marginRight: 12,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f172a',
  },
  itemTime: {
    fontSize: 12,
    color: '#94a3b8',
  },
  itemDescription: {
    fontSize: 14,
    color: '#475569',
    marginTop: 4,
    lineHeight: 20,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#0b6f50',
  },
});
