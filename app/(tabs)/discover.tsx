import { View, Text, StyleSheet, ScrollView, TextInput, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, fonts, radii } from '@/theme';

export default function DiscoverScreen() {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[styles.content, { paddingTop: insets.top + 16, paddingBottom: 100 }]}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>Discover</Text>
      <Text style={styles.subtitle}>Search and explore insights.</Text>

      <Pressable style={styles.searchBar}>
        <Ionicons name="search" size={18} color={colors.textTertiary} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          placeholderTextColor={colors.textTertiary}
          editable
        />
      </Pressable>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chips}>
        <Pressable style={[styles.chip, styles.chipActive]}>
          <Text style={styles.chipTextActive}>All</Text>
        </Pressable>
        <Pressable style={styles.chip}>
          <Text style={styles.chipText}>Insights</Text>
        </Pressable>
        <Pressable style={styles.chip}>
          <Text style={styles.chipText}>Goals</Text>
        </Pressable>
        <Pressable style={styles.chip}>
          <Text style={styles.chipText}>Memories</Text>
        </Pressable>
      </ScrollView>

      <Text style={styles.sectionLabel}>TRENDING</Text>
      <View style={styles.trendGrid}>
        <Pressable style={styles.trendCard}>
          <View style={styles.trendIconWrap}>
            <Ionicons name="leaf-outline" size={22} color={colors.mint} />
          </View>
          <Text style={styles.trendName}>Mindfulness</Text>
          <Text style={styles.trendCount}>12 topics</Text>
        </Pressable>
        <Pressable style={styles.trendCard}>
          <View style={styles.trendIconWrap}>
            <Ionicons name="trending-up-outline" size={22} color={colors.aurora2} />
          </View>
          <Text style={styles.trendName}>Productivity</Text>
          <Text style={styles.trendCount}>8 topics</Text>
        </Pressable>
      </View>

      <Text style={styles.sectionLabel}>RESULTS</Text>
      <Pressable style={styles.resultCard}>
        <View style={styles.resultIconWrap}>
          <Ionicons name="bulb-outline" size={22} color={colors.aurora2} />
        </View>
        <View style={styles.resultText}>
          <Text style={styles.resultType}>INSIGHT</Text>
          <Text style={styles.resultTitle}>Start a search to see results</Text>
          <Text style={styles.resultPreview}>Try "morning routine" or "focus"</Text>
        </View>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.deep },
  content: { paddingHorizontal: 20 },
  title: {
    fontFamily: fonts.display,
    fontSize: 30,
    letterSpacing: -0.8,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  subtitle: {
    fontFamily: fonts.ui,
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 20,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.elevated,
    borderWidth: 1,
    borderColor: colors.borderStrong,
    borderRadius: 9999,
    height: 48,
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    fontFamily: fonts.ui,
    fontSize: 16,
    color: colors.textPrimary,
    paddingVertical: 0,
  },
  chips: { marginHorizontal: -20, paddingHorizontal: 20, marginBottom: 20 },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 9999,
    backgroundColor: colors.elevated,
    borderWidth: 1,
    borderColor: colors.border,
    marginRight: 8,
  },
  chipActive: {
    backgroundColor: 'rgba(123,110,255,0.2)',
    borderColor: 'rgba(123,110,255,0.4)',
  },
  chipText: { fontFamily: fonts.ui, fontSize: 13, color: colors.textSecondary },
  chipTextActive: { fontFamily: fonts.ui, fontSize: 13, color: colors.aurora2 },
  sectionLabel: {
    fontFamily: fonts.uiSemiBold,
    fontSize: 12,
    color: colors.textTertiary,
    letterSpacing: 1,
    marginBottom: 12,
  },
  trendGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 24 },
  trendCard: {
    width: '48%',
    backgroundColor: colors.elevated,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    padding: 14,
  },
  trendIconWrap: { marginBottom: 8 },
  trendName: { fontFamily: fonts.uiSemiBold, fontSize: 13, color: colors.textPrimary },
  trendCount: { fontFamily: fonts.ui, fontSize: 11, color: colors.textTertiary, marginTop: 2 },
  resultCard: {
    flexDirection: 'row',
    backgroundColor: colors.elevated,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.lg,
    padding: 16,
    gap: 12,
  },
  resultIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 16,
    backgroundColor: 'rgba(123,110,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  resultText: { flex: 1 },
  resultType: { fontFamily: fonts.mono, fontSize: 9, color: colors.textTertiary, letterSpacing: 0.5, marginBottom: 4 },
  resultTitle: { fontFamily: fonts.uiSemiBold, fontSize: 14, color: colors.textPrimary },
  resultPreview: { fontFamily: fonts.ui, fontSize: 12, color: colors.textTertiary, marginTop: 2 },
});
