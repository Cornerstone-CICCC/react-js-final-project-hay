'use client';

import Link from 'next/link';
import { IoCloseOutline } from 'react-icons/io5';
import { useAuthStore } from '@/app/store/auth.store';
import LogoutButton from '../LogoutButton';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const SpMenuModal = ({ isOpen, onClose }: Props) => {
  const user = useAuthStore((s) => s.user);

  return (
    <div
      className={
        isOpen
          ? 'fixed top-0 left-0 z-2 w-full h-full transform-[translateX(0)] bg-[#22222299] transition'
          : 'fixed top-0 left-0 z-2 w-full h-full transform-[translateX(-100vw)] transition'
      }
    >
      <div className="bg-white w-[90%] h-full px-4 py-5">
        <button type="button" onClick={onClose} className="text-[28px] cursor-pointer">
          <IoCloseOutline />
        </button>
        <ul className="px-1 py-20 flex flex-col gap-4">
          <li>
            <Link href="/" onClick={onClose}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/products" onClick={onClose}>
              Shop
            </Link>
          </li>
          <li>
            <Link href="/policy" onClick={onClose}>
              Our Policy
            </Link>
          </li>
          <li className="border-t pt-6 mt-2">
            {user ? (
              <LogoutButton logoutLabel="Logout" onLogout={onClose} />
            ) : (
              <Link href="/login" onClick={onClose}>
                Login
              </Link>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SpMenuModal;
