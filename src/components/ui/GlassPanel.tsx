import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { BlurView } from 'expo-blur';
import { colors, radii } from '@/theme';

export interface GlassPanelProps {
  children: React.ReactNode;
  style?: ViewStyle;
  intensity?: number;
  tint?: 'dark' | 'light' | 'default';
  borderRadius?: number;
  padding?: number;
  borderWidth?: number;
}

/**
 * BlurView + border wrapper. BlurView is transparent in Simulator — backgroundColor fallback.
 */
export function GlassPanel({
  children,
  style,
  intensity = 20,
  tint = 'dark',
  borderRadius = radii.lg,
  padding = 16,
  borderWidth = 1,
}: GlassPanelProps) {
  return (
    <View style={[styles.outer, { borderRadius, borderWidth }, style]}>
      <BlurView
        intensity={intensity}
        tint={tint}
        style={[styles.blur, { borderRadius }]}
      >
        <View style={[styles.fallback, { borderRadius: borderRadius - 1, padding }]}>
          {children}
        </View>
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  outer: {
    borderColor: colors.glassBorder,
    overflow: 'hidden',
  },
  blur: {
    overflow: 'hidden',
  },
  fallback: {
    backgroundColor: colors.glassBg,
  },
});
