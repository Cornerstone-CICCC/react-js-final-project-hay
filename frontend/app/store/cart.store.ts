import { create } from 'zustand';

type CartItem = {
  cartItemId: string;
  productId: string;
  image: string;
  name: string;
  price: number;
  stock: number;
  cartId: string;
  quantity: number;
};

type State = {
  cartItems: CartItem[];
};

type Action = {
  setCart: (cartItems: CartItem[]) => void;
  clearCart: () => void;
  removeCartItem: (cartItemId: string) => void;
};

export const useCartStore = create<State & Action>((set) => ({
  cartItems: [],
  setCart: (cartItems) => set({ cartItems }),
  clearCart: () => set({ cartItems: [] }),
  removeCartItem: (cartItemId) =>
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.cartItemId !== cartItemId),
    })),
}));
