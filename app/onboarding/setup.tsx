import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, fonts } from '@/theme';
import { Button } from '@/components/ui';
import { useAuthStore } from '@/stores/authStore';

export default function OnboardingSetup() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { completeOnboarding } = useAuthStore();

  const handleComplete = () => {
    completeOnboarding();
    router.replace('/(tabs)');
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top + 60 }]}>
      <Text style={styles.title}>You're all set</Text>
      <Text style={styles.subtitle}>
        Set your name and preferences in Profile.
      </Text>
      <Button
        label="Start using Nearu"
        onPress={handleComplete}
        variant="primary"
        fullWidth
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.void,
    paddingHorizontal: 32,
  },
  title: {
    fontFamily: fonts.display,
    fontSize: 28,
    color: colors.textPrimary,
    marginBottom: 16,
  },
  subtitle: {
    fontFamily: fonts.ui,
    fontSize: 15,
    color: colors.textSecondary,
    lineHeight: 22,
    marginBottom: 40,
  },
});
