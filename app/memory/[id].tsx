import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { colors, fonts } from '@/theme';

export default function MemoryDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <View style={styles.container}>
      <Text style={styles.placeholder}>Memory {id}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.deep,
    padding: 20,
  },
  placeholder: {
    fontFamily: fonts.ui,
    fontSize: 16,
    color: colors.textSecondary,
  },
});
