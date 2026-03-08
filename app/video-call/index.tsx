import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { colors, fonts } from '@/theme';

export default function VideoCallScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.placeholder}>Video Call with Aurora</Text>
      <Text style={styles.hint} onPress={() => router.back()}>
        Tap to close
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.void,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholder: {
    fontFamily: fonts.display,
    fontSize: 22,
    color: colors.textPrimary,
    marginBottom: 8,
  },
  hint: {
    fontFamily: fonts.ui,
    fontSize: 14,
    color: colors.textSecondary,
  },
});
