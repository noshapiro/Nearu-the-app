/**
 * Nearu design system — every hex from design files.
 * CSS px map 1:1 to React Native pt.
 */
export const colors = {
  // Backgrounds
  void: '#050508',
  deep: '#0C0C14',
  surface: '#13131E',
  elevated: '#1A1A2C',
  float: '#22223A',

  // Borders
  border: 'rgba(255,255,255,0.07)',
  borderStrong: 'rgba(255,255,255,0.12)',

  // Aurora brand
  aurora: '#7B6EFF',
  aurora2: '#A594FF',
  auroraDim: 'rgba(123,110,255,0.15)',
  auroraGlow: 'rgba(123,110,255,0.35)',

  // Accent
  mint: '#2DCEA8',
  coral: '#FF6B6B',
  coralDark: '#FF3B5C',
  amber: '#FFB347',
  sky: '#5BB8FF',

  // Text
  textPrimary: '#F0F0F8',
  textSecondary: '#8888AA',
  textTertiary: '#4A4A6A',

  // Glass
  glassBg: 'rgba(255,255,255,0.05)',
  glassBorder: 'rgba(255,255,255,0.10)',
} as const;

export type ColorKey = keyof typeof colors;
