import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { colors, radii, fonts } from '@/theme';

export type EmptyStateVariant =
  | 'offline'
  | 'empty-memories'
  | 'empty-search'
  | 'call-failed'
  | 'no-goals';

const variantCopy: Record<
  EmptyStateVariant,
  { title: string; subtitle: string; retryLabel?: string }
> = {
  offline: {
    title: "You're offline",
    subtitle: 'Check your connection and try again.',
    retryLabel: 'Retry',
  },
  'empty-memories': {
    title: 'No memories yet',
    subtitle: 'Your insights with Aurora will appear here.',
    retryLabel: undefined,
  },
  'empty-search': {
    title: 'No results',
    subtitle: 'Try a different search or filter.',
    retryLabel: 'Clear search',
  },
  'call-failed': {
    title: 'Call failed',
    subtitle: "We couldn't connect to Aurora. Please try again.",
    retryLabel: 'Retry',
  },
  'no-goals': {
    title: 'No active goals',
    subtitle: 'Set a goal with Aurora to track your progress.',
    retryLabel: 'Set goal',
  },
};

export interface EmptyStateProps {
  variant: EmptyStateVariant;
  onRetry?: () => void;
  diagnostic?: Array<{ label: string; value: string; status?: 'ok' | 'error' }>;
}

export function EmptyState({ variant, onRetry, diagnostic }: EmptyStateProps) {
  const rotation = useSharedValue(0);
  const dotOpacity = useSharedValue(1);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, { duration: 8000, easing: Easing.linear }),
      -1,
      false
    );
    dotOpacity.value = withRepeat(
      withTiming(0.3, { duration: 1000 }),
      -1,
      true
    );
  }, [rotation, dotOpacity]);

  const ringStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  const dotStyle = useAnimatedStyle(() => ({
    opacity: dotOpacity.value,
  }));

  const copy = variantCopy[variant];
  const showRetry = copy.retryLabel && onRetry;
  const showDiagnostic = variant === 'call-failed' && diagnostic && diagnostic.length > 0;

  return (
    <View style={styles.container}>
      <View style={styles.illustrationWrap}>
        <Animated.View style={[styles.outerRing, ringStyle]}>
          <Animated.View style={[styles.outerRingDot, dotStyle]} />
        </Animated.View>
        <View style={styles.innerOrb}>
          <Text style={styles.orbSymbol}>✦</Text>
        </View>
      </View>
      <Text style={styles.title}>{copy.title}</Text>
      <Text style={styles.subtitle}>{copy.subtitle}</Text>
      {showRetry && (
        <Pressable
          onPress={onRetry}
          style={styles.retryButton}
          accessibilityRole="button"
          accessibilityLabel={copy.retryLabel}
        >
          <Text style={styles.retryLabel}>{copy.retryLabel}</Text>
        </Pressable>
      )}
      {showDiagnostic && (
        <View style={styles.diagnosticCard}>
          {diagnostic!.map((row, i) => (
            <View key={i} style={styles.diagnosticRow}>
              <Text style={styles.diagnosticLabel}>{row.label}</Text>
              <Text
                style={[
                  styles.diagnosticValue,
                  row.status === 'error' && styles.diagnosticError,
                ]}
              >
                {row.value}
              </Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  illustrationWrap: {
    width: 150,
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  outerRing: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 1,
    borderColor: colors.auroraDim,
    alignItems: 'center',
  },
  outerRingDot: {
    position: 'absolute',
    top: -3,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.aurora,
  },
  innerOrb: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.auroraDim,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  orbSymbol: {
    fontSize: 36,
    color: colors.aurora2,
  },
  title: {
    fontFamily: fonts.display,
    fontSize: 26,
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: fonts.ui,
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
  },
  retryButton: {
    backgroundColor: colors.elevated,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.full,
    paddingVertical: 8,
    paddingHorizontal: 24,
  },
  retryLabel: {
    fontFamily: fonts.uiSemiBold,
    fontSize: 14,
    color: colors.aurora2,
  },
  diagnosticCard: {
    marginTop: 16,
    width: '100%',
    maxWidth: 280,
    backgroundColor: colors.elevated,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.lg,
    padding: 16,
  },
  diagnosticRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  diagnosticLabel: {
    fontFamily: fonts.ui,
    fontSize: 12,
    color: colors.textSecondary,
  },
  diagnosticValue: {
    fontFamily: fonts.mono,
    fontSize: 12,
    color: colors.textPrimary,
  },
  diagnosticError: {
    color: colors.coral,
  },
});
