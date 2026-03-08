import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors, fonts, radii } from '@/theme';
import { useHaptics } from '@/hooks/useHaptics';
import { useAuroraChat } from '@/hooks/useAuroraChat';

export default function ChatScreen() {
  const insets = useSafeAreaInsets();
  const haptics = useHaptics();
  const { messages, append, isLoading, isConfigured, error } = useAuroraChat('openai');
  const [inputText, setInputText] = useState('');
  const hasText = inputText.trim().length > 0;

  const handleSend = () => {
    const text = inputText.trim();
    if (!text) return;
    haptics.messageSend();
    setInputText('');
    if (isConfigured) {
      append({ role: 'user', content: text });
    } else {
      Alert.alert(
        'API не подключён',
        'Добавь EXPO_PUBLIC_API_URL в .env и задеплой api/chat.ts (Vercel). См. api/README.md.',
        [{ text: 'OK' }]
      );
    }
  };

  const handleMic = () => {
    haptics.tap();
    Alert.alert('Голосовой ввод', 'Будет доступен после подключения чата.');
  };

  const showEmpty = messages.length === 0 && !isLoading;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={0}
    >
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <View style={[styles.headerBlur, styles.headerContent]}>
          <LinearGradient colors={[colors.aurora, colors.mint]} style={styles.headerAvatar}>
            <Text style={styles.headerAvatarSymbol}>✦</Text>
          </LinearGradient>
          <View style={styles.headerDot} />
          <View style={styles.headerTextWrap}>
            <Text style={styles.headerName}>Aurora</Text>
            <View style={styles.headerStatus}>
              <View style={styles.statusDot} />
              <Text style={styles.headerStatusText}>Online</Text>
            </View>
          </View>
          <View style={styles.headerIcons}>
            <Ionicons name="flash-outline" size={20} color={colors.textSecondary} />
            <Ionicons name="ellipsis-horizontal" size={20} color={colors.textSecondary} />
          </View>
        </View>
      </View>

      <ScrollView
        style={styles.messagesArea}
        contentContainerStyle={styles.messagesContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {showEmpty && (
          <View style={styles.emptyWrap}>
            <Text style={styles.emptyTitle}>Chat with Aurora</Text>
            <Text style={styles.emptySub}>
              Send a message to start the conversation. Aurora learns from your patterns and memories.
            </Text>
            {!isConfigured && (
              <Text style={styles.emptyHint}>
                Add EXPO_PUBLIC_API_URL in .env and deploy api/chat.ts to get replies. See api/README.md.
              </Text>
            )}
          </View>
        )}
        {messages.map((m) => (
          <View
            key={m.id}
            style={[styles.bubble, m.role === 'user' ? styles.bubbleUser : styles.bubbleAssistant]}
          >
            {m.role === 'assistant' && (
              <View style={styles.avatarSmall}>
                <Text style={styles.avatarSmallText}>✦</Text>
              </View>
            )}
            <View style={m.role === 'user' ? styles.bubbleUserInner : styles.bubbleAssistantInner}>
              <Text style={m.role === 'user' ? styles.bubbleTextUser : styles.bubbleTextAssistant}>
                {typeof m.content === 'string' ? m.content : ''}
              </Text>
            </View>
          </View>
        ))}
        {isLoading && (
          <View style={[styles.bubble, styles.bubbleAssistant]}>
            <View style={styles.typingDots}>
              <View style={styles.typingDot} />
              <View style={styles.typingDot} />
              <View style={styles.typingDot} />
            </View>
          </View>
        )}
        {error && (
          <Text style={styles.errorText}>Ошибка: {error.message}. Проверь API URL и ключи на сервере.</Text>
        )}
      </ScrollView>

      <View style={[styles.inputBar, { paddingBottom: 88 + Math.max(insets.bottom, 12) }]}>
        <View style={[styles.inputBarBlur, styles.inputInner]}>
          <Pressable style={styles.attachBtn}>
            <Ionicons name="add" size={24} color={colors.textSecondary} />
          </Pressable>
          <TextInput
            style={styles.input}
            placeholder="Message Aurora..."
            placeholderTextColor={colors.textTertiary}
            multiline
            maxLength={500}
            value={inputText}
            onChangeText={setInputText}
          />
          {hasText ? (
            <Pressable style={styles.sendBtn} onPress={handleSend}>
              <LinearGradient colors={[colors.aurora, colors.aurora2]} style={styles.sendBtnGradient}>
                <Ionicons name="arrow-up" size={20} color="#FFF" />
              </LinearGradient>
            </Pressable>
          ) : (
            <Pressable style={styles.micBtn} onPress={handleMic}>
              <Ionicons name="mic-outline" size={24} color={colors.textSecondary} />
            </Pressable>
          )}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.deep },
  header: { paddingHorizontal: 16 },
  headerBlur: { borderRadius: radii.lg, overflow: 'hidden', borderBottomWidth: 1, borderBottomColor: colors.border },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: colors.deep,
  },
  headerAvatar: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  headerAvatarSymbol: { fontSize: 18, color: '#FFF' },
  headerDot: {
    position: 'absolute',
    left: 44,
    bottom: 12,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.mint,
    borderWidth: 2,
    borderColor: colors.void,
  },
  headerTextWrap: { marginLeft: 12, flex: 1 },
  headerName: { fontFamily: fonts.uiSemiBold, fontSize: 16, color: colors.textPrimary },
  headerStatus: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 2 },
  statusDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.mint },
  headerStatusText: { fontFamily: fonts.ui, fontSize: 12, color: colors.mint },
  headerIcons: { flexDirection: 'row', gap: 16 },
  messagesArea: { flex: 1, paddingHorizontal: 16 },
  messagesContent: { paddingTop: 16, paddingBottom: 120 },
  emptyWrap: { paddingTop: 16, alignItems: 'center', paddingHorizontal: 24 },
  emptyTitle: { fontFamily: fonts.display, fontSize: 22, color: colors.textPrimary, marginBottom: 8, textAlign: 'center' },
  emptySub: { fontFamily: fonts.ui, fontSize: 14, color: colors.textSecondary, lineHeight: 22, textAlign: 'center' },
  emptyHint: { fontFamily: fonts.ui, fontSize: 12, color: colors.textTertiary, marginTop: 12, textAlign: 'center' },
  bubble: { flexDirection: 'row', marginBottom: 12, alignItems: 'flex-end' },
  bubbleUser: { justifyContent: 'flex-end' },
  bubbleAssistant: { justifyContent: 'flex-start' },
  bubbleUserInner: {
    maxWidth: '85%',
    backgroundColor: colors.aurora,
    borderRadius: 18,
    borderBottomRightRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 16,
    overflow: 'hidden',
  },
  bubbleAssistantInner: {
    maxWidth: '85%',
    backgroundColor: colors.elevated,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 18,
    borderBottomLeftRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  bubbleTextUser: { fontFamily: fonts.ui, fontSize: 15, color: '#FFF' },
  bubbleTextAssistant: { fontFamily: fonts.ui, fontSize: 15, color: colors.textPrimary, lineHeight: 22 },
  avatarSmall: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.auroraDim,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  avatarSmallText: { fontSize: 14, color: colors.aurora2 },
  typingDots: { flexDirection: 'row', gap: 6, paddingVertical: 12, paddingHorizontal: 16 },
  typingDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.aurora },
  errorText: { fontFamily: fonts.ui, fontSize: 12, color: colors.coral, marginTop: 8, paddingHorizontal: 4 },
  inputBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 16,
    paddingTop: 8,
    backgroundColor: colors.deep,
  },
  inputBarBlur: { borderRadius: 24, overflow: 'hidden', borderTopWidth: 1, borderTopColor: colors.border },
  inputInner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.elevated,
    borderWidth: 1,
    borderColor: colors.borderStrong,
    borderRadius: 24,
    paddingVertical: 8,
    paddingHorizontal: 12,
    gap: 8,
  },
  attachBtn: { width: 32, height: 32, alignItems: 'center', justifyContent: 'center' },
  input: { flex: 1, fontFamily: fonts.ui, fontSize: 15, color: colors.textPrimary, maxHeight: 120, paddingVertical: 4 },
  micBtn: { width: 32, height: 32, alignItems: 'center', justifyContent: 'center' },
  sendBtn: { width: 34, height: 34, borderRadius: 17, overflow: 'hidden', shadowColor: colors.aurora, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.4, shadowRadius: 12, elevation: 4 },
  sendBtnGradient: { width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' },
});
