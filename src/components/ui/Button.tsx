import React from 'react';
import {
  Pressable,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { colors, radii, fonts } from '@/theme';
import { springs } from '@/theme/animations';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type ButtonVariant = 'primary' | 'secondary' | 'glass' | 'danger';

export interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  height?: number;
  accessibilityLabel?: string;
  accessibilityHint?: string;
}

const gradientMap: Record<string, [string, string]> = {
  primary: [colors.aurora, colors.aurora2],
  danger: [colors.coralDark, colors.coral],
};

export function Button({
  label,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  fullWidth = true,
  height = 56,
  accessibilityLabel,
  accessibilityHint,
}: ButtonProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.97, springs.press);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, springs.press);
  };

  const isGradient = variant === 'primary' || variant === 'danger';
  const gradient = gradientMap[variant];

  const containerStyle: ViewStyle[] = [
    styles.base,
    { height },
    fullWidth && styles.fullWidth,
    variant === 'secondary' && styles.secondary,
    variant === 'glass' && styles.glass,
    variant === 'danger' && !isGradient && styles.dangerSolid,
  ];

  const textStyle: TextStyle[] = [
    styles.label,
    variant === 'secondary' && styles.labelSecondary,
    variant === 'glass' && styles.labelSecondary,
  ];

  const content = loading ? (
    <ActivityIndicator color="#fff" size="small" />
  ) : (
    <Text style={textStyle}>{label}</Text>
  );

  const a11yLabel = accessibilityLabel ?? label;
  const a11yHint = accessibilityHint ?? (variant === 'primary' ? 'Double tap to continue' : undefined);

  if (isGradient && gradient) {
    return (
      <AnimatedPressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled || loading}
        style={[styles.gradientWrap, fullWidth && styles.fullWidth, animatedStyle]}
        accessibilityRole="button"
        accessibilityLabel={a11yLabel}
        accessibilityHint={a11yHint}
        accessibilityState={{ disabled: disabled || loading, busy: loading }}
      >
        <LinearGradient
          colors={gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.gradient, { height }]}
        >
          <Animated.View style={[styles.gradientHighlight]} />
          {content}
        </LinearGradient>
      </AnimatedPressable>
    );
  }

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled || loading}
      style={[containerStyle, animatedStyle]}
      accessibilityRole="button"
      accessibilityLabel={a11yLabel}
      accessibilityHint={a11yHint}
      accessibilityState={{ disabled: disabled || loading, busy: loading }}
    >
      {content}
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: radii.full,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  fullWidth: {
    width: '100%',
  },
  secondary: {
    backgroundColor: colors.glassBg,
    borderWidth: 1,
    borderColor: colors.glassBorder,
  },
  glass: {
    backgroundColor: colors.glassBg,
    borderWidth: 1,
    borderColor: colors.glassBorder,
  },
  dangerSolid: {
    backgroundColor: colors.coral,
  },
  gradientWrap: {
    borderRadius: radii.full,
    overflow: 'hidden',
    shadowColor: colors.aurora,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 32,
    elevation: 8,
  },
  gradient: {
    borderRadius: radii.full,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  gradientHighlight: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '50%',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderTopLeftRadius: radii.full,
    borderTopRightRadius: radii.full,
  },
  label: {
    fontFamily: fonts.uiSemiBold,
    fontSize: 16,
    color: '#FFFFFF',
    letterSpacing: -0.2,
  },
  labelSecondary: {
    color: colors.textSecondary,
    fontFamily: fonts.uiMedium,
  },
});
