import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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
  cartId: string;
};

type Action = {
  setCart: (cartItems: CartItem[]) => void;
  setCartId: (cartId: string) => void;
  clearCart: () => void;
  removeCartItem: (cartItemId: string) => void;
};

export const useCartStore = create<State & Action>()(
  persist(
    (set) => ({
      cartItems: [],
      cartId: '',
      setCart: (cartItems) => set({ cartItems }),
      setCartId: (cartId) => set({ cartId }),
      clearCart: () => set({ cartItems: [] }),
      removeCartItem: (cartItemId) =>
        set((state) => ({
          cartItems: state.cartItems.filter((item) => item.cartItemId !== cartItemId),
        })),
    }),
    {
      name: 'cart-store',
    },
  ),
);
