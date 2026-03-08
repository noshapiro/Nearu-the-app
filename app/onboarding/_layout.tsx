import { Stack } from 'expo-router';

export default function OnboardingLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: '#050508' },
        animation: 'default',
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="permissions" />
      <Stack.Screen name="setup" />
    </Stack>
  );
}
