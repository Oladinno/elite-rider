import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState, useRef, useEffect } from 'react';
import {
  Animated,
  Image,
  LayoutAnimation,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  UIManager,
  View,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';

// Enable LayoutAnimation for Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function TripCompletedScreen() {
  const router = useRouter();
  const [isBreakdownExpanded, setIsBreakdownExpanded] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [selectedTip, setSelectedTip] = useState<number | null>(200);

  const bounceAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: -8,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const toggleBreakdown = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsBreakdownExpanded(!isBreakdownExpanded);
  };

  const handleDone = () => {
    router.replace('/home' as any);
  };

  const tips = [100, 200, 500];

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          
          {/* Success Header */}
          <View style={styles.header}>
            <Animated.View style={[styles.successIconContainer, { transform: [{ translateY: bounceAnim }] }]}>
              <View style={styles.successIconCircle}>
                <Ionicons name="checkmark-circle" size={56} color="#0fbd58" />
              </View>
            </Animated.View>
            <ThemedText style={styles.headerTitle}>Trip Completed</ThemedText>
            <ThemedText style={styles.headerSubtitle}>Tuesday, 14 Oct • 10:23 AM</ThemedText>
          </View>

          {/* Fare Card */}
          <View style={styles.fareCard}>
            <ThemedText style={styles.fareLabel}>TOTAL FARE</ThemedText>
            <ThemedText style={styles.fareAmount}>₦1,200</ThemedText>

            <TouchableOpacity style={styles.breakdownToggle} onPress={toggleBreakdown} activeOpacity={0.7}>
              <View style={styles.breakdownHeader}>
                <View style={styles.breakdownLabelContainer}>
                  <Ionicons name="receipt-outline" size={18} color="#0fbd58" />
                  <ThemedText style={styles.breakdownLabel}>Fare Breakdown</ThemedText>
                </View>
                <Ionicons 
                  name={isBreakdownExpanded ? "chevron-up" : "chevron-down"} 
                  size={18} 
                  color="#94a3b8" 
                />
              </View>

              {isBreakdownExpanded && (
                <View style={styles.breakdownContent}>
                  <View style={styles.divider} />
                  <View style={styles.breakdownRow}>
                    <ThemedText style={styles.breakdownRowLabel}>Base Fare</ThemedText>
                    <ThemedText style={styles.breakdownRowValue}>₦400</ThemedText>
                  </View>
                  <View style={styles.breakdownRow}>
                    <ThemedText style={styles.breakdownRowLabel}>Distance (5.2 km)</ThemedText>
                    <ThemedText style={styles.breakdownRowValue}>₦600</ThemedText>
                  </View>
                  <View style={styles.breakdownRow}>
                    <ThemedText style={styles.breakdownRowLabel}>Time (15 min)</ThemedText>
                    <ThemedText style={styles.breakdownRowValue}>₦200</ThemedText>
                  </View>
                  <View style={[styles.divider, { marginTop: 8 }]} />
                  <View style={styles.breakdownTotalRow}>
                    <ThemedText style={styles.breakdownTotalLabel}>Subtotal</ThemedText>
                    <ThemedText style={styles.breakdownTotalValue}>₦1,200</ThemedText>
                  </View>
                </View>
              )}
            </TouchableOpacity>
          </View>

          {/* Rating Section */}
          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Rate your ride</ThemedText>
            <ThemedText style={styles.sectionSubtitle}>How was your experience with Ibrahim?</ThemedText>
            
            <View style={styles.starsContainer}>
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity key={star} onPress={() => setRating(star)}>
                  <Ionicons 
                    name={rating >= star ? "star" : "star-outline"} 
                    size={40} 
                    color={rating >= star ? "#fbbf24" : "#e2e8f0"} 
                  />
                </TouchableOpacity>
              ))}
            </View>

            <TextInput
              style={styles.commentInput}
              placeholder="Leave a comment (optional)..."
              placeholderTextColor="#94a3b8"
              multiline
              numberOfLines={3}
              value={comment}
              onChangeText={setComment}
            />
          </View>

          {/* Tipping Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <ThemedText style={styles.sectionTitle}>Add a Tip</ThemedText>
              <TouchableOpacity>
                <ThemedText style={styles.otherAmountLink}>Other amount</ThemedText>
              </TouchableOpacity>
            </View>

            <View style={styles.tipsContainer}>
              {tips.map((amount) => (
                <TouchableOpacity 
                  key={amount}
                  style={[
                    styles.tipButton, 
                    selectedTip === amount && styles.tipButtonActive
                  ]}
                  onPress={() => setSelectedTip(amount)}
                >
                  <ThemedText style={[
                    styles.tipButtonText,
                    selectedTip === amount && styles.tipButtonTextActive
                  ]}>
                    ₦{amount}
                  </ThemedText>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Driver Mini Card */}
          <View style={styles.driverCard}>
            <View style={styles.driverAvatarContainer}>
              <Image 
                source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBvxDZDf6LvE_-odUfj4ymL8CStDzD1iZ0E1NV2Iv7yH_y2ftSA2_Mb3PSXzXgj815Bb2bYuLMt1MexKkDpPl4ofDE2BimPJDcZDcYCIDXZVwYxMfxWR3IKBAJqRBpyKtqE4oVHJl2Y_6oyqFly8XK9Ey2Y9-jQEn4jA2RK4G2Ka5KDRJHvHDo_Uju7HwXCQuJq7iNTnN7joDrWN-Rnt3_xX7XCTQZqWVe7CpNsBTsXCp3_UGjn0RM4t2rAqXAQEetS-sAsYpeZZa8' }} 
                style={styles.driverAvatar} 
              />
              <View style={styles.driverRatingBadge}>
                <Ionicons name="star" size={10} color="#fbbf24" />
              </View>
            </View>
            <View style={styles.driverInfo}>
              <ThemedText style={styles.driverName}>Ibrahim</ThemedText>
              <ThemedText style={styles.vehicleInfo}>Toyota Corolla • YLA-123-AB</ThemedText>
            </View>
            <TouchableOpacity style={styles.chatButton}>
              <Ionicons name="chatbubble-outline" size={20} color="#64748b" />
            </TouchableOpacity>
          </View>

          <View style={{ height: 100 }} />
        </ScrollView>
      </SafeAreaView>

      {/* Footer Button */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.doneButton} onPress={handleDone}>
          <ThemedText style={styles.doneButtonText}>Done</ThemedText>
          <Ionicons name="arrow-forward" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f8f7',
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 20,
  },
  successIconContainer: {
    marginBottom: 16,
  },
  successIconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(15, 189, 88, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0f172a',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '500',
  },
  fareCard: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  fareLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#94a3b8',
    letterSpacing: 1.2,
    marginBottom: 8,
  },
  fareAmount: {
    fontSize: 40,
    fontWeight: '900',
    color: '#0f172a',
    marginBottom: 24,
  },
  breakdownToggle: {
    width: '100%',
    backgroundColor: '#f8fafc',
    borderRadius: 16,
    overflow: 'hidden',
  },
  breakdownHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  breakdownLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  breakdownLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#475569',
  },
  breakdownContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#f1f5f9',
    marginBottom: 8,
  },
  breakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  breakdownRowLabel: {
    fontSize: 14,
    color: '#64748b',
  },
  breakdownRowValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#334155',
  },
  breakdownTotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  breakdownTotalLabel: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0f172a',
  },
  breakdownTotalValue: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0f172a',
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0f172a',
    textAlign: 'center',
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
    marginTop: 4,
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginVertical: 24,
  },
  commentInput: {
    backgroundColor: '#f8fafc',
    borderRadius: 16,
    padding: 16,
    fontSize: 14,
    color: '#0f172a',
    textAlignVertical: 'top',
    height: 100,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  otherAmountLink: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0fbd58',
  },
  tipsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  tipButton: {
    flex: 1,
    height: 52,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tipButtonActive: {
    borderColor: '#0fbd58',
    backgroundColor: 'rgba(15, 189, 88, 0.05)',
    borderWidth: 2,
  },
  tipButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#475569',
  },
  tipButtonTextActive: {
    color: '#0fbd58',
  },
  driverCard: {
    marginHorizontal: 20,
    marginTop: 40,
    padding: 16,
    backgroundColor: '#f8fafc',
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  driverAvatarContainer: {
    position: 'relative',
  },
  driverAvatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#e2e8f0',
  },
  driverRatingBadge: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    backgroundColor: 'white',
    padding: 2,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  driverInfo: {
    flex: 1,
    marginLeft: 16,
  },
  driverName: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0f172a',
  },
  vehicleInfo: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 2,
  },
  chatButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    paddingBottom: Platform.OS === 'ios' ? 40 : 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
  },
  doneButton: {
    backgroundColor: '#0fbd58',
    height: 60,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    shadowColor: '#0fbd58',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 4,
  },
  doneButtonText: {
    fontSize: 18,
    fontWeight: '800',
    color: 'white',
  },
});
