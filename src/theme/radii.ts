/**
 * Border radii from design system.
 */
export const radii = {
  xs: 8,
  sm: 12,
  md: 16,
  lg: 22,
  xl: 32,
  full: 9999,
} as const;

export type RadiiKey = keyof typeof radii;
