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
import { useTheme } from '@/hooks/use-theme';

export default function EditProfileScreen() {
  const theme = useTheme();
  const router = useRouter();

  const [name, setName] = useState('Ibrahim Adamu');
  const [email, setEmail] = useState('ibrahim.adamu@example.com');
  const [phone, setPhone] = useState('803 123 4567');

  const handleSave = () => {
    // In a real app, this would call an API
    router.back();
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#0f172a" />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>Edit Profile</ThemedText>
        <TouchableOpacity onPress={handleSave}>
          <ThemedText style={styles.saveText}>Save</ThemedText>
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Avatar Section */}
          <View style={styles.avatarSection}>
            <View style={styles.avatarContainer}>
              <Image
                source={{
                  uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDvFVHtcCYkf7RutAUK7xkHJ_NgYtfW4-uqpQyPXnnSeL8nId2awXIGXWFWFp1eV0LRiKuvGTUzHEGfEyCLshBfDNIcNyMUAVPQTbcs5Nf1OdwlTVjO3OLY5LYeeD8qRSOJwnwMDkr7uTuOP9ask9vaiplNq2EEQkicK-MR7OQaXdW_6yMSaqTfeDiSUAuVokFTincHhApYAstuD6hk_ZBMZagyD1oxt3TYvtmja82viUF0dzkIxhpFvT_EofsJbdbYct6WIjF7tzk',
                }}
                style={styles.avatar}
              />
              <TouchableOpacity style={styles.editBadge}>
                <Ionicons name="camera" size={18} color="#0fbd58" />
              </TouchableOpacity>
            </View>
            <ThemedText style={styles.avatarHint}>Tap to change photo</ThemedText>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <ThemedText style={styles.inputLabel}>FULL NAME</ThemedText>
              <View style={styles.inputWrapper}>
                <Ionicons name="person-outline" size={20} color="#94a3b8" />
                <TextInput
                  style={styles.input}
                  value={name}
                  onChangeText={setName}
                  placeholder="Enter your full name"
                  placeholderTextColor="#94a3b8"
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <ThemedText style={styles.inputLabel}>EMAIL ADDRESS</ThemedText>
              <View style={styles.inputWrapper}>
                <Ionicons name="mail-outline" size={20} color="#94a3b8" />
                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Enter your email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  placeholderTextColor="#94a3b8"
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <ThemedText style={styles.inputLabel}>PHONE NUMBER</ThemedText>
              <View style={styles.inputWrapper}>
                <View style={styles.countryCode}>
                  <ThemedText style={styles.codeText}>+234</ThemedText>
                  <View style={styles.divider} />
                </View>
                <TextInput
                  style={styles.input}
                  value={phone}
                  onChangeText={setPhone}
                  placeholder="803 000 0000"
                  keyboardType="phone-pad"
                  placeholderTextColor="#94a3b8"
                />
              </View>
            </View>

            {/* Change Password Link */}
            <TouchableOpacity
              style={styles.changePasswordButton}
              onPress={() => router.push('/change-password')}>
              <View style={styles.changePasswordLeft}>
                <View style={styles.lockIconContainer}>
                  <Ionicons name="lock-closed" size={20} color="#64748b" />
                </View>
                <ThemedText style={styles.changePasswordText}>Change Password</ThemedText>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#cbd5e1" />
            </TouchableOpacity>
          </View>

          <View style={styles.footer}>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <ThemedText style={styles.saveButtonText}>Save Changes</ThemedText>
            </TouchableOpacity>
          </View>

          <View style={{ height: 40 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#f1f5f9',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0f172a',
  },
  saveText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0fbd58',
    padding: 8,
  },
  scrollView: {
    flex: 1,
  },
  avatarSection: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#f8fafc',
  },
  editBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: 'white',
    width: 36,
    height: 36,
    borderRadius: 18,
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
  avatarHint: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 12,
    fontWeight: '500',
  },
  form: {
    paddingHorizontal: 24,
    gap: 24,
  },
  inputGroup: {
    gap: 8,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '800',
    color: '#94a3b8',
    letterSpacing: 1,
    marginLeft: 4,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 56,
    borderWidth: 1.5,
    borderColor: '#f1f5f9',
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
    marginLeft: 12,
  },
  countryCode: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  codeText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f172a',
  },
  divider: {
    width: 1,
    height: 24,
    backgroundColor: '#e2e8f0',
    marginRight: 12,
  },
  changePasswordButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f8fafc',
    padding: 16,
    borderRadius: 16,
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  changePasswordLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  lockIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  changePasswordText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0f172a',
  },
  footer: {
    paddingHorizontal: 24,
    marginTop: 40,
  },
  saveButton: {
    backgroundColor: '#0f172a',
    height: 60,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: 'white',
  },
});
