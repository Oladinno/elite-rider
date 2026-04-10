import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
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

// ─── Validation Helpers ────────────────────────────────────────────────────────
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[0-9]{10,11}$/; // 10-11 digits after the +234 prefix
const MIN_PASSWORD_LENGTH = 8;
// At least one uppercase, one lowercase, one digit
const PASSWORD_STRENGTH_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;

interface RegisterErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  password?: string;
  terms?: string;
}

function validateRegister(
  fullName: string,
  email: string,
  phone: string,
  password: string,
  agreed: boolean
): RegisterErrors {
  const errors: RegisterErrors = {};

  if (!fullName.trim() || fullName.trim().split(' ').length < 2) {
    errors.fullName = 'Please enter your first and last name.';
  }

  // Email is optional — only validate format if user typed something
  if (email.trim() && !EMAIL_REGEX.test(email.trim())) {
    errors.email = 'Enter a valid email address.';
  }

  if (!phone.trim()) {
    errors.phone = 'Phone number is required.';
  } else if (!PHONE_REGEX.test(phone.replace(/\s/g, ''))) {
    errors.phone = 'Enter a valid 10- or 11-digit phone number.';
  }

  if (!password) {
    errors.password = 'Password is required.';
  } else if (password.length < MIN_PASSWORD_LENGTH) {
    errors.password = `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`;
  } else if (!PASSWORD_STRENGTH_REGEX.test(password)) {
    errors.password = 'Include uppercase, lowercase, and a number.';
  }

  if (!agreed) {
    errors.terms = 'You must agree to the Terms of Service.';
  }

  return errors;
}

function getPasswordStrength(password: string): { level: number; label: string; color: string } {
  if (!password) return { level: 0, label: '', color: '#e2e8f0' };
  if (password.length < 6) return { level: 1, label: 'Weak', color: '#ef4444' };
  if (password.length < 8 || !PASSWORD_STRENGTH_REGEX.test(password))
    return { level: 2, label: 'Fair', color: '#f97316' };
  if (password.length >= 8 && PASSWORD_STRENGTH_REGEX.test(password))
    return { level: 3, label: 'Strong', color: '#22c55e' };
  return { level: 0, label: '', color: '#e2e8f0' };
}

