import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useTheme } from '@/hooks/use-theme';

export default function WalletScreen() {
  const router = useRouter();
  const theme = useTheme();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#0f172a" />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>Wallet</ThemedText>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Balance Card */}
        <View style={styles.balanceCard}>
          <View style={[styles.decorativeCircle, styles.circle1]} />
          <View style={[styles.decorativeCircle, styles.circle2]} />
          <View style={styles.balanceContent}>
            <ThemedText style={styles.balanceLabel}>Available Balance</ThemedText>
            <ThemedText style={styles.balanceAmount}>₦4,500</ThemedText>
            <ThemedText style={styles.updateTime}>Updated just now</ThemedText>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionRow}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => router.push('/add-funds')}>
            <View style={styles.actionIconContainer}>
              <Ionicons name="add" size={20} color="#0b6f50" />
            </View>
            <ThemedText style={styles.actionLabel}>Add Funds</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <View style={styles.actionIconContainer}>
              <Ionicons name="paper-plane" size={20} color="#0b6f50" />
            </View>
            <ThemedText style={styles.actionLabel}>Send Money</ThemedText>
          </TouchableOpacity>
        </View>

        {/* Payment Methods */}
        <View style={styles.sectionHeader}>
          <ThemedText style={styles.sectionTitle}>Payment Methods</ThemedText>
          <TouchableOpacity>
            <ThemedText style={styles.manageLink}>Manage</ThemedText>
          </TouchableOpacity>
        </View>
        <View style={styles.methodsCard}>
          <PaymentMethodItem
            icon="wallet"
            title="Adamawa Rides Wallet"
            subtitle="Default method"
            selected={true}
            color="#0b6f50"
          />
          <PaymentMethodItem
            icon="cash"
            title="Cash Payment"
            subtitle="Pay directly to driver"
            selected={false}
            color="#10b981"
          />
          <PaymentMethodItem
            icon="card"
            title="Mastercard **** 1234"
            subtitle="Expires 12/26"
            selected={false}
            color="#6366f1"
          />
        </View>

        {/* Recent Transactions */}
        <View style={styles.sectionHeader}>
          <ThemedText style={styles.sectionTitle}>Recent Transactions</ThemedText>
          <TouchableOpacity>
            <ThemedText style={styles.manageLink}>View All</ThemedText>
          </TouchableOpacity>
        </View>
        <View style={styles.transactionsContainer}>
          <TransactionItem
            icon="car"
            title="Trip ID #8823"
            subtitle="Today, 10:30 AM"
            amount="- ₦500"
          />
          <TransactionItem
            icon="add-circle"
            title="Wallet Top-up"
            subtitle="Yesterday, 4:15 PM"
            amount="+ ₦2,000"
            isPositive
          />
          <TransactionItem
            icon="car"
            title="Trip ID #8742"
            subtitle="Oct 24, 09:12 AM"
            amount="- ₦750"
          />
        </View>
        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

function PaymentMethodItem({
  icon,
  title,
  subtitle,
  selected,
  color,
}: {
  icon: string;
  title: string;
  subtitle: string;
  selected: boolean;
  color: string;
}) {
  return (
    <TouchableOpacity style={styles.methodItem}>
      <View style={styles.methodContent}>
        <View style={[styles.methodIconContainer, { backgroundColor: `${color}1A` }]}>
          <Ionicons name={icon as any} size={20} color={color} />
        </View>
        <View>
          <ThemedText style={styles.methodTitle}>{title}</ThemedText>
          <ThemedText style={styles.methodSubtitle}>{subtitle}</ThemedText>
        </View>
      </View>
      <View style={[styles.radio, selected && styles.radioSelected]}>
        {selected && <View style={styles.radioInner} />}
      </View>
    </TouchableOpacity>
  );
}

function TransactionItem({
  icon,
  title,
  subtitle,
  amount,
  isPositive,
}: {
  icon: string;
  title: string;
  subtitle: string;
  amount: string;
  isPositive?: boolean;
}) {
  return (
    <View style={styles.transactionItem}>
      <View style={styles.methodContent}>
        <View style={styles.transactionIconContainer}>
          <Ionicons name={icon as any} size={18} color="#64748b" />
        </View>
        <View>
          <ThemedText style={styles.methodTitle}>{title}</ThemedText>
          <ThemedText style={styles.methodSubtitle}>{subtitle}</ThemedText>
        </View>
      </View>
      <ThemedText style={[styles.transactionAmount, isPositive && styles.positiveAmount]}>
        {amount}
      </ThemedText>
    </View>
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
    borderBottomColor: '#f1f5f9',
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
  scrollView: {
    flex: 1,
  },
  balanceCard: {
    backgroundColor: '#0b6f50',
    margin: 16,
    borderRadius: 20,
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    shadowColor: '#0b6f50',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  decorativeCircle: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 999,
  },
  circle1: {
    width: 160,
    height: 160,
    top: -80,
    right: -40,
  },
  circle2: {
    width: 120,
    height: 120,
    bottom: -60,
    left: -30,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  balanceContent: {
    alignItems: 'center',
    zIndex: 1,
  },
  balanceLabel: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0.5,
  },
  balanceAmount: {
    color: 'white',
    fontSize: 40,
    fontWeight: '800',
    marginTop: 4,
  },
  updateTime: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 12,
    marginTop: 8,
  },
  actionRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 16,
  },
  actionButton: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: '#f1f5f9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  actionIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(11, 111, 80, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#334155',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 24,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1e293b',
  },
  manageLink: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0b6f50',
  },
  methodsCard: {
    backgroundColor: 'white',
    marginHorizontal: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#f1f5f9',
    overflow: 'hidden',
  },
  methodItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f8fafc',
  },
  methodContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  methodIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  methodTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0f172a',
  },
  methodSubtitle: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 2,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#cbd5e1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: {
    borderColor: '#0b6f50',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#0b6f50',
  },
  transactionsContainer: {
    paddingHorizontal: 16,
    gap: 12,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: 'white',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  transactionIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f8fafc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  transactionAmount: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1e293b',
  },
  positiveAmount: {
    color: '#059669',
  },
});
