import { create } from 'zustand';
import { getCurrentUser } from '../supabase/supabaseAuth.js';

export const useAuthStore = create((set) => ({
  authUser: null,
  isCheckingAuth: true,

  checkAuth: async () => {
    set({ isCheckingAuth: true });
    const { data, error } = await getCurrentUser();
    set({
      authUser: data?.user || null,
      isCheckingAuth: false,
    });
  },

  setUser: (user) => set({ authUser: user }),
}));
