import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, fonts } from '@/theme';
import { Button } from '@/components/ui';

export default function OnboardingPermissions() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top + 60 }]}>
      <Text style={styles.title}>Permissions</Text>
      <Text style={styles.subtitle}>
        Nearu needs camera and microphone for video calls with Aurora.
      </Text>
      <Button
        label="Continue"
        onPress={() => router.push('/onboarding/setup')}
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
