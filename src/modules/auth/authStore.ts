import { create } from "zustand";

interface AuthState {
  user: User | null;
  setUser: (data: User | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (data: User | null) => set(() => ({ user: data })),
}));
