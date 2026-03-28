import { SymbolView } from 'expo-symbols';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/hooks/use-theme';

interface ActivityItemProps {
  pickup: string;
  destination: string;
  price: string;
  date: string;
}

export function ActivityItem({ pickup, destination, price, date }: ActivityItemProps) {
  const theme = useTheme();

  return (
    <View style={[styles.container, { borderColor: 'rgba(11, 111, 80, 0.05)' }]}>
      <View style={styles.topRow}>
        <View style={styles.addressSection}>
          <View style={styles.timelineIndicators}>
            <SymbolView name="circle.fill" size={10} tintColor="#0b6f50" />
            <View style={styles.timelineLine} />
            <SymbolView name="mappin.circle.fill" size={10} tintColor="#0b6f50" />
          </View>
          <View style={styles.addressTexts}>
            <View>
              <ThemedText style={styles.label}>PICKUP</ThemedText>
              <ThemedText style={styles.addressText} numberOfLines={1}>
                {pickup}
              </ThemedText>
            </View>
            <View style={{ marginTop: 12 }}>
              <ThemedText style={styles.label}>DESTINATION</ThemedText>
              <ThemedText style={styles.destinationText} numberOfLines={1}>
                {destination}
              </ThemedText>
            </View>
          </View>
        </View>
        <View style={styles.priceSection}>
          <ThemedText style={styles.priceText}>{price}</ThemedText>
          <ThemedText style={styles.dateText}>{date}</ThemedText>
        </View>
      </View>

      <View style={[styles.buttonRow, { borderTopColor: 'rgba(11, 111, 80, 0.05)' }]}>
        <TouchableOpacity style={styles.rebookButton}>
          <ThemedText style={styles.rebookText}>Rebook</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.detailsButton, { borderColor: '#0b6f50' }]}>
          <ThemedText style={styles.detailsText}>View Details</ThemedText>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  addressSection: {
    flex: 1,
    flexDirection: 'row',
    gap: 12,
  },
  timelineIndicators: {
    alignItems: 'center',
    paddingTop: 4,
    gap: 2,
  },
  timelineLine: {
    width: 2,
    height: 24,
    backgroundColor: 'rgba(11, 111, 80, 0.1)',
  },
  addressTexts: {
    flex: 1,
    gap: 2,
  },
  label: {
    fontSize: 10,
    color: '#64748b',
    fontWeight: '700',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  addressText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#334155',
  },
  destinationText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f172a',
  },
  priceSection: {
    alignItems: 'flex-end',
  },
  priceText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0b6f50',
  },
  dateText: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 4,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    borderTopWidth: 1,
    paddingTop: 16,
  },
  rebookButton: {
    flex: 1,
    backgroundColor: '#0b6f50',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  rebookText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  detailsButton: {
    flex: 1,
    borderWidth: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  detailsText: {
    color: '#0b6f50',
    fontWeight: '600',
    fontSize: 14,
  },
});
