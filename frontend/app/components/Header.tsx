'use client';

import Image from 'next/image';
import Link from 'next/link';
import { type SubmitEvent, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { IoIosMenu } from 'react-icons/io';
import { IoCloseOutline } from 'react-icons/io5';
import { PiHeartStraight } from 'react-icons/pi';
import { RiUserLine } from 'react-icons/ri';
import { SlHandbag } from 'react-icons/sl';
import { useCartStore } from '../store/cart.store';
import { useWishlistStore } from '../store/wishlist.store';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isSpSerchOpen, setIsSpSerchOpen] = useState<boolean>(false);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState<boolean>(false);
  const [keywordInput, setKeywordInput] = useState<string>('');

  const handleMenuOpen = () => {
    setIsMenuOpen(true);
  };
  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };
  const handleSpSerchOpen = () => {
    setIsSpSerchOpen(true);
  };
  const handleSpSerchClose = () => {
    setIsSpSerchOpen(false);
    setKeywordInput('');
  };
  const handleCartOpen = () => {
    setIsCartOpen(true);
  };
  const handleCartClose = () => {
    setIsCartOpen(false);
  };
  const handleWishOpen = () => {
    setIsWishlistOpen(true);
  };
  const handleWishClose = () => {
    setIsWishlistOpen(false);
  };

  // cart status
  const cartItems = useCartStore((s) => s.cartItems);
  const removeCartItem = useCartStore((s) => s.removeCartItem);
  const totalCartNum = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // wishlist status
  const wishItems = useWishlistStore((s) => s.wishItems);
  const removeWishItem = useWishlistStore((s) => s.removeWishItem);
  const totalWishNum = wishItems.length;

  // search
  const handleSearchSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSpSerchClose();
    setKeywordInput('');
  };

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
            <button type="button" onClick={handleSpSerchOpen} className="cursor-pointer">
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
              <Link href="/shop">Shop</Link>
            </li>
            <li>
              <Link href="/policy">Our Policy</Link>
            </li>
          </menu>
        </nav>
        <ul className="flex gap-4 md:gap-5 md:items-center">
          <li className="hidden md:flex">
            <button type="button" className="cursor-pointer">
              <FiSearch />
            </button>
          </li>
          <li className="hidden md:flex">
            <Link href="/login">
              <RiUserLine />
            </Link>
          </li>
          <li className="text-[20px] flex">
            <Link href="/wishlist" onMouseOver={handleWishOpen}>
              <PiHeartStraight />
            </Link>
          </li>
          <li className="text-[20px] flex relative">
            <span className="absolute top-[-6px] left-[17px] text-[10px] font-semibold text-[#008FAB]">
              {totalCartNum}
            </span>
            <Link href="/cart" onMouseOver={handleCartOpen}>
              <SlHandbag />
            </Link>
          </li>
        </ul>
      </div>
      <div
        className={
          isMenuOpen
            ? 'fixed top-0 left-0 w-full h-full transform-[translateX(0)] bg-[#22222299] transition'
            : 'fixed top-0 left-0 w-full h-full transform-[translateX(-100vw)] transition'
        }
      >
        <div className="bg-white w-[90%] h-full px-4 py-5">
          <button type="button" onClick={handleMenuClose} className="text-[28px] cursor-pointer">
            <IoCloseOutline />
          </button>
          <ul className="px-1 py-20 flex flex-col gap-4">
            <li>
              <Link href="/" onClick={handleMenuClose}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/shop" onClick={handleMenuClose}>
                Shop
              </Link>
            </li>
            <li>
              <Link href="/policy" onClick={handleMenuClose}>
                Our Policy
              </Link>
            </li>
            <li className="border-t pt-6 mt-2">
              <Link href="/login" onClick={handleMenuClose}>
                Login
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div
        className={
          isSpSerchOpen
            ? 'fixed top-0 left-0 w-full h-full transform-[translateX(0)] bg-[#22222299] transition'
            : 'fixed top-0 left-0 w-full h-full transform-[translateX(-100vw)] transition'
        }
      >
        <div className="bg-white w-[90%] h-full px-4 py-5">
          <button type="button" onClick={handleSpSerchClose} className="text-[28px] cursor-pointer">
            <IoCloseOutline />
          </button>
          <form className="px-1 mt-4" onSubmit={handleSearchSubmit}>
            <div className="flex border border-slate-500 bg-slate-100 rounded-xl">
              <input
                type="text"
                name="keyword"
                value={keywordInput}
                onChange={(e) => setKeywordInput(e.target.value)}
                className="px-5 py-3 w-full outline-none"
                placeholder="Search..."
              />
              <button
                type="submit"
                className="min-w-[48] flex justify-center items-center cursor-pointer text-[20px]"
              >
                <FiSearch />
              </button>
            </div>
          </form>
        </div>
      </div>
      <div
        className={
          isCartOpen
            ? 'fixed top-0 right-0 w-full h-full transform-[translateX(0)] bg-[#22222299] transition hidden md:block'
            : 'fixed top-0 right-0 w-full h-full transform-[translateX(100vw)] transition hidden md:block'
        }
      >
        <div className="max-w-5xl mx-auto w-full h-full relative">
          <button
            type="button"
            className="text-[40px] cursor-pointer absolute top-[115px] right-[575px] text-white mr-[10px]"
            onClick={handleCartClose}
          >
            <IoCloseOutline />
          </button>
          <div className="bg-white absolute top-[115px] right-0">
            <div className="w-[575] bg-[#E9F4F34D] px-13 pt-8 pb-13">
              <p className="text-center">
                Your Bag <span className="text-[#008FAB]">({totalCartNum})</span>
              </p>
              <ul>
                {cartItems.map((i) => (
                  <li key={i.cartItemId} className="flex gap-2">
                    <div>
                      <Image
                        src={`/assets/products/${i.image}`}
                        alt={i.name}
                        width={154}
                        height={154}
                      />
                    </div>
                    <div>
                      <p>{i.name}</p>
                      <p>${i.price}</p>
                    </div>
                    <button
                      type="button"
                      className="text-[28px] cursor-pointer"
                      onClick={() => removeCartItem(i.cartItemId)}
                    >
                      <IoCloseOutline />
                    </button>
                  </li>
                ))}
              </ul>
              {totalCartNum === 0 ? (
                <p>Your Shopping Bag is empty.</p>
              ) : (
                <Link href="/cart">View Shopping Bag</Link>
              )}
            </div>
          </div>
        </div>
      </div>
      <div
        className={
          isWishlistOpen
            ? 'fixed top-0 right-0 w-full h-full transform-[translateX(0)] bg-[#22222299] transition hidden md:block'
            : 'fixed top-0 right-0 w-full h-full transform-[translateX(100vw)] transition hidden md:block'
        }
      >
        <div className="max-w-5xl mx-auto w-full h-full relative">
          <button
            type="button"
            className="text-[40px] cursor-pointer absolute top-[115px] right-[575px] text-white mr-[10px]"
            onClick={handleWishClose}
          >
            <IoCloseOutline />
          </button>
          <div className="bg-white absolute top-[115px] right-0">
            <div className="w-[575] bg-[#E9F4F34D] px-13 pt-8 pb-13">
              <p className="text-center">
                Your Wishlist <span className="text-[#008FAB]">({totalWishNum})</span>
              </p>
              <ul>
                {wishItems.map((i) => (
                  <li key={i.productId} className="flex gap-2">
                    <div>
                      <Image
                        src={`/assets/products/${i.image}`}
                        alt={i.name}
                        width={154}
                        height={154}
                      />
                    </div>
                    <div>
                      <p>{i.name}</p>
                      <p>${i.price}</p>
                    </div>
                    <button
                      type="button"
                      className="text-[28px] cursor-pointer"
                      onClick={() => removeWishItem(i.productId)}
                    >
                      <IoCloseOutline />
                    </button>
                  </li>
                ))}
              </ul>
              {totalWishNum === 0 ? (
                <p>Your Wishlist is empty.</p>
              ) : (
                <Link href="/wishlist">View Wishlist</Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
