import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { BlurView } from 'expo-blur';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, fonts } from '@/theme';
import { springs } from '@/theme/animations';
import { useHaptics } from '@/hooks/useHaptics';

const TAB_ICONS: Record<string, { outline: keyof typeof Ionicons.glyphMap; filled: keyof typeof Ionicons.glyphMap }> = {
  index: { outline: 'home-outline', filled: 'home' },
  chat: { outline: 'chatbubble-outline', filled: 'chatbubble' },
  memory: { outline: 'book-outline', filled: 'book' },
  discover: { outline: 'compass-outline', filled: 'compass' },
  profile: { outline: 'person-outline', filled: 'person' },
};

const TAB_LABELS: Record<string, string> = {
  index: 'Home',
  chat: 'Chat',
  memory: 'Memory',
  discover: 'Discover',
  profile: 'Profile',
};

export function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const haptics = useHaptics();
  const bottom = Math.max(insets.bottom, 12);

  return (
    <View style={[styles.wrapper, { paddingBottom: bottom }]}>
      <BlurView intensity={60} tint="dark" style={styles.blur}>
        <View style={styles.fallback}>
          <View style={styles.tabs}>
            {state.routes.map((route, index) => {
              const { options } = descriptors[route.key];
              const isFocused = state.index === index;
              const icons = TAB_ICONS[route.name] ?? { outline: 'ellipse-outline', filled: 'ellipse' };
              const iconName = isFocused ? icons.filled : icons.outline;
              const label = TAB_LABELS[route.name] ?? route.name;

              const onPress = () => {
                haptics.tabSwitch();
                const event = navigation.emit({
                  type: 'tabPress',
                  target: route.key,
                  canPreventDefault: true,
                });
                if (!isFocused && !event.defaultPrevented) {
                  navigation.navigate(route.name);
                }
              };

              return (
                <TabBarItem
                  key={route.key}
                  isFocused={isFocused}
                  iconName={iconName}
                  label={label}
                  onPress={onPress}
                  accessibilityLabel={`${label} tab, ${index + 1} of 5`}
                  accessibilityRole="button"
                  accessibilityState={{ selected: isFocused }}
                />
              );
            })}
          </View>
        </View>
      </BlurView>
    </View>
  );
}

function TabBarItem({
  isFocused,
  iconName,
  label,
  onPress,
  accessibilityLabel,
  accessibilityRole,
  accessibilityState,
}: {
  isFocused: boolean;
  iconName: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
  accessibilityLabel: string;
  accessibilityRole: 'button';
  accessibilityState: { selected: boolean };
}) {
  const scale = useSharedValue(isFocused ? 1.15 : 1);

  React.useEffect(() => {
    scale.value = withSpring(isFocused ? 1.15 : 1, springs.press);
  }, [isFocused, scale]);

  const iconStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Pressable
      onPress={onPress}
      style={styles.tabItem}
      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole={accessibilityRole}
      accessibilityState={accessibilityState}
    >
      <Animated.View style={iconStyle}>
        <Ionicons
          name={iconName}
          size={20}
          color={isFocused ? colors.aurora2 : colors.textTertiary}
        />
      </Animated.View>
      <Text
        style={[
          styles.tabLabel,
          isFocused && styles.tabLabelActive,
        ]}
        numberOfLines={1}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 88,
  },
  blur: {
    flex: 1,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.08)',
    overflow: 'hidden',
  },
  fallback: {
    flex: 1,
    backgroundColor: 'rgba(10,10,18,0.85)',
    paddingTop: 12,
  },
  tabs: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  tabLabel: {
    fontFamily: fonts.uiMedium,
    fontSize: 10,
    color: colors.textTertiary,
    letterSpacing: 0.3,
  },
  tabLabelActive: {
    color: colors.aurora2,
  },
});
