import { create } from 'zustand';

type WishItem = {
  wishlistId: string;
  productId: string;
  image: string;
  name: string;
  price: number;
};

type State = {
  wishItems: WishItem[];
};

type Action = {
  setWishlist: (wishItems: WishItem[]) => void;
  clearWishlist: () => void;
  removeWishItem: (productId: string) => void;
};

export const useWishlistStore = create<State & Action>((set) => ({
  wishItems: [],
  setWishlist: (wishItems) => set({ wishItems }),
  clearWishlist: () => set({ wishItems: [] }),
  removeWishItem: (productId) =>
    set((state) => ({
      wishItems: state.wishItems.filter((item) => item.productId !== productId),
    })),
}));
