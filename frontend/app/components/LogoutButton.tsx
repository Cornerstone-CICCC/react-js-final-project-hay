'use client';

import { useRouter } from 'next/navigation';
import { TbLogout } from 'react-icons/tb';
import { useAuthStore } from '../store/auth.store';

const LogoutButton = () => {
  const setLoggedIn = useAuthStore((s) => s.setLoggedIn);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/logout', {
        method: 'POST',
        credentials: 'include',
      });
      setLoggedIn(false);
      router.push('/login');
      router.refresh();
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  return (
    <button type="button" onClick={handleLogout}>
      <TbLogout />
    </button>
  );
};

export default LogoutButton;
