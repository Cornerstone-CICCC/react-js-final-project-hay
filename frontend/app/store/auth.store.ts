import { create } from 'zustand';

type State = {
  isLoggedIn: boolean;
};

type Action = {
  setLoggedIn: (status: boolean) => void;
};

export const useAuthStore = create<State & Action>((set) => ({
  isLoggedIn: false,
  setLoggedIn: (status) => set(() => ({ isLoggedIn: status })),
}));
