import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';

export interface User {
  id: string;
  name: string;
  email?: string;
  avatarUrl?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isOnboarded: boolean;
  _hydrated: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
  completeOnboarding: () => void;
  setHydrated: (value: boolean) => void;
}

const ONBOARDED_KEY = 'nearu_onboarded';
const TOKEN_KEY = 'nearu_token';
const USER_KEY = 'nearu_user';

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isOnboarded: false,
  _hydrated: false,

  setHydrated: (value) => set({ _hydrated: value }),

  login: async (token, user) => {
    try {
      await SecureStore.setItemAsync(TOKEN_KEY, token);
      await SecureStore.setItemAsync(USER_KEY, JSON.stringify(user));
    } catch {
      // simulator / storage failure
    }
    set({ token, user });
  },

  logout: async () => {
    try {
      await SecureStore.deleteItemAsync(TOKEN_KEY);
      await SecureStore.deleteItemAsync(USER_KEY);
    } catch {
      // ignore
    }
    set({ token: null, user: null });
  },

  completeOnboarding: async () => {
    try {
      await SecureStore.setItemAsync(ONBOARDED_KEY, 'true');
    } catch {
      // ignore
    }
    set({ isOnboarded: true });
  },
}));

export async function hydrateAuthStore() {
  try {
    const [onboarded, token, userJson] = await Promise.all([
      SecureStore.getItemAsync(ONBOARDED_KEY),
      SecureStore.getItemAsync(TOKEN_KEY),
      SecureStore.getItemAsync(USER_KEY),
    ]);
    const user = userJson ? (JSON.parse(userJson) as User) : null;
    useAuthStore.setState({
      isOnboarded: onboarded === 'true',
      token,
      user,
      _hydrated: true,
    });
  } catch {
    useAuthStore.setState({ _hydrated: true });
  }
}
