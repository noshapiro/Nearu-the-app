import { Easing } from 'react-native-reanimated';

/**
 * Spring configs and easing for Reanimated/Moti.
 */
export const springs = {
  appear: { damping: 15, stiffness: 400 },
  press: { damping: 20, stiffness: 600 },
  float: { damping: 8, stiffness: 60 },
  snap: { damping: 18, stiffness: 350 },
  pop: { damping: 10, stiffness: 400 },
} as const;

export const ease = {
  smooth: Easing.bezier(0.4, 0, 0.2, 1),
  spring: Easing.bezier(0.34, 1.56, 0.64, 1),
} as const;

export const dur = {
  fast: 120,
  base: 200,
  slow: 360,
  pop: 500,
} as const;
