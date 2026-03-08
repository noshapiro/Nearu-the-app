import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Alert, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors, fonts, radii } from '@/theme';
import { useHaptics } from '@/hooks/useHaptics';

function onSettingPress(title: string) {
  Alert.alert(title, 'This setting will be available soon.');
}

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const haptics = useHaptics();
  const [avatarUri, setAvatarUri] = useState<string | null>(null);

  const handleEditProfile = () => {
    haptics.tap();
    Alert.alert('Edit profile', 'Name and handle editing will be available soon.');
  };

  const handleAvatarPress = async () => {
    haptics.tap();
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Allow access to photos to set a profile picture.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (!result.canceled && result.assets[0]) {
      setAvatarUri(result.assets[0].uri);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[styles.content, { paddingTop: insets.top + 16, paddingBottom: 100 }]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.headerRow}>
        <View style={styles.headerSpacer} />
        <Pressable
          style={styles.editBtn}
          onPress={handleEditProfile}
          hitSlop={12}
          accessibilityLabel="Edit profile"
          accessibilityRole="button"
        >
          <Ionicons name="pencil" size={22} color={colors.textSecondary} />
        </Pressable>
      </View>

      <View style={styles.hero}>
        <Pressable onPress={handleAvatarPress} style={styles.avatarPressable}>
          {avatarUri ? (
            <Image source={{ uri: avatarUri }} style={styles.avatarImage} />
          ) : (
            <LinearGradient
              colors={[colors.aurora, colors.mint]}
              style={styles.avatar}
            >
              <Text style={styles.avatarText}>N</Text>
            </LinearGradient>
          )}
          <View style={styles.avatarBadge}>
            <Ionicons name="camera" size={14} color="#FFF" />
          </View>
        </Pressable>
        <Text style={styles.name}>Nearu</Text>
        <Text style={styles.handle}>@nearu</Text>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.stat}>
          <Text style={styles.statValue}>0</Text>
          <Text style={styles.statLabel}>STREAK</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.stat}>
          <Text style={styles.statValue}>0</Text>
          <Text style={styles.statLabel}>CHATS</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.stat}>
          <Text style={styles.statValue}>0</Text>
          <Text style={styles.statLabel}>INSIGHTS</Text>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionCard}>
          <Pressable style={styles.row} onPress={() => onSettingPress('Memory & Context')}>
            <View style={styles.rowIcon}>
              <Ionicons name="bulb-outline" size={20} color={colors.aurora2} />
            </View>
            <Text style={styles.rowLabel}>Memory & Context</Text>
            <Text style={styles.rowValue}>On</Text>
            <Text style={styles.chevron}>›</Text>
          </Pressable>
          <Pressable style={styles.row} onPress={() => onSettingPress('Personality Mode')}>
            <View style={styles.rowIcon}>
              <Ionicons name="sparkles-outline" size={20} color={colors.aurora2} />
            </View>
            <Text style={styles.rowLabel}>Personality Mode</Text>
            <Text style={styles.rowValue}>Warm</Text>
            <Text style={styles.chevron}>›</Text>
          </Pressable>
          <Pressable style={[styles.row, styles.rowLast]} onPress={() => onSettingPress('Proactive Insights')}>
            <View style={styles.rowIcon}>
              <Ionicons name="notifications-outline" size={20} color={colors.aurora2} />
            </View>
            <Text style={styles.rowLabel}>Proactive Insights</Text>
            <Text style={styles.rowValue}>On</Text>
            <Text style={styles.chevron}>›</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>NOTIFICATIONS</Text>
        <View style={styles.sectionCard}>
          <Pressable style={styles.row} onPress={() => onSettingPress('Daily Check-ins')}>
            <View style={styles.rowIcon}>
              <Ionicons name="sunny-outline" size={20} color={colors.amber} />
            </View>
            <Text style={styles.rowLabel}>Daily Check-ins</Text>
            <Text style={styles.rowValue}>On</Text>
            <Text style={styles.chevron}>›</Text>
          </Pressable>
          <Pressable style={[styles.row, styles.rowLast]} onPress={() => onSettingPress('Insight Alerts')}>
            <View style={styles.rowIcon}>
              <Ionicons name="alert-circle-outline" size={20} color={colors.amber} />
            </View>
            <Text style={styles.rowLabel}>Insight Alerts</Text>
            <Text style={styles.rowValue}>On</Text>
            <Text style={styles.chevron}>›</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>ACCOUNT</Text>
        <View style={styles.sectionCard}>
          <Pressable style={styles.row} onPress={() => onSettingPress('Nearu Pro')}>
            <View style={styles.rowIcon}>
              <Ionicons name="diamond-outline" size={20} color={colors.aurora2} />
            </View>
            <Text style={styles.rowLabel}>Nearu Pro</Text>
            <Text style={styles.rowValue}>Free</Text>
            <Text style={styles.chevron}>›</Text>
          </Pressable>
          <Pressable style={styles.row} onPress={() => onSettingPress('Privacy')}>
            <View style={styles.rowIcon}>
              <Ionicons name="lock-closed-outline" size={20} color={colors.textSecondary} />
            </View>
            <Text style={styles.rowLabel}>Privacy</Text>
            <Text style={styles.chevron}>›</Text>
          </Pressable>
          <Pressable
            style={[styles.row, styles.rowLast, styles.signOutRow]}
            onPress={() => Alert.alert('Sign Out', 'Are you sure?', [{ text: 'Cancel' }, { text: 'Sign Out', style: 'destructive' }])}
          >
            <View style={styles.rowIcon}>
              <Ionicons name="log-out-outline" size={20} color={colors.coral} />
            </View>
            <Text style={styles.signOutLabel}>Sign Out</Text>
            <Text style={styles.chevron}>›</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.deep },
  content: { paddingHorizontal: 20 },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 8,
  },
  headerSpacer: { flex: 1 },
  editBtn: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hero: { alignItems: 'center', paddingVertical: 12 },
  avatarPressable: { position: 'relative', marginBottom: 12 },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: 'rgba(123,110,255,0.4)',
  },
  avatarImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: 'rgba(123,110,255,0.4)',
  },
  avatarBadge: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.aurora,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.deep,
  },
  avatarText: { fontFamily: fonts.uiBold, fontSize: 28, color: '#FFF' },
  name: { fontFamily: fonts.display, fontSize: 22, color: colors.textPrimary, letterSpacing: -0.3 },
  handle: { fontFamily: fonts.mono, fontSize: 12, color: colors.textTertiary, marginTop: 4 },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: colors.elevated,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.lg,
    overflow: 'hidden',
    marginBottom: 12,
  },
  stat: { flex: 1, alignItems: 'center', paddingVertical: 16 },
  statValue: { fontFamily: fonts.mono, fontSize: 20, fontWeight: '500', color: colors.textPrimary },
  statLabel: { fontFamily: fonts.uiSemiBold, fontSize: 10, color: colors.textTertiary, marginTop: 4, letterSpacing: 0.5 },
  statDivider: { width: 1, backgroundColor: colors.border },
  section: { marginBottom: 12 },
  sectionTitle: {
    fontFamily: fonts.uiSemiBold,
    fontSize: 12,
    color: colors.textTertiary,
    letterSpacing: 1,
    marginBottom: 8,
    marginLeft: 4,
  },
  sectionCard: {
    backgroundColor: colors.elevated,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.lg,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  rowLast: { borderBottomWidth: 0 },
  rowIcon: { width: 30, height: 30, borderRadius: 8, backgroundColor: 'rgba(255,255,255,0.06)', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  rowLabel: { flex: 1, fontFamily: fonts.ui, fontSize: 15, color: colors.textPrimary },
  rowValue: { fontFamily: fonts.ui, fontSize: 13, color: colors.textTertiary, marginRight: 4 },
  chevron: { fontSize: 14, color: colors.textTertiary },
  signOutRow: {},
  signOutLabel: { flex: 1, fontFamily: fonts.ui, fontSize: 15, color: colors.coral },
});
