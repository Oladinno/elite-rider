import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Image,
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

interface LoginErrors {
  identifier?: string;
  password?: string;
}

function validateLogin(
  authMethod: 'phone' | 'email',
  identifier: string,
  password: string
): LoginErrors {
  const errors: LoginErrors = {};

  if (!identifier.trim()) {
    errors.identifier =
      authMethod === 'phone' ? 'Phone number is required.' : 'Email address is required.';
  } else if (authMethod === 'email' && !EMAIL_REGEX.test(identifier.trim())) {
    errors.identifier = 'Enter a valid email address.';
  } else if (authMethod === 'phone' && !PHONE_REGEX.test(identifier.replace(/\s/g, ''))) {
    errors.identifier = 'Enter a valid 10- or 11-digit phone number.';
  }

  if (!password) {
    errors.password = 'Password is required.';
  } else if (password.length < MIN_PASSWORD_LENGTH) {
    errors.password = `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`;
  }

  return errors;
}

// ─── Component ─────────────────────────────────────────────────────────────────
export default function LoginScreen() {
  const router = useRouter();
  const [authMethod, setAuthMethod] = useState<'phone' | 'email'>('phone');
  const [showPassword, setShowPassword] = useState(false);

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<LoginErrors>({});
  const [touched, setTouched] = useState({ identifier: false, password: false });

  const handleBlur = (field: keyof typeof touched) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const newErrors = validateLogin(authMethod, identifier, password);
    setErrors(newErrors);
  };

  const handleSubmit = () => {
    setTouched({ identifier: true, password: true });
    const newErrors = validateLogin(authMethod, identifier, password);
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      router.replace('/home' as any);
    }
  };

  const switchMethod = (method: 'phone' | 'email') => {
    setAuthMethod(method);
    setIdentifier('');
    setErrors({});
    setTouched({ identifier: false, password: false });
  };

  const identifierError = touched.identifier ? errors.identifier : undefined;
  const passwordError = touched.password ? errors.password : undefined;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#00543b" />
        </TouchableOpacity>
        <ThemedText style={styles.headerBrand}>Adamawa Rides</ThemedText>
        <View style={{ width: 40 }} />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}>
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
          {/* Hero Branding */}
          <View style={styles.heroSection}>
            <ThemedText style={styles.heroTitle}>Welcome{'\n'}Back.</ThemedText>
            <ThemedText style={styles.heroSubtitle}>
              Sign in to continue your journey through Adamawa.
            </ThemedText>
          </View>

          {/* Login Card */}
          <View style={styles.card}>
            {/* Toggle */}
            <View style={styles.toggleContainer}>
              <TouchableOpacity
                style={[styles.toggleButton, authMethod === 'phone' && styles.toggleButtonActive]}
                onPress={() => switchMethod('phone')}>
                <ThemedText
                  style={[styles.toggleText, authMethod === 'phone' && styles.toggleTextActive]}>
                  PHONE
                </ThemedText>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.toggleButton, authMethod === 'email' && styles.toggleButtonActive]}
                onPress={() => switchMethod('email')}>
                <ThemedText
                  style={[styles.toggleText, authMethod === 'email' && styles.toggleTextActive]}>
                  EMAIL
                </ThemedText>
              </TouchableOpacity>
            </View>

            {/* Inputs */}
            <View style={styles.form}>
              {/* Identifier Field */}
              <View style={styles.inputGroup}>
                <ThemedText style={styles.inputLabel}>
                  {authMethod === 'phone' ? 'MOBILE NUMBER' : 'EMAIL ADDRESS'}
                </ThemedText>
                <View style={[styles.inputWrapper, !!identifierError && styles.inputError]}>
                  {authMethod === 'phone' && (
                    <View style={styles.countryCode}>
                      <Image
                        source={{
                          uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA_4lTTJ7hazFCzgiST_LSBk70rN30Ma5q7rJ7KXOM1x2f9i-p2UipFmIumCpQX9ekJ54WED5-3YM4cnaBILGeFee3ag_zII9x7V4XngNT8CFfL0AsGx96Tf9has8iR5BCJs78LskQpARMOuPEuXyt9s-yNyikhTBda7LXfP5Erwl46E2vvObe6KK8SUWGf50-8Zf94b_ADdVeiqbdU_FLgRpShrHrEHJ829BMXVWVjacXrcMAh9einmyA835u0xOE-kGHF192lZWA',
                        }}
                        style={styles.flag}
                      />
                      <ThemedText style={styles.codeText}>+234</ThemedText>
                      <View style={styles.divider} />
                    </View>
                  )}
                  <TextInput
                    style={styles.input}
                    placeholder={authMethod === 'phone' ? '803 000 0000' : 'email@example.com'}
                    keyboardType={authMethod === 'phone' ? 'phone-pad' : 'email-address'}
                    autoCapitalize="none"
                    placeholderTextColor="rgba(0, 0, 0, 0.3)"
                    value={identifier}
                    onChangeText={setIdentifier}
                    onBlur={() => handleBlur('identifier')}
                  />
                </View>
                {!!identifierError && (
                  <View style={styles.errorRow}>
                    <Ionicons name="alert-circle" size={13} color="#dc2626" />
                    <ThemedText style={styles.errorText}>{identifierError}</ThemedText>
                  </View>
                )}
              </View>

              {/* Password Field */}
              <View style={styles.inputGroup}>
                <ThemedText style={styles.inputLabel}>PASSWORD</ThemedText>
                <View style={[styles.inputWrapper, !!passwordError && styles.inputError]}>
                  <Ionicons name="lock-closed" size={20} color="#94a3b8" />
                  <TextInput
                    style={[styles.input, { flex: 1, marginLeft: 12 }]}
                    placeholder="••••••••"
                    secureTextEntry={!showPassword}
                    placeholderTextColor="rgba(0, 0, 0, 0.3)"
                    value={password}
                    onChangeText={setPassword}
                    onBlur={() => handleBlur('password')}
                  />
                  <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <Ionicons
                      name={showPassword ? 'eye-off' : 'eye'}
                      size={20}
                      color="#94a3b8"
                    />
                  </TouchableOpacity>
                </View>
                {!!passwordError && (
                  <View style={styles.errorRow}>
                    <Ionicons name="alert-circle" size={13} color="#dc2626" />
                    <ThemedText style={styles.errorText}>{passwordError}</ThemedText>
                  </View>
                )}
              </View>

              <TouchableOpacity style={styles.forgotButton}>
                <ThemedText style={styles.forgotText}>Forgot Password?</ThemedText>
              </TouchableOpacity>

              <TouchableOpacity style={styles.loginButton} onPress={handleSubmit}>
                <ThemedText style={styles.loginButtonText}>Login</ThemedText>
                <Ionicons name="arrow-forward" size={20} color="white" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Secondary Actions */}
          <View style={styles.secondarySection}>
            <View style={styles.separatorRow}>
              <View style={styles.line} />
              <ThemedText style={styles.separatorText}>NEW TO ADAMAWA?</ThemedText>
              <View style={styles.line} />
            </View>

            <TouchableOpacity
              style={styles.registerButton}
              onPress={() => router.push('/register')}>
              <ThemedText style={styles.registerButtonText}>Create Account</ThemedText>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Background Decoration */}
      <Image
        source={{
          uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMiRxgWNUCWXbygwXaEpobXz4RpVSzfi1Hw70V_lb5P8TKHjkNhZHAbtDXlssdH4aZtRxdBUfE4JAkqTAEJu2NVdaVFYPxdngk3CdebNoLe2Lkvc85v5577_2FucYresINDIIPxaKehW7gdU7ohZhbH9HjObWcbUlyFW8ohQwbHNxVYoI9--69XqNP73dmT-DiSqQ3_zUm--vAFPWJHX7KexJTGh_o6WvMBjbFThXAKW0fBRbiHqcQ1Gz4_QR-4ryD9Nds2TE9rbQ',
        }}
        style={styles.bgDecoration}
        resizeMode="cover"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f9f9' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  backButton: { padding: 8, borderRadius: 20, backgroundColor: '#f1f1f1' },
  headerBrand: { fontSize: 20, fontWeight: '900', fontStyle: 'italic', color: '#00543b' },
  scrollView: { flex: 1 },
  scrollContent: { paddingHorizontal: 32, paddingTop: 40, paddingBottom: 40 },
  heroSection: { marginBottom: 40 },
  heroTitle: {
    fontSize: 56,
    fontWeight: '800',
    color: '#00543b',
    lineHeight: 60,
    letterSpacing: -2,
  },
  heroSubtitle: {
    fontSize: 18,
    color: '#64748b',
    marginTop: 12,
    maxWidth: 260,
    lineHeight: 26,
    fontWeight: '500',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 32,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.05,
    shadowRadius: 24,
    elevation: 4,
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#f3f3f3',
    borderRadius: 12,
    padding: 4,
    marginBottom: 24,
  },
  toggleButton: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 8 },
  toggleButtonActive: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  toggleText: { fontSize: 11, fontWeight: '700', color: '#94a3b8', letterSpacing: 1.2 },
  toggleTextActive: { color: '#00543b' },
  form: { gap: 20 },
  inputGroup: { gap: 4 },
  inputLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: '#94a3b8',
    letterSpacing: 1,
    marginLeft: 4,
    marginBottom: 4,
  },
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
  errorRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4, marginLeft: 4 },
  errorText: { fontSize: 12, color: '#dc2626', fontWeight: '500', flex: 1 },
  countryCode: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  flag: { width: 24, height: 16, borderRadius: 2 },
  codeText: { fontSize: 16, fontWeight: '700', color: '#1e293b' },
  divider: { width: 1, height: 24, backgroundColor: '#e2e8f0', marginLeft: 4, marginRight: 12 },
  input: { flex: 1, fontSize: 18, fontWeight: '700', color: '#1e293b' },
  forgotButton: { alignSelf: 'flex-end' },
  forgotText: { fontSize: 14, fontWeight: '600', color: '#0b6e4f' },
  loginButton: {
    backgroundColor: '#0b6e4f',
    height: 64,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    marginTop: 12,
    shadowColor: '#0b6e4f',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  loginButtonText: { fontSize: 18, fontWeight: '700', color: 'white' },
  secondarySection: { marginTop: 40, alignItems: 'center', gap: 24 },
  separatorRow: { flexDirection: 'row', alignItems: 'center', gap: 12, width: '100%' },
  line: { flex: 1, height: 1, backgroundColor: '#e2e8f0' },
  separatorText: { fontSize: 11, fontWeight: '800', color: '#cbd5e1', letterSpacing: 1 },
  registerButton: {
    width: '100%',
    height: 56,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#e2e8f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  registerButtonText: { fontSize: 16, fontWeight: '700', color: '#00543b' },
  bgDecoration: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 200,
    zIndex: -1,
    opacity: 0.15,
  },
});
