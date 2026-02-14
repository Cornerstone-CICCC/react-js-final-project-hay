'use client';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { PiHeartFill, PiHeartThin } from 'react-icons/pi';
import { useAuthStore } from '@/app/store/auth.store';
import { type CartItem, useCartStore } from '@/app/store/cart.store';
import { useWishlistStore } from '@/app/store/wishlist.store';
import type { Product } from '@/app/types/products.type';
import type { WishLists } from './WishItemsList';

interface AddCartItemReturn {
  _id: string;
  cartId: string;
  productId: Product;
  quantity: number;
}

type Props = {
  item: WishLists;
};

const WishiItem = ({ item }: Props) => {
  const user = useAuthStore((state) => state.user);
  const removeWishItem = useWishlistStore((state) => state.removeWishItem);
  const setCart = useCartStore((state) => state.setCart);
  const cartItems = useCartStore((state) => state.cartItems);
  const cartId = useCartStore((state) => state.cartId);
  const [isInBag, setIsInBag] = useState<boolean>(false);
  const [update, setUpdate] = useState<boolean>(false);

  const removeWishList = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_ENDPOINT}/wishlists/${item.wishlistId}`, {
      method: 'DELETE',
    });

    if (!res.ok) {
      console.log('Error deleting wishlist');
      return;
    }
    const data = await res.json();
    console.log(data);
    removeWishItem(item.productId);
    setUpdate((prev) => !prev);
    toast('Item removed from your wishlist');
  };

  const addToBag = async (productId: string) => {
    if (!user) return;
    const body = {
      cartId,
      productId,
      quantity: 1,
    };
    const res = await fetch(`${process.env.NEXT_PUBLIC_ENDPOINT}/cartitems/update`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const data = (await res.json()) as AddCartItemReturn;
    const newItem: CartItem = {
      cartItemId: data._id,
      productId: data.productId._id,
      image: data.productId.image,
      name: data.productId.name,
      price: data.productId.price,
      stock: data.productId.stock,
      cartId: data.cartId,
      quantity: data.quantity,
    };

    const newCartItems: CartItem[] = [...cartItems, newItem];

    setCart(newCartItems);
  };

  useEffect(() => {
    const inBag = cartItems.find((t) => t.productId === item.productId);
    if (inBag) setIsInBag(true);
  }, []);

  useEffect(() => {}, [update]);

  return (
    <div className="flex flex-col w-[70%] max-w-[300px] justify-center mx-auto md:pt-8">
      <Image
        width={250}
        height={250}
        src={`/assets/shine_studio_images/${item.image}`}
        alt={item.name.slice(0, 5)}
        className="pb-4 mx-auto w-full "
      />
      <div className="text-sm">{item.name}</div>

      <div className="w-full flex justify-between py-4">
        <div className="font-bold">$ {item.price}</div>
        <div className="cursor-pointer" onClick={removeWishList}>
          <PiHeartFill className="text-[#008FAB] text-lg" />
        </div>
      </div>

      {isInBag ? (
        <button
          type="button"
          className="bg-[#008FAB] text-white text-center py-2 rounded-xl cursor-pointer"
          onClick={() => redirect('/shopping-bag')}
        >
          View Bag
        </button>
      ) : (
        <button
          type="button"
          className="text-center border border-[rgba(34,34,34,0.5)] py-2 rounded-xl cursor-pointer"
          onClick={() => addToBag(item.productId)}
        >
          Add to Bag
        </button>
      )}
    </div>
  );
};

export default WishiItem;
