import Constants from 'expo-constants';

const apiUrl =
  Constants.expoConfig?.extra?.EXPO_PUBLIC_API_URL ??
  (typeof process !== 'undefined' ? process.env?.EXPO_PUBLIC_API_URL : '') ??
  '';

export function getChatApiUrl(): string {
  const base = apiUrl || '';
  return base ? `${base.replace(/\/$/, '')}/api/chat` : '';
}

export function isChatApiConfigured(): boolean {
  return getChatApiUrl().length > 0;
}
