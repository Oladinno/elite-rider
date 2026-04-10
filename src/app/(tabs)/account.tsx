import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/hooks/use-theme';

export default function AccountScreen() {
  const theme = useTheme();
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <ThemedText style={styles.headerTitle}>Profile</ThemedText>
        <TouchableOpacity style={styles.settingsButton}>
          <Ionicons name="settings" size={24} color="#64748b" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Profile Hero Section */}
        <View style={styles.heroSection}>
          <View style={styles.avatarContainer}>
            <Image
              source={{
                uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDvFVHtcCYkf7RutAUK7xkHJ_NgYtfW4-uqpQyPXnnSeL8nId2awXIGXWFWFp1eV0LRiKuvGTUzHEGfEyCLshBfDNIcNyMUAVPQTbcs5Nf1OdwlTVjO3OLY5LYeeD8qRSOJwnwMDkr7uTuOP9ask9vaiplNq2EEQkicK-MR7OQaXdW_6yMSaqTfeDiSUAuVokFTincHhApYAstuD6hk_ZBMZagyD1oxt3TYvtmja82viUF0dzkIxhpFvT_EofsJbdbYct6WIjF7tzk',
              }}
              style={styles.avatar}
            />
            <TouchableOpacity
              style={styles.editBadge}
              onPress={() => router.push('/edit-profile')}>
              <Ionicons name="pencil" size={14} color="#0fbd58" />
            </TouchableOpacity>
          </View>

          <ThemedText style={styles.userName}>Ibrahim Adamu</ThemedText>

          <View style={styles.metaRow}>
            <View style={styles.badge}>
              <Ionicons name="star" size={12} color="#0fbd58" />
              <ThemedText style={styles.badgeText}>4.9</ThemedText>
            </View>
            <View style={[styles.badge, styles.verifiedBadge]}>
              <Ionicons name="checkmark-circle" size={12} color="#0fbd58" />
              <ThemedText style={[styles.badgeText, styles.verifiedText]}>Verified</ThemedText>
            </View>
          </View>
        </View>

        {/* Settings Sections */}
        <View style={styles.sectionsContainer}>
          <SettingsSection title="ACCOUNT">
            <SettingItem
              icon="person"
              label="Personal Info"
              subtitle="Edit name, phone, email"
              onPress={() => router.push('/edit-profile')}
            />
            <SettingItem
              icon="bookmark"
              label="Saved Places"
              subtitle="Home, Work, Frequent"
            />
            <SettingItem
              icon="card"
              label="Wallet & Payment"
              subtitle="Cards, bank transfer"
              onPress={() => router.push('/wallet')}
            />
          </SettingsSection>

          <SettingsSection title="PREFERENCES">
            <SettingItem icon="notifications" label="Notifications" />
            <SettingItem icon="globe" label="Language" value="English" />
          </SettingsSection>

          <SettingsSection title="SUPPORT">
            <SettingItem
              icon="help-circle"
              label="Help Center"
              onPress={() => router.push('/help')}
            />
            <SettingItem
              icon="shield"
              label="Emergency Contacts"
              isCritical
            />
            <SettingItem icon="document-text" label="Privacy Policy" />
          </SettingsSection>
        </View>

        {/* Logout Button */}
        <View style={styles.logoutContainer}>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={() => router.replace('/login' as any)}>
            <Ionicons name="log-out-outline" size={20} color="#dc2626" />
            <ThemedText style={styles.logoutText}>Log Out</ThemedText>
          </TouchableOpacity>
          <ThemedText style={styles.versionText}>Version 2.4.0 • Adamawa Ride</ThemedText>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

function SettingsSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={styles.sectionContainer}>
      <ThemedText style={styles.sectionLabel}>{title}</ThemedText>
      <View style={styles.sectionCard}>{children}</View>
    </View>
  );
}

function SettingItem({
  icon,
  label,
  subtitle,
  value,
  isCritical,
  onPress,
}: {
  icon: string;
  label: string;
  subtitle?: string;
  value?: string;
  isCritical?: boolean;
  onPress?: () => void;
}) {
  return (
    <TouchableOpacity style={styles.settingItem} onPress={onPress}>
      <View style={styles.settingLeft}>
        <View style={[styles.settingIconContainer, isCritical && styles.criticalIconContainer]}>
          <Ionicons name={icon as any} size={20} color={isCritical ? '#ef4444' : '#64748b'} />
        </View>
        <View>
          <ThemedText style={styles.settingLabel}>{label}</ThemedText>
          {subtitle && <ThemedText style={styles.settingSubtitle}>{subtitle}</ThemedText>}
        </View>
      </View>
      <View style={styles.settingRight}>
        {value && <ThemedText style={styles.settingValue}>{value}</ThemedText>}
        <Ionicons name="chevron-forward" size={16} color="#cbd5e1" />
      </View>
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
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0f172a',
  },
  settingsButton: {
    padding: 8,
  },
  scrollView: {
    flex: 1,
  },
  heroSection: {
    alignItems: 'center',
    paddingTop: 32,
    paddingBottom: 24,
    paddingHorizontal: 20,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 112,
    height: 112,
    borderRadius: 56,
    borderWidth: 4,
    borderColor: 'white',
  },
  editBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: 'white',
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  userName: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0f172a',
    marginTop: 16,
  },
  metaRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 12,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'white',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#f1f5f9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  badgeText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#334155',
  },
  verifiedBadge: {
    backgroundColor: 'rgba(15, 189, 88, 0.1)',
    borderColor: 'rgba(15, 189, 88, 0.2)',
  },
  verifiedText: {
    color: '#0fbd58',
    fontWeight: '600',
  },
  sectionsContainer: {
    paddingHorizontal: 20,
    gap: 24,
  },
  sectionContainer: {
    gap: 12,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#94a3b8',
    letterSpacing: 1.5,
    marginLeft: 8,
  },
  sectionCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#f1f5f9',
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f8fafc',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  settingIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  criticalIconContainer: {
    backgroundColor: '#fef2f2',
  },
  settingLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0f172a',
  },
  settingSubtitle: {
    fontSize: 12,
    color: '#94a3b8',
    marginTop: 2,
  },
  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  settingValue: {
    fontSize: 14,
    color: '#64748b',
  },
  logoutContainer: {
    paddingHorizontal: 20,
    marginTop: 32,
    paddingBottom: 40,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#fee2e2',
    height: 60,
    borderRadius: 16,
    gap: 12,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#dc2626',
  },
  versionText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#94a3b8',
    marginTop: 16,
  },
});
