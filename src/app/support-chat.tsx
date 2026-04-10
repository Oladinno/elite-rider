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

export default function SupportChatScreen() {
  const router = useRouter();
  const [message, setMessage] = useState('');

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#0b6f50" />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <ThemedText style={styles.headerTitle}>Support Chat</ThemedText>
          <View style={styles.statusRow}>
            <View style={styles.statusDot} />
            <ThemedText style={styles.statusText}>Support is online</ThemedText>
          </View>
        </View>
        <TouchableOpacity style={styles.callButton}>
          <Ionicons name="call" size={20} color="#0b6f50" />
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}>
        <ScrollView style={styles.chatArea} contentContainerStyle={styles.chatContent}>
          <ThemedText style={styles.timestamp}>TODAY, 10:45 AM</ThemedText>

          <View style={[styles.messageBubble, styles.botBubble]}>
            <ThemedText style={styles.botText}>
              Hello Ibrahim! 👋 How can we help you today? Whether it's about a recent trip, payment, or safety, our team is here for you.
            </ThemedText>
          </View>

          <View style={[styles.messageBubble, styles.userBubble]}>
            <ThemedText style={styles.userText}>
              I have an issue with my last trip fare.
            </ThemedText>
          </View>

          <View style={[styles.messageBubble, styles.botBubble]}>
            <ThemedText style={styles.botText}>
              I'm sorry to hear that. Could you please specify which trip you're referring to? You can tap the trip in your history to link it here.
            </ThemedText>
          </View>
        </ScrollView>

        {/* Message Input */}
        <View style={styles.inputArea}>
          <TouchableOpacity style={styles.attachmentButton}>
            <Ionicons name="add" size={24} color="#94a3b8" />
          </TouchableOpacity>
          <View style={styles.inputWrapper}>
            <TextInput
              placeholder="Type a message..."
              style={styles.input}
              value={message}
              onChangeText={setMessage}
              multiline
            />
          </View>
          <TouchableOpacity
            style={[styles.sendButton, !message && styles.sendButtonDisabled]}
            disabled={!message}>
            <Ionicons name="send" size={20} color="white" />
          </TouchableOpacity>
        </View>
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
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
    backgroundColor: 'white',
  },
  backButton: {
    padding: 4,
  },
  headerTitleContainer: {
    flex: 1,
    marginLeft: 12,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f172a',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10b981',
  },
  statusText: {
    fontSize: 11,
    color: '#64748b',
  },
  callButton: {
    padding: 8,
    backgroundColor: '#f1f5f9',
    borderRadius: 20,
  },
  chatArea: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  chatContent: {
    padding: 16,
    gap: 16,
  },
  timestamp: {
    textAlign: 'center',
    fontSize: 11,
    fontWeight: '700',
    color: '#94a3b8',
    marginVertical: 8,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
  },
  botBubble: {
    alignSelf: 'flex-start',
    backgroundColor: 'white',
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#0b6f50',
    borderBottomRightRadius: 4,
  },
  botText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#334155',
  },
  userText: {
    fontSize: 14,
    lineHeight: 20,
    color: 'white',
  },
  inputArea: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    paddingBottom: 24,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    backgroundColor: 'white',
    gap: 12,
  },
  attachmentButton: {
    padding: 4,
  },
  inputWrapper: {
    flex: 1,
    backgroundColor: '#f1f5f9',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
    maxHeight: 100,
  },
  input: {
    fontSize: 15,
    color: '#0f172a',
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#0b6f50',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#cbd5e1',
  },
});
