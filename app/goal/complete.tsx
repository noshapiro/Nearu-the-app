import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { colors, fonts } from '@/theme';
import { Button } from '@/components/ui';

export default function GoalCompleteScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Goal completed!</Text>
      <Button
        label="Set next goal"
        onPress={() => router.back()}
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
    padding: 24,
    paddingTop: 60,
  },
  title: {
    fontFamily: fonts.display,
    fontSize: 30,
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: 24,
  },
});
