import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/hooks/use-theme';

export default function AddFundsScreen() {
  const router = useRouter();
  const theme = useTheme();
  const [amount, setAmount] = useState('2000');
  const [method, setMethod] = useState('card');

  const quickAdd = ['500', '1000', '2000', '5000'];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#0f172a" />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>Add Funds</ThemedText>
        <View style={{ width: 40 }} />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Current Balance Card */}
          <View style={styles.balanceCard}>
            <View style={styles.decorativeBlob} />
            <ThemedText style={styles.balanceLabel}>Current Balance</ThemedText>
            <ThemedText style={styles.balanceAmount}>₦2,450.00</ThemedText>
          </View>

          {/* Amount Input */}
          <View style={styles.inputSection}>
            <ThemedText style={styles.inputLabel}>Enter Amount</ThemedText>
            <View style={styles.inputWrapper}>
              <ThemedText style={styles.currencySymbol}>₦</ThemedText>
              <TextInput
                style={styles.amountInput}
                value={amount}
                onChangeText={setAmount}
                keyboardType="numeric"
                placeholder="0.00"
                placeholderTextColor="#64748b"
              />
              <TouchableOpacity onPress={() => setAmount('')} style={styles.clearButton}>
                <Ionicons name="close-circle" size={20} color="#0fbd58" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Quick Add Chips */}
          <View style={styles.quickAddRow}>
            {quickAdd.map((val) => (
              <TouchableOpacity
                key={val}
                onPress={() => setAmount(val)}
                style={[
                  styles.quickAddChip,
                  amount === val && styles.activeChip,
                ]}>
                <ThemedText
                  style={[
                    styles.quickAddText,
                    amount === val && styles.activeChipText,
                  ]}>
                  ₦{val === '1000' ? '1k' : val === '2000' ? '2k' : val === '5000' ? '5k' : val}
                </ThemedText>
              </TouchableOpacity>
            ))}
          </View>

          {/* Payment Method Section */}
          <View style={styles.sectionHeader}>
            <ThemedText style={styles.sectionTitle}>Payment Method</ThemedText>
          </View>
          <View style={styles.methodsContainer}>
            <MethodRadio
              icon="card"
              title="Pay with Card"
              subtitle="Secured by Paystack / Flutterwave"
              value="card"
              active={method === 'card'}
              onPress={() => setMethod('card')}
            />
            <MethodRadio
              icon="keypad"
              title="USSD Code"
              subtitle="Dial code to pay offline"
              value="ussd"
              active={method === 'ussd'}
              onPress={() => setMethod('ussd')}
            />
            <MethodRadio
              icon="cash"
              title="Bank Transfer"
              subtitle="Direct transfer to account"
              value="transfer"
              active={method === 'transfer'}
              onPress={() => setMethod('transfer')}
            />
          </View>

          <View style={{ height: 120 }} />
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Sticky Bottom Button */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.confirmButton}>
          <ThemedText style={styles.confirmText}>Confirm Top-up</ThemedText>
          <Ionicons name="arrow-forward" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

function MethodRadio({
  icon,
  title,
  subtitle,
  value,
  active,
  onPress,
}: {
  icon: string;
  title: string;
  subtitle: string;
  value: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.methodRadio, active && styles.activeMethodRadio]}>
      <View style={styles.methodIconContainer}>
        <Ionicons name={icon as any} size={24} color="#0fbd58" />
      </View>
      <View style={styles.methodInfo}>
        <ThemedText style={styles.methodTitle}>{title}</ThemedText>
        <ThemedText style={styles.methodSubtitle}>{subtitle}</ThemedText>
      </View>
      <View style={[styles.radio, active && styles.radioActive]}>
        {active && <View style={styles.radioInner} />}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#102218',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    padding: 8,
    borderRadius: 999,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: 'white',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  balanceCard: {
    backgroundColor: '#162f22',
    marginTop: 16,
    marginBottom: 32,
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    alignItems: 'center',
    overflow: 'hidden',
  },
  decorativeBlob: {
    position: 'absolute',
    top: -40,
    right: -40,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(15, 189, 88, 0.1)',
  },
  balanceLabel: {
    fontSize: 14,
    color: '#94a3b8',
    fontWeight: '500',
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: '800',
    color: 'white',
    marginTop: 4,
  },
  inputSection: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 14,
    color: '#94a3b8',
    fontWeight: '500',
    marginBottom: 12,
    marginLeft: 4,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#162f22',
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 80,
  },
  currencySymbol: {
    fontSize: 28,
    fontWeight: '800',
    color: '#94a3b8',
    marginRight: 8,
  },
  amountInput: {
    flex: 1,
    fontSize: 32,
    fontWeight: '800',
    color: 'white',
    padding: 0,
  },
  clearButton: {
    padding: 4,
  },
  quickAddRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 40,
  },
  quickAddChip: {
    flex: 1,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#162f22',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  activeChip: {
    backgroundColor: '#0fbd58',
    borderColor: '#0fbd58',
  },
  quickAddText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
  },
  activeChipText: {
    fontWeight: '800',
  },
  sectionHeader: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: 'white',
    marginLeft: 4,
  },
  methodsContainer: {
    gap: 12,
  },
  methodRadio: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#162f22',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: 'transparent',
    gap: 16,
  },
  activeMethodRadio: {
    borderColor: '#0fbd58',
    backgroundColor: 'rgba(15, 189, 88, 0.1)',
  },
  methodIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#0d1a12',
    alignItems: 'center',
    justifyContent: 'center',
  },
  methodInfo: {
    flex: 1,
  },
  methodTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  methodSubtitle: {
    fontSize: 12,
    color: '#94a3b8',
    marginTop: 2,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#475569',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioActive: {
    borderColor: '#0fbd58',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#0fbd58',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
    backgroundColor: 'rgba(16, 34, 24, 0.8)',
  },
  confirmButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0fbd58',
    height: 60,
    borderRadius: 16,
    gap: 8,
    shadowColor: '#0fbd58',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  confirmText: {
    fontSize: 18,
    fontWeight: '700',
    color: 'white',
  },
});
