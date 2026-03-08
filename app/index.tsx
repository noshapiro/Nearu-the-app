import { useEffect } from 'react';
import { Redirect } from 'expo-router';
import { useAuthStore } from '@/stores/authStore';

/**
 * Root index: redirect to onboarding or main app based on auth state.
 * Auth guard in _layout handles the actual redirect; this is the initial route.
 */
export default function Index() {
  const { isOnboarded, _hydrated } = useAuthStore();

  if (!_hydrated) {
    return null;
  }

  if (!isOnboarded) {
    return <Redirect href="/onboarding" />;
  }

  return <Redirect href="/(tabs)" />;
}
