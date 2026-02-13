'use client';

import Image from 'next/image';
import Link from 'next/link';
import { IoCloseOutline } from 'react-icons/io5';
import { useAuthStore } from '@/app/store/auth.store';
import { useWishlistStore } from '@/app/store/wishlist.store';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const WishlistModal = ({ isOpen, onClose }: Props) => {
  const wishItems = useWishlistStore((s) => s.wishItems);
  const removeWishItem = useWishlistStore((s) => s.removeWishItem);
  const totalWishNum = wishItems.length;
  const user = useAuthStore((s) => s.user);

  const handleRemove = async (productId: string) => {
    removeWishItem(productId);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_ENDPOINT}/wishlists/${productId}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (!res.ok) {
        throw new Error('Failed to remove item from wishlist.');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      className={
        isOpen
          ? 'fixed top-0 right-0 z-2 w-full h-full transform-[translateX(0)] bg-[#22222299] transition hidden md:block'
          : 'fixed top-0 right-0 z-2 w-full h-full transform-[translateX(100vw)] transition hidden md:block'
      }
    >
      <div className="max-w-5xl mx-auto w-full h-full relative">
        <div className="bg-white absolute top-[115px] right-0">
          <div className="w-[575] bg-[#E9F4F34D] px-13 pt-8 pb-13 relative">
            <button
              type="button"
              className="text-[30px] cursor-pointer absolute top-[18px] right-[18px]"
              onClick={onClose}
            >
              <IoCloseOutline />
            </button>
            <p className="text-center font-semibold text-2xl">
              Your Wishlist <span className="text-[#008FAB]">({totalWishNum})</span>
            </p>
            {user ? (
              totalWishNum === 0 ? (
                <p className="mt-8">Your Wishlist is empty.</p>
              ) : (
                <>
                  <ul>
                    {wishItems.map((i) => (
                      <li key={`h_${i.productId}`} className="flex gap-5 py-8 border-b-[#008FAB]">
                        <div>
                          <Image
                            src={`/assets/shine_studio_images/${i.image}`}
                            alt={i.name}
                            width={154}
                            height={154}
                          />
                        </div>
                        <div>
                          <p>{i.name}</p>
                          <p className="mt-4">${i.price}</p>
                        </div>
                        <button
                          type="button"
                          className="text-[28px] cursor-pointer text-[#008FAB]"
                          onClick={() => handleRemove(i.productId)}
                        >
                          <IoCloseOutline />
                        </button>
                      </li>
                    ))}
                  </ul>
                  <Link href="/wishlist" className="mt-8">
                    View Wishlist
                  </Link>
                </>
              )
            ) : (
              <>
                <p className="mt-8">You are not logged in.</p>
                <Link href="/login" className="mt-8">
                  Sign In
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishlistModal;
