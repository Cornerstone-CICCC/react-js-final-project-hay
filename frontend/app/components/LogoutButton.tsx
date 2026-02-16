'use client';

import { useRouter } from 'next/navigation';
import { TbLogout } from 'react-icons/tb';
import { useAuthStore } from '../store/auth.store';
import { useCartStore } from '../store/cart.store';
import { useSearchTermStore } from '../store/searchTerm.store';
import { useWishlistStore } from '../store/wishlist.store';

type Props = {
  logoutLabel?: string;
  onLogout?: () => void;
};

const LogoutButton = ({ logoutLabel, onLogout }: Props) => {
  const logout = useAuthStore((s) => s.logout);
  const setSearchTerm = useSearchTermStore((s) => s.setSearchTerm);
  const clearCart = useCartStore((s) => s.clearCart);
  const setCartId = useCartStore((s) => s.setCartId);
  const clearWishlist = useWishlistStore((s) => s.clearWishlist);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_ENDPOINT}/users/logout`, {
        method: 'GET',
        credentials: 'include',
      });

      if (!res.ok) {
        throw new Error('Logout Failed');
      }

      logout();
      setSearchTerm('');
      clearCart();
      setCartId('');
      clearWishlist();
      onLogout?.();

      router.push('/login');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  return (
    <button type="button" onClick={handleLogout} className="cursor-pointer">
      {logoutLabel ? <span>{logoutLabel}</span> : <TbLogout />}
    </button>
  );
};

export default LogoutButton;
