import { Ionicons } from '@expo/vector-icons';
import { useRouter, usePathname } from 'expo-router';
import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/hooks/use-theme';

export default function AppTabs() {
  const router = useRouter();
  const pathname = usePathname();
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  const tabs = [
    { name: 'HOME', icon: 'home', route: '/' },
    { name: 'TRIPS', icon: 'map', route: '/activity' },
    { name: 'WALLET', icon: 'wallet', route: '/wallet' },
    { name: 'ACTIVITY', icon: 'notifications', route: '/notifications' },
    { name: 'PROFILE', icon: 'person', route: '/account' },
  ] as const;

  return (
    <View style={[styles.container, { paddingBottom: Math.max(insets.bottom, 16) }]}>
      <View style={styles.bar}>
        {tabs.map((tab) => {
          const isActive =
            pathname === tab.route ||
            (tab.route === '/' && (pathname === '/(tabs)' || pathname === '/'));
          const tintColor = isActive ? '#0b6f50' : '#94a3b8';

          return (
            <TouchableOpacity
              key={tab.name}
              style={styles.tab}
              activeOpacity={0.7}
              onPress={() => router.push(tab.route as any)}>
              <Ionicons
                name={tab.icon as any}
                size={22}
                color={tintColor}
              />
              <ThemedText
                style={[
                  styles.label,
                  {
                    color: tintColor,
                    fontWeight: isActive ? '700' : '500',
                  },
                ]}>
                {tab.name}
              </ThemedText>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    paddingTop: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -8 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 20,
  },
  bar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  label: {
    fontSize: 9,
    letterSpacing: 0.8,
    marginTop: 2,
  },
});
