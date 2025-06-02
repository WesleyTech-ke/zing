import create from 'zustand';
import { supabase } from '../lib/supabase';

interface AuthState {
  user: any;
  tokens: number;
  setUser: (user: any) => void;
  setTokens: (tokens: number) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  tokens: 0,
  setUser: (user) => set({ user }),
  setTokens: (tokens) => set({ tokens }),
  logout: async () => {
    await supabase.auth.signOut();
    set({ user: null, tokens: 0 });
  },
}));