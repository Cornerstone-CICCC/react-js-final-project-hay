import { create } from 'zustand';

type State = {
  searchTerm: string;
};

type Action = {
  setSearchTerm: (term: string) => void;
};

export const useSearchTermStore = create<State & Action>((set) => ({
  searchTerm: '',
  setSearchTerm: (term) => set({ searchTerm: term }),
}));
