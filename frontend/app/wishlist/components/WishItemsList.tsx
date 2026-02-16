'use client';
import Link from 'next/link';
import { use, useEffect, useState } from 'react';
import { useAuthStore } from '@/app/store/auth.store';
import { useCartStore } from '@/app/store/cart.store';
import { useWishlistStore } from '@/app/store/wishlist.store';
import type { WishList } from '@/app/types/wishList.types';
import WishiItem from './WishiItem';

export type WishLists = {
  wishlistId: string;
  productId: string;
  image: string;
  name: string;
  price: number;
};

const WishItemsList = () => {
  const user = useAuthStore((state) => state.user);
  const cartItems = useCartStore((state) => state.cartItems);
  const cartItemLen = cartItems.length;
  const wishItems = useWishlistStore((state) => state.wishItems);
  const removeWishItem = useWishlistStore((state) => state.removeWishItem);
  const [data, setData] = useState<WishLists[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      //fetch wish list
      if (!user) return;
      const res = await fetch(`${process.env.NEXT_PUBLIC_ENDPOINT}/wishlists/${user?.userId}`);
      const data = (await res.json()) as WishLists[];
      setData(data ? data : []);
    };

    fetchData();
  }, [user, wishItems]);

  return (
    <div>
      <div className="mx-auto md:px-8">
        <h2 className="text-3xl text-[#008FAB] font-bold pt-6 pb-3">
          Wishlist
          <span className="text-sm text-[#4D4C4C] ps-4">({data.length} products)</span>
        </h2>
        <div className="text-[10px] md:text-sm px-2 md:px-10 max-w-[1300px] mx-auto">
          Welcome to your Wishlist! Here, you can curate all your favorite pieces, making it easy to
          find that perfect sparkle whenever you need it. From timeless classics to trendy designs,
          your dream jewelry is just a click away. Start adding today and keep your style shining
          bright!
        </div>
      </div>

      {data.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 max-w-350 mx-auto py-8 md:py-4 gap-10 md:gap-4 px-6 ">
          {data.map((item) => (
            <WishiItem item={item} key={`wish-${item.wishlistId}`} />
          ))}
        </div>
      ) : (
        <div className="py-10">
          {!user ? (
            <div className="pt-20">
              <div className="text-xl text-center">
                Please
                <Link href="/login" className="font-bold underline ps-2">
                  login
                </Link>{' '}
                to add your wishlist!
              </div>
            </div>
          ) : (
            <div className="pt-20">
              <div className="text-xl text-center">There is nothing to show here</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default WishItemsList;
