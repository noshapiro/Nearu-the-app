/**
 * Font families — load via expo-font + @expo-google-fonts/syne + geist-mono
 * + Instrument Serif from assets/fonts/ (optional; fallback to system serif)
 */
export const fonts = {
  /** Use Georgia until Instrument Serif is added to assets/fonts */
  display: 'Georgia',
  displayItalic: 'Georgia',
  displaySerif: 'InstrumentSerif_400Regular',
  displaySerifItalic: 'InstrumentSerif_400Regular_Italic',
  displayFallback: 'Georgia',
  displayItalicFallback: 'Georgia',
  ui: 'Syne_400Regular',
  uiMedium: 'Syne_500Medium',
  uiSemiBold: 'Syne_600SemiBold',
  uiBold: 'Syne_700Bold',
  mono: 'GeistMono_400Regular',
  monoMedium: 'GeistMono_500Medium',
} as const;

export type FontKey = keyof typeof fonts;
