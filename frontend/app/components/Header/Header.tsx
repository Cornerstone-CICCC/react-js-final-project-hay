'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { IoIosMenu } from 'react-icons/io';
import { PiHeartStraight } from 'react-icons/pi';
import { RiUserLine } from 'react-icons/ri';
import { SlHandbag } from 'react-icons/sl';
import { useAuthStore } from '@/app/store/auth.store';
import { useCartStore } from '../../store/cart.store';
import LogoutButton from '../LogoutButton';
import CartModal from './CartModal';
import SearchModal from './SearchModal';
import SpMenuModal from './SpMenuModal';
import SpSearchModal from './SpSearchModal';
import WishlistModal from './WishlistModal';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isSpSearchOpen, setIsSpSearchOpen] = useState<boolean>(false);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  const handleMenuOpen = () => {
    setIsMenuOpen(true);
  };
  const handleSpSearchOpen = () => {
    setIsSpSearchOpen(true);
  };
  const handleCartOpen = () => {
    setIsCartOpen(true);
  };
  const handleWishOpen = () => {
    setIsWishlistOpen(true);
  };
  const handleSearchOpen = () => {
    setIsSearchOpen(true);
  };

  // cart status
  const cartItems = useCartStore((s) => s.cartItems);
  const totalCartNum = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const user = useAuthStore((s) => s.user);

  return (
    <header>
      <div className="flex justify-between items-center px-5 py-3 md:max-w-5xl md:mx-auto">
        <ul className="flex gap-4 md:hidden">
          <li className="flex items-center text-[20px]">
            <button type="button" onClick={handleMenuOpen} className="cursor-pointer">
              <IoIosMenu />
            </button>
          </li>
          <li className="flex items-center text-[20px]">
            <button type="button" onClick={handleSpSearchOpen} className="cursor-pointer">
              <FiSearch />
            </button>
          </li>
        </ul>
        <Link href="/" className="w-[40] md:w-[80]">
          <Image src="/assets/header/logo.png" alt="Shine Studio" width={80} height={91} />
        </Link>
        <nav className="hidden md:block">
          <menu className="flex text-lg font-semibold gap-6">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/products">Shop</Link>
            </li>
            <li>
              <Link href="/policy">Our Policy</Link>
            </li>
          </menu>
        </nav>
        <ul className="flex gap-4 md:gap-5 md:items-center">
          <li className="hidden md:flex">
            <button
              type="button"
              className="cursor-pointer"
              onMouseOver={handleSearchOpen}
              onFocus={handleSearchOpen}
            >
              <FiSearch />
            </button>
          </li>
          <li className="hidden md:flex">
            {user ? (
              <LogoutButton />
            ) : (
              <Link href="/login">
                <RiUserLine />
              </Link>
            )}
          </li>
          <li className="text-[20px] flex">
            <Link href="/wishlist" onMouseOver={handleWishOpen} onFocus={handleWishOpen}>
              <PiHeartStraight />
            </Link>
          </li>
          <li className="text-[20px] flex relative">
            <span className="absolute top-[-6px] left-[17px] text-[10px] font-semibold text-[#008FAB]">
              {totalCartNum}
            </span>
            <Link href="/shopping-bag" onMouseOver={handleCartOpen} onFocus={handleCartOpen}>
              <SlHandbag />
            </Link>
          </li>
        </ul>
      </div>
      <SpMenuModal isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <SpSearchModal isOpen={isSpSearchOpen} onClose={() => setIsSpSearchOpen(false)} />
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <WishlistModal isOpen={isWishlistOpen} onClose={() => setIsWishlistOpen(false)} />
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </header>
  );
};

export default Header;
