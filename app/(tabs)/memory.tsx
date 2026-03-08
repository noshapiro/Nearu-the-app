import { View, Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, fonts } from '@/theme';
import { EmptyState } from '@/components/ui';

export default function MemoryScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top + 16 }]}>
      <Text style={styles.title}>Memory</Text>
      <Text style={styles.subtitle}>Insights and moments Aurora has saved for you.</Text>
      <View style={styles.centered}>
        <EmptyState
          variant="empty-memories"
          onRetry={undefined}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.deep, paddingHorizontal: 20 },
  title: {
    fontFamily: fonts.display,
    fontSize: 28,
    letterSpacing: -0.6,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  subtitle: {
    fontFamily: fonts.ui,
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 24,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 280,
    marginTop: -56,
  },
});
