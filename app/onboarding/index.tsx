import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import { colors, sp, radii, fonts } from '@/theme';
import { dur } from '@/theme/animations';
import { Button } from '@/components/ui';
import { useHaptics } from '@/hooks/useHaptics';

export default function OnboardingWelcome() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const haptics = useHaptics();

  const floatY = useSharedValue(0);
  const pulseScale = useSharedValue(1);
  const pulseOpacity = useSharedValue(1);
  const dotWidth = useSharedValue(6);

  useEffect(() => {
    floatY.value = withRepeat(
      withTiming(-8, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
    pulseScale.value = withRepeat(
      withTiming(1.15, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
    pulseOpacity.value = withRepeat(
      withTiming(0.6, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
    dotWidth.value = withTiming(20, { duration: dur.base });
  }, [floatY, pulseScale, pulseOpacity, dotWidth]);

  const logoFloatStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: floatY.value }],
  }));

  const pulseRingStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseScale.value }],
    opacity: pulseOpacity.value,
  }));

  const activeDotStyle = useAnimatedStyle(() => ({
    width: dotWidth.value,
  }));

  const handlePrimary = () => {
    haptics.tap();
    router.push('/onboarding/permissions');
  };

  const handleSecondary = () => {
    haptics.tap();
    // e.g. sign in or skip — for now do nothing
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top + 60 }]}>
      {/* Background layers */}
      <View style={styles.bgBase} />
      <LinearGradient
        colors={['rgba(123,110,255,0.3)', 'transparent']}
        style={styles.bgRadial1}
      />
      <LinearGradient
        colors={['rgba(45,206,168,0.15)', 'transparent']}
        style={styles.bgRadial2}
      />

      <View style={styles.content}>
        <Animated.View style={[styles.logoWrap, logoFloatStyle]}>
          <View style={[styles.pulseRing, pulseRingStyle]} />
          <LinearGradient
            colors={[colors.aurora, colors.mint]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.logo}
          >
            <Text style={styles.logoSymbol}>✦</Text>
          </LinearGradient>
        </Animated.View>

        <Text style={styles.headline}>
          Your AI that actually <Text style={styles.headlineItalic}>knows</Text> you
        </Text>
        <Text style={styles.subtitle}>
          Nearu learns your patterns, stores memories, and grows with you over time.
        </Text>

        <View style={styles.dots}>
          <Animated.View style={[styles.dot, styles.dotActive, activeDotStyle]} />
          <View style={[styles.dot]} />
          <View style={[styles.dot]} />
        </View>

        <Button
          label="Get started"
          onPress={handlePrimary}
          variant="primary"
          fullWidth
          height={56}
          accessibilityLabel="Get started"
          accessibilityHint="Continues to permissions"
        />
        <View style={styles.spacer} />
        <Pressable
          onPress={handleSecondary}
          style={styles.secondaryWrap}
          accessibilityRole="button"
          accessibilityLabel="Secondary action"
        >
          <BlurView intensity={20} tint="dark" style={styles.secondaryBlur}>
            <View style={styles.secondaryFallback}>
              <Text style={styles.secondaryLabel}>I already have an account</Text>
            </View>
          </BlurView>
        </Pressable>

        <Text style={styles.legal}>
          By continuing you agree to our Terms and Privacy Policy.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.void,
    paddingHorizontal: 32,
    paddingBottom: 100,
  },
  bgBase: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.void,
  },
  bgRadial1: {
    position: 'absolute',
    top: '15%',
    left: '25%',
    width: 300,
    height: 300,
    borderRadius: 150,
    opacity: 0.9,
  },
  bgRadial2: {
    position: 'absolute',
    top: '55%',
    left: '0%',
    width: 200,
    height: 200,
    borderRadius: 100,
    opacity: 0.9,
  },
  content: {
    flex: 1,
    alignItems: 'center',
  },
  logoWrap: {
    marginBottom: 48,
    position: 'relative',
  },
  pulseRing: {
    position: 'absolute',
    top: -8,
    left: -8,
    right: -8,
    bottom: -8,
    borderRadius: 32,
    backgroundColor: colors.auroraDim,
  },
  logo: {
    width: 72,
    height: 72,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.aurora,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 40,
    elevation: 12,
  },
  logoSymbol: {
    fontSize: 34,
    color: '#FFF',
  },
  headline: {
    fontFamily: fonts.display,
    fontSize: 36,
    color: colors.textPrimary,
    textAlign: 'center',
    lineHeight: 41,
    letterSpacing: -0.8,
    marginBottom: 16,
  },
  headlineItalic: {
    fontStyle: 'italic',
    color: colors.aurora2,
  },
  subtitle: {
    fontFamily: fonts.ui,
    fontSize: 15,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
  },
  dots: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 36,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  dotActive: {
    backgroundColor: colors.aurora,
  },
  spacer: { height: 12 },
  secondaryWrap: {
    width: '100%',
    height: 56,
    borderRadius: radii.full,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.glassBorder,
    marginBottom: 24,
  },
  secondaryBlur: {
    flex: 1,
    borderRadius: radii.full,
    overflow: 'hidden',
  },
  secondaryFallback: {
    flex: 1,
    backgroundColor: colors.glassBg,
    borderRadius: radii.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryLabel: {
    fontFamily: fonts.uiMedium,
    fontSize: 16,
    color: colors.textSecondary,
  },
  legal: {
    fontFamily: fonts.ui,
    fontSize: 11,
    color: colors.textTertiary,
    textAlign: 'center',
  },
});
