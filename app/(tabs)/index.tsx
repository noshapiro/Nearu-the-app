import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors, fonts, radii } from '@/theme';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const top = insets.top + 54;
  const bottom = 88;

  return (
    <View style={styles.wrap}>
      <ScrollView
        style={[styles.scroll, { paddingTop: top, paddingBottom: bottom }]}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerRow}>
          <View style={styles.headerLeft}>
            <Text style={styles.greeting}>Good morning ✦</Text>
            <Text style={styles.date}>SAT · 07 MAR 2026</Text>
          </View>
          <LinearGradient
            colors={[colors.aurora, colors.mint]}
            style={styles.avatar}
          >
            <Text style={styles.avatarText}>N</Text>
          </LinearGradient>
        </View>

        <View style={styles.auroraCard}>
          <View style={styles.liveBadge}>
            <View style={styles.liveDot} />
            <Text style={styles.liveText}>LIVE</Text>
          </View>
          <Text style={styles.auroraQuote}>
            "Start with one small step today — I'm here when you need to talk."
          </Text>
          <Pressable
            style={styles.auroraCta}
            onPress={() => router.push('/(tabs)/chat')}
          >
            <Text style={styles.auroraCtaText}>Explore together →</Text>
          </Pressable>
        </View>

        <Text style={styles.sectionLabel}>QUICK ACTIONS</Text>
        <View style={styles.actionsGrid}>
          <Pressable style={styles.actionCard} onPress={() => router.push('/(tabs)/chat')}>
            <View style={styles.actionIconWrap}>
              <Ionicons name="chatbubble-outline" size={24} color={colors.aurora2} />
            </View>
            <Text style={styles.actionTitle}>Chat</Text>
            <Text style={styles.actionDesc}>Talk with Aurora</Text>
          </Pressable>
          <Pressable style={styles.actionCard} onPress={() => router.push('/(tabs)/memory')}>
            <View style={styles.actionIconWrap}>
              <Ionicons name="book-outline" size={24} color={colors.aurora2} />
            </View>
            <Text style={styles.actionTitle}>Memory</Text>
            <Text style={styles.actionDesc}>Your insights</Text>
          </Pressable>
          <Pressable style={styles.actionCard} onPress={() => router.push('/goal/complete')}>
            <View style={styles.actionIconWrap}>
              <Ionicons name="flag-outline" size={24} color={colors.mint} />
            </View>
            <Text style={styles.actionTitle}>Goals</Text>
            <Text style={styles.actionDesc}>Track progress</Text>
          </Pressable>
          <Pressable style={styles.actionCard} onPress={() => router.push('/(tabs)/chat')}>
            <View style={styles.actionIconWrap}>
              <Ionicons name="flash-outline" size={24} color={colors.amber} />
            </View>
            <Text style={styles.actionTitle}>Flow</Text>
            <Text style={styles.actionDesc}>Focus mode</Text>
          </Pressable>
        </View>

        <View style={styles.streakRow}>
          <View style={styles.streakIconWrap}>
            <Ionicons name="flame-outline" size={20} color={colors.amber} />
          </View>
          <View style={styles.streakInfo}>
            <Text style={styles.streakTitle}>Streak</Text>
            <Text style={styles.streakSub}>Days in a row</Text>
          </View>
          <Text style={styles.streakVal}>0</Text>
        </View>

        <Text style={styles.sectionLabel}>RECENT MEMORIES</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.memScroll}>
          <View style={styles.memChip}>
            <Text style={styles.memDate}>TODAY</Text>
            <Text style={styles.memText}>No memories yet</Text>
          </View>
        </ScrollView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: colors.deep },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 24 },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  headerLeft: { flex: 1 },
  greeting: {
    fontFamily: fonts.display,
    fontSize: 28,
    letterSpacing: -0.6,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  date: {
    fontFamily: fonts.mono,
    fontSize: 11,
    color: colors.textTertiary,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { fontFamily: fonts.uiSemiBold, fontSize: 16, color: '#FFF' },
  auroraCard: {
    backgroundColor: 'rgba(123,110,255,0.15)',
    borderWidth: 1,
    borderColor: 'rgba(123,110,255,0.25)',
    borderRadius: radii.xl,
    padding: 24,
    marginBottom: 20,
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 6,
    backgroundColor: 'rgba(123,110,255,0.2)',
    borderWidth: 1,
    borderColor: 'rgba(123,110,255,0.3)',
    borderRadius: 9999,
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginBottom: 12,
  },
  liveDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.aurora },
  liveText: {
    fontFamily: fonts.mono,
    fontSize: 10,
    fontWeight: '600',
    color: colors.aurora2,
    letterSpacing: 0.5,
  },
  auroraQuote: {
    fontFamily: fonts.display,
    fontSize: 22,
    color: colors.textPrimary,
    lineHeight: 28,
    letterSpacing: -0.4,
    marginBottom: 16,
  },
  auroraCta: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    borderRadius: 9999,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  auroraCtaText: { fontFamily: fonts.uiSemiBold, fontSize: 13, color: colors.textPrimary },
  sectionLabel: {
    fontFamily: fonts.uiSemiBold,
    fontSize: 12,
    color: colors.textTertiary,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 12,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 20,
  },
  actionCard: {
    width: '48%',
    backgroundColor: colors.elevated,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.lg,
    padding: 16,
  },
  actionIconWrap: { marginBottom: 10 },
  actionTitle: { fontFamily: fonts.uiSemiBold, fontSize: 13, color: colors.textPrimary, marginBottom: 2 },
  actionDesc: { fontFamily: fonts.ui, fontSize: 11, color: colors.textTertiary, lineHeight: 15 },
  streakRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.elevated,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.lg,
    padding: 14,
    marginBottom: 20,
    gap: 8,
  },
  streakIconWrap: {},
  streakInfo: { flex: 1 },
  streakTitle: { fontFamily: fonts.uiSemiBold, fontSize: 13, color: colors.textPrimary },
  streakSub: { fontFamily: fonts.ui, fontSize: 11, color: colors.textTertiary },
  streakVal: { fontFamily: fonts.mono, fontSize: 18, fontWeight: '500', color: colors.amber },
  memScroll: { marginHorizontal: -20, paddingHorizontal: 20 },
  memChip: {
    minWidth: 130,
    backgroundColor: colors.elevated,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.lg,
    padding: 12,
    marginRight: 10,
  },
  memDate: { fontFamily: fonts.mono, fontSize: 9, color: colors.textTertiary, marginBottom: 6 },
  memText: { fontFamily: fonts.ui, fontSize: 12, color: colors.textSecondary, lineHeight: 18 },
});