// ─── Component ─────────────────────────────────────────────────────────────────
export default function RegisterScreen() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const [errors, setErrors] = useState<RegisterErrors>({});
  const [touched, setTouched] = useState({
    fullName: false,
    email: false,
    phone: false,
    password: false,
    terms: false,
  });

  const handleBlur = (field: keyof typeof touched) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const newErrors = validateRegister(fullName, email, phone, password, agreed);
    setErrors(newErrors);
  };

  const handleSubmit = () => {
    setTouched({ fullName: true, email: true, phone: true, password: true, terms: true });
    const newErrors = validateRegister(fullName, email, phone, password, agreed);
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      router.replace('/home' as any);
    }
  };

  const strength = getPasswordStrength(password);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#00543b" />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>Navigator</ThemedText>
        <ThemedText style={styles.headerBrand}>ADAMAWA</ThemedText>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}>
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
          {/* Hero Section */}
          <View style={styles.heroSection}>
            <View style={styles.badge}>
              <ThemedText style={styles.badgeText}>JOIN THE JOURNEY</ThemedText>
            </View>
            <ThemedText style={styles.heroTitle}>
              The Resilient <ThemedText style={styles.italic}>Navigator</ThemedText>
            </ThemedText>
            <ThemedText style={styles.heroSubtitle}>
              Experience premium editorial mobility in Adamawa. Sign up to begin your curated journey.
            </ThemedText>
          </View>

          {/* Sign Up Form */}
          <View style={styles.formCard}>

            {/* Full Name */}
            <View style={styles.inputGroup}>
              <ThemedText style={styles.inputLabel}>FULL NAME</ThemedText>
              <View style={[styles.inputWrapper, touched.fullName && !!errors.fullName && styles.inputError]}>
                <Ionicons name="person" size={20} color="#94a3b8" />
                <TextInput
                  style={styles.input}
                  placeholder="Enter your full name"
                  placeholderTextColor="rgba(0, 0, 0, 0.3)"
                  value={fullName}
                  onChangeText={setFullName}
                  onBlur={() => handleBlur('fullName')}
                />
              </View>
              {touched.fullName && !!errors.fullName && (
                <View style={styles.errorRow}>
                  <Ionicons name="alert-circle" size={13} color="#dc2626" />
                  <ThemedText style={styles.errorText}>{errors.fullName}</ThemedText>
                </View>
              )}
            </View>

            {/* Email (Optional) */}
            <View style={styles.inputGroup}>
              <View style={styles.inputLabelRow}>
                <ThemedText style={styles.inputLabel}>EMAIL ADDRESS</ThemedText>
                <ThemedText style={styles.optionalText}>OPTIONAL</ThemedText>
              </View>
              <View style={[styles.inputWrapper, touched.email && !!errors.email && styles.inputError]}>
                <Ionicons name="mail" size={20} color="#94a3b8" />
                <TextInput
                  style={styles.input}
                  placeholder="email@example.com"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  placeholderTextColor="rgba(0, 0, 0, 0.3)"
                  value={email}
                  onChangeText={setEmail}
                  onBlur={() => handleBlur('email')}
                />
              </View>
              {touched.email && !!errors.email && (
                <View style={styles.errorRow}>
                  <Ionicons name="alert-circle" size={13} color="#dc2626" />
                  <ThemedText style={styles.errorText}>{errors.email}</ThemedText>
                </View>
              )}
            </View>

            {/* Phone */}
            <View style={styles.inputGroup}>
              <ThemedText style={styles.inputLabel}>MOBILE NUMBER</ThemedText>
              <View style={styles.phoneInputRow}>
                <View style={styles.countryCode}>
                  <ThemedText style={styles.codeText}>+234</ThemedText>
                </View>
                <View style={[styles.inputWrapper, { flex: 1 }, touched.phone && !!errors.phone && styles.inputError]}>
                  <Ionicons name="call" size={20} color="#94a3b8" />
                  <TextInput
                    style={styles.input}
                    placeholder="801 234 5678"
                    keyboardType="phone-pad"
                    placeholderTextColor="rgba(0, 0, 0, 0.3)"
                    value={phone}
                    onChangeText={setPhone}
                    onBlur={() => handleBlur('phone')}
                  />
                </View>
              </View>
              {touched.phone && !!errors.phone && (
                <View style={styles.errorRow}>
                  <Ionicons name="alert-circle" size={13} color="#dc2626" />
                  <ThemedText style={styles.errorText}>{errors.phone}</ThemedText>
                </View>
              )}
            </View>

            {/* Password */}
            <View style={styles.inputGroup}>
              <ThemedText style={styles.inputLabel}>CREATE PASSWORD</ThemedText>
              <View style={[styles.inputWrapper, touched.password && !!errors.password && styles.inputError]}>
                <Ionicons name="lock-closed" size={20} color="#94a3b8" />
                <TextInput
                  style={[styles.input, { flex: 1, marginLeft: 12 }]}
                  placeholder="••••••••"
                  secureTextEntry={!showPassword}
                  placeholderTextColor="rgba(0, 0, 0, 0.3)"
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text);
                    if (touched.password) {
                      setErrors(validateRegister(fullName, email, phone, text, agreed));
                    }
                  }}
                  onBlur={() => handleBlur('password')}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={20} color="#94a3b8" />
                </TouchableOpacity>
              </View>
              {/* Password Strength Meter */}
              {password.length > 0 && (
                <View style={styles.strengthContainer}>
                  <View style={styles.strengthBars}>
                    {[1, 2, 3].map((bar) => (
                      <View
                        key={bar}
                        style={[
                          styles.strengthBar,
                          { backgroundColor: strength.level >= bar ? strength.color : '#e2e8f0' },
                        ]}
                      />
                    ))}
                  </View>
                  {strength.label ? (
                    <ThemedText style={[styles.strengthLabel, { color: strength.color }]}>
                      {strength.label}
                    </ThemedText>
                  ) : null}
                </View>
              )}
              {touched.password && !!errors.password && (
                <View style={styles.errorRow}>
                  <Ionicons name="alert-circle" size={13} color="#dc2626" />
                  <ThemedText style={styles.errorText}>{errors.password}</ThemedText>
                </View>
              )}
            </View>

            {/* Terms Row */}
            <View>
              <View style={styles.termsRow}>
                <TouchableOpacity
                  style={[styles.checkbox, agreed && styles.checkboxActive]}
                  onPress={() => {
                    setAgreed(!agreed);
                    setTouched((prev) => ({ ...prev, terms: true }));
                    const updated = validateRegister(fullName, email, phone, password, !agreed);
                    setErrors(updated);
                  }}>
                  {agreed && <Ionicons name="checkmark" size={16} color="white" />}
                </TouchableOpacity>
                <ThemedText style={styles.termsText}>
                  I agree to the <ThemedText style={styles.link}>Terms of Service</ThemedText> and{' '}
                  <ThemedText style={styles.link}>Privacy Policy</ThemedText> of Adamawa Rides.
                </ThemedText>
              </View>
              {touched.terms && !!errors.terms && (
                <View style={[styles.errorRow, { marginTop: 6 }]}>
                  <Ionicons name="alert-circle" size={13} color="#dc2626" />
                  <ThemedText style={styles.errorText}>{errors.terms}</ThemedText>
                </View>
              )}
            </View>

            {/* Submit Button */}
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <ThemedText style={styles.submitButtonText}>CREATE ACCOUNT</ThemedText>
            </TouchableOpacity>

            <View style={styles.footer}>
              <ThemedText style={styles.footerText}>
                Already a member?{' '}
                <ThemedText style={styles.loginLink} onPress={() => router.push('/login')}>
                  Log In
                </ThemedText>
              </ThemedText>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f9f9' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#f3f3f3',
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: 'white',
    marginRight: 12,
  },
  headerTitle: { flex: 1, fontSize: 20, fontWeight: '700', color: '#00543b' },
  headerBrand: { fontSize: 16, fontWeight: '900', fontStyle: 'italic', color: '#00543b', letterSpacing: 2 },
  scrollView: { flex: 1 },
  scrollContent: { paddingHorizontal: 24, paddingTop: 32, paddingBottom: 40 },
  heroSection: { marginBottom: 32 },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: '#fdbc13',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 99,
    marginBottom: 16,
  },
  badgeText: { fontSize: 10, fontWeight: '800', color: '#261900', letterSpacing: 1.2 },
  heroTitle: {
    fontSize: 48,
    fontWeight: '800',
    color: '#1a1c1c',
    lineHeight: 52,
    letterSpacing: -1.5,
  },
  italic: { fontStyle: 'italic', color: '#00543b' },
  heroSubtitle: { fontSize: 17, color: '#475569', marginTop: 12, lineHeight: 24, fontWeight: '500' },
  formCard: {
    backgroundColor: 'white',
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 24 },
    shadowOpacity: 0.04,
    shadowRadius: 24,
    elevation: 4,
    gap: 20,
  },
  inputGroup: { gap: 4 },
  inputLabelRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  inputLabel: {
    fontSize: 11,
    fontWeight: '900',
    color: '#00543b',
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  optionalText: { fontSize: 10, fontWeight: '700', color: '#94a3b8' },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f3f3',
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 56,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  inputError: { borderColor: '#dc2626', backgroundColor: '#fff5f5' },
  errorRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4, marginLeft: 2 },
  errorText: { fontSize: 12, color: '#dc2626', fontWeight: '500', flex: 1 },
  phoneInputRow: { flexDirection: 'row', gap: 12 },
  countryCode: {
    width: 64,
    height: 56,
    backgroundColor: '#f3f3f3',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  codeText: { fontSize: 16, fontWeight: '800', color: '#1a1c1c' },
  input: { flex: 1, fontSize: 16, fontWeight: '600', color: '#1a1c1c', marginLeft: 12 },
  strengthContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
    paddingHorizontal: 4,
  },
  strengthBars: { flexDirection: 'row', gap: 4, flex: 1 },
  strengthBar: { flex: 1, height: 4, borderRadius: 2 },
  strengthLabel: { fontSize: 11, fontWeight: '700' },
  termsRow: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
    marginTop: 8,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#e2e2e2',
    backgroundColor: '#f3f3f3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxActive: { backgroundColor: '#00543b', borderColor: '#00543b' },
  termsText: { flex: 1, fontSize: 13, color: '#64748b', lineHeight: 18, fontWeight: '500' },
  link: { color: '#00543b', fontWeight: '700', textDecorationLine: 'underline' },
  submitButton: {
    backgroundColor: '#00543b',
    height: 64,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    shadowColor: '#00543b',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.25,
    shadowRadius: 24,
    elevation: 8,
  },
  submitButtonText: { fontSize: 16, fontWeight: '800', color: 'white', letterSpacing: 2 },
  footer: { borderTopWidth: 1, borderTopColor: '#f3f3f3', paddingTop: 24, alignItems: 'center' },
  footerText: { fontSize: 15, color: '#64748b', fontWeight: '600' },
  loginLink: { color: '#00543b', fontWeight: '800' },
});
