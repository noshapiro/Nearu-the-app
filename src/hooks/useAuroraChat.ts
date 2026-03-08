import { useChat } from 'ai/react';
import { useCallback } from 'react';
import type { Message } from 'ai';
import { getChatApiUrl, isChatApiConfigured } from '@/services/aurora';

type Provider = 'openai' | 'gemini';

export function useAuroraChat(provider: Provider = 'openai') {
  const apiUrl = getChatApiUrl();
  const configured = isChatApiConfigured();

  const chat = useChat({
    api: apiUrl || undefined,
    body: { provider },
    onError: (err) => {
      console.warn('Aurora chat error:', err);
    },
  });

  const append = useCallback(
    (message: Message | { role: 'user'; content: string }) => {
      if (!configured) return;
      chat.append(message);
    },
    [configured, chat.append]
  );

  return {
    messages: chat.messages,
    append,
    isLoading: chat.isLoading,
    setInput: chat.setInput,
    input: chat.input,
    handleSubmit: chat.handleSubmit,
    isConfigured: configured,
    error: chat.error,
  };
}
