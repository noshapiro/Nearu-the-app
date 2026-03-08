import { useEffect, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { Stack, useRouter, useSegments } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  Syne_400Regular,
  Syne_500Medium,
  Syne_600SemiBold,
  Syne_700Bold,
} from '@expo-google-fonts/syne';
import {
  GeistMono_400Regular,
  GeistMono_500Medium,
} from '@expo-google-fonts/geist-mono';
import { useAuthStore } from '@/stores/authStore';
import { hydrateAuthStore } from '@/stores/authStore';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Syne_400Regular,
    Syne_500Medium,
    Syne_600SemiBold,
    Syne_700Bold,
    GeistMono_400Regular,
    GeistMono_500Medium,
    // Add Instrument Serif for full design system (see assets/fonts/README.md):
    // InstrumentSerif_400Regular: require('../assets/fonts/InstrumentSerif-Regular.ttf'),
    // InstrumentSerif_400Regular_Italic: require('../assets/fonts/InstrumentSerif-Italic.ttf'),
  });

  const { isOnboarded, user, _hydrated } = useAuthStore();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    hydrateAuthStore();
  }, []);

  useEffect(() => {
    if (!_hydrated || !fontsLoaded) return;

    const inOnboarding = segments[0] === 'onboarding';
    const inTabs = segments[0] === '(tabs)';

    if (!isOnboarded && !inOnboarding) {
      router.replace('/onboarding');
      return;
    }
    if (isOnboarded && inOnboarding) {
      router.replace('/(tabs)');
      return;
    }
  }, [_hydrated, fontsLoaded, isOnboarded, segments, router]);

  const onLayoutRootView = useCallback(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <GestureHandlerRootView style={styles.flex}>
      <QueryClientProvider client={queryClient}>
        <ErrorBoundary>
          <View style={styles.flex} onLayout={onLayoutRootView}>
            <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: '#050508' },
              animation: 'default',
            }}
          >
            <Stack.Screen name="index" />
            <Stack.Screen name="onboarding" />
            <Stack.Screen name="(tabs)" />
            <Stack.Screen
              name="video-call/index"
              options={{ presentation: 'fullScreenModal', headerShown: false }}
            />
            <Stack.Screen
              name="goal/complete"
              options={{ presentation: 'modal', headerShown: false }}
            />
            <Stack.Screen name="memory/[id]" />
          </Stack>
          </View>
        </ErrorBoundary>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
});
