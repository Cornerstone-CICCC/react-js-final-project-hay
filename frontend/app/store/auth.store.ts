import { create } from 'zustand';

type User = {
  id: string;
  firstname: string;
};

type State = {
  user: User | null;
};

type Action = {
  setUser: (user: User | null) => void;
  logout: () => void;
};

export const useAuthStore = create<State & Action>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
}));
