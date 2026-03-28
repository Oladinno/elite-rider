import { Slot } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

import AppTabs from '@/components/app-tabs';

export default function TabLayout() {
  return (
    <View style={{ flex: 1 }}>
      <Slot />
      <AppTabs />
    </View>
  );
}
