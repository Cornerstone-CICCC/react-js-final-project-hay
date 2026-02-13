import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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

const newUser={
  id: "698e925803f750cea7d9af93",
  firstname: "Amy"
}

export const useAuthStore = create<State & Action>()(
  persist(
    (set) => ({
      user: newUser,
      setUser: (user) => set({ user }),
      logout: () => set({ user: null }),
    }),
    {
      name: 'user-storage',
    },
  ),
);
