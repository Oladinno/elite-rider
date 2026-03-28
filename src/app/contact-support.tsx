import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/hooks/use-theme';

export default function ContactSupportScreen() {
  const router = useRouter();
  const theme = useTheme();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#334155" />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>Help & Support</ThemedText>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <View style={styles.heroIconContainer}>
            <Ionicons name="headset" size={48} color="#0b6f50" />
          </View>
          <ThemedText style={styles.heroTitle}>How can we help?</ThemedText>
          <ThemedText style={styles.heroSubtitle}>
            Our team is available 24/7 to assist you with any issues.
          </ThemedText>
        </View>

        {/* Contact Options */}
        <View style={styles.sectionHeader}>
          <ThemedText style={styles.sectionLabel}>CONTACT OPTIONS</ThemedText>
        </View>
        <View style={styles.optionsContainer}>
          <ContactOption
            icon="chatbubble-ellipses"
            title="Chat with us"
            subtitle="Average wait: 2 mins"
            onPress={() => router.push('/support-chat')}
          />
          <ContactOption
            icon="call"
            title="Call Support"
            subtitle="Available 24/7 for safety"
          />
          <ContactOption
            icon="mail"
            title="Email Us"
            subtitle="Response within 24 hours"
          />
        </View>

        {/* Tickets Section */}
        <View style={styles.ticketsSection}>
          <View style={styles.ticketsHeader}>
            <ThemedText style={styles.sectionLabel}>YOUR OPEN TICKETS</ThemedText>
            <View style={styles.activeBadge}>
              <ThemedText style={styles.activeBadgeText}>2 Active</ThemedText>
            </View>
          </View>
          
          <View style={styles.ticketsList}>
            <TicketItem
              id="#TK-88219"
              title="Lost Item - iPhone 13"
              status="IN PROGRESS"
              time="45 mins ago"
              statusColor="#d97706"
              statusBg="#fef3c7"
            />
            <TicketItem
              id="#TK-88104"
              title="Incorrect fare calculation"
              status="UNDER REVIEW"
              time="2 hours ago"
              statusColor="#2563eb"
              statusBg="#eff6ff"
            />
          </View>
        </View>

        {/* FAQ Link */}
        <TouchableOpacity style={styles.faqLink}>
          <ThemedText style={styles.faqText}>Browse FAQs</ThemedText>
          <Ionicons name="open-outline" size={14} color="#0b6f50" />
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

function ContactOption({ icon, title, subtitle, onPress }: any) {
  return (
    <TouchableOpacity style={styles.optionCard} onPress={onPress}>
      <View style={styles.optionIconContainer}>
        <Ionicons name={icon} size={28} color="#0b6f50" />
      </View>
      <View style={styles.optionContent}>
        <ThemedText style={styles.optionTitle}>{title}</ThemedText>
        <ThemedText style={styles.optionSubtitle}>{subtitle}</ThemedText>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#cbd5e1" />
    </TouchableOpacity>
  );
}

function TicketItem({ id, title, status, time, statusColor, statusBg }: any) {
  return (
    <View style={styles.ticketItem}>
      <View style={styles.ticketHeader}>
        <ThemedText style={styles.ticketId}>{id}</ThemedText>
        <View style={[styles.statusBadge, { backgroundColor: statusBg }]}>
          <ThemedText style={[styles.statusText, { color: statusColor }]}>{status}</ThemedText>
        </View>
      </View>
      <ThemedText style={styles.ticketTitle}>{title}</ThemedText>
      <ThemedText style={styles.ticketTime}>Last update: {time}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
    borderRadius: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0f172a',
    marginLeft: 8,
  },
  scrollView: {
    flex: 1,
  },
  heroSection: {
    padding: 32,
    alignItems: 'center',
    textAlign: 'center',
  },
  heroIconContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: 'rgba(11, 111, 80, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0f172a',
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: 15,
    color: '#64748b',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 22,
  },
  sectionHeader: {
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#94a3b8',
    letterSpacing: 1,
  },
  optionsContainer: {
    paddingHorizontal: 16,
    gap: 12,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#f1f5f9',
    gap: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 8,
    elevation: 2,
  },
  optionIconContainer: {
    width: 52,
    height: 52,
    borderRadius: 12,
    backgroundColor: 'rgba(11, 111, 80, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionContent: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e293b',
  },
  optionSubtitle: {
    fontSize: 13,
    color: '#64748b',
    marginTop: 2,
  },
  ticketsSection: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  ticketsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  activeBadge: {
    backgroundColor: 'rgba(11, 111, 80, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 99,
  },
  activeBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0b6f50',
  },
  ticketsList: {
    gap: 12,
  },
  ticketItem: {
    padding: 16,
    backgroundColor: '#f8fafc',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  ticketHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  ticketId: {
    fontSize: 11,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    color: '#94a3b8',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '800',
  },
  ticketTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#334155',
  },
  ticketTime: {
    fontSize: 12,
    color: '#94a3b8',
    marginTop: 6,
  },
  faqLink: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 32,
    gap: 4,
  },
  faqText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0b6f50',
  },
});
