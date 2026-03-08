import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { colors, radii } from '@/theme';
import { springs } from '@/theme/animations';
import { useHaptics } from '@/hooks/useHaptics';

const TRACK_WIDTH = 48;
const TRACK_HEIGHT = 28;
const THUMB_SIZE = 22;
const THUMB_OFFSET = 3;

export interface ToggleProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  disabled?: boolean;
  accessibilityLabel?: string;
}

export function Toggle({
  value,
  onValueChange,
  disabled = false,
  accessibilityLabel = 'Toggle',
}: ToggleProps) {
  const haptics = useHaptics();
  const translateX = useSharedValue(value ? TRACK_WIDTH - THUMB_SIZE - THUMB_OFFSET * 2 : THUMB_OFFSET);

  const thumbStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const updatePosition = (on: boolean) => {
    translateX.value = withSpring(
      on ? TRACK_WIDTH - THUMB_SIZE - THUMB_OFFSET * 2 : THUMB_OFFSET,
      springs.press
    );
  };

  const handlePress = () => {
    if (disabled) return;
    const next = !value;
    updatePosition(next);
    try {
      haptics.toggle();
    } catch {
      // simulator
    }
    onValueChange(next);
  };

  React.useEffect(() => {
    updatePosition(value);
  }, [value]);

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled}
      style={[
        styles.track,
        value && styles.trackOn,
      ]}
      accessibilityRole="switch"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ checked: value, disabled }}
      accessibilityHint={value ? 'Double tap to turn off' : 'Double tap to turn on'}
    >
      <Animated.View style={[styles.thumb, thumbStyle]} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  track: {
    width: TRACK_WIDTH,
    height: TRACK_HEIGHT,
    borderRadius: radii.full,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
  },
  trackOn: {
    backgroundColor: colors.aurora,
  },
  thumb: {
    position: 'absolute',
    left: THUMB_OFFSET,
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: THUMB_SIZE / 2,
    backgroundColor: '#FFFFFF',
  },
});
