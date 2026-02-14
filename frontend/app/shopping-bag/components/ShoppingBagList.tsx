'use client';

import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md';
import { RiCloseLargeLine } from 'react-icons/ri';
import { useAuthStore } from '@/app/store/auth.store';
import { type CartItem, useCartStore } from '@/app/store/cart.store';
import useSocketStore from '@/app/store/socket.store';
import { useWishlistStore, type WishItem } from '@/app/store/wishlist.store';
import type { Product } from '@/app/types/products.type';

interface WishlistsReturnType {
  userId: string;
  productId: Product;
  _id: string;
}

interface CartItemReturn {
  _id: string;
  cartId: string;
  productId: Product;
  quantity: number;
}

const ShoppingBagList = () => {
  const likedItem = useSocketStore((state) => state.likedItem);
  const user = useAuthStore((state) => state.user);
  const cartId = useCartStore((state) => state.cartId);
  const cartItems = useCartStore((state) => state.cartItems);
  const setCart = useCartStore((state) => state.setCart);
  const wishItems = useWishlistStore((state) => state.wishItems);
  const setWishlist = useWishlistStore((state) => state.setWishlist);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastChangedItemRef = useRef<CartItem | null>(null);

  const addToWishList = async (item: CartItem) => {
    if (!user) {
      console.log('User not exist');
      return;
    }
    //add it to wish list
    const res = await fetch(`${process.env.NEXT_PUBLIC_ENDPOINT}/wishlists`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: user.id,
        productId: item.productId,
      }),
    });

    const data: WishlistsReturnType = await res.json();

    const newWishItems: WishItem[] = [
      ...wishItems,
      {
        wishlistId: data._id ?? '',
        productId: data.productId._id ?? '',
        image: data.productId.image ?? '',
        name: data.productId.name ?? '',
        price: data.productId.price ?? '',
      },
    ];

    likedItem({ productId: data.productId._id });

    setWishlist(newWishItems);

    //remove from cart
    await removeFromCart(item.cartItemId);
  };

  const removeFromCart = async (cartItemId: string) => {
    //request remove cartItem to backend
    const res = await fetch(`${process.env.NEXT_PUBLIC_ENDPOINT}/cartitems/${cartItemId}`, {
      method: 'DELETE',
    });

    if (!res.ok) {
      console.log('Error deleting cart item');
      return;
    }
    const data: {
      _id: string;
      cartId: string;
      productId: string;
      quantity: number;
    } = await res.json();

    //remove from cart
    const removedCartItems = cartItems.filter((item) => item.cartItemId !== data._id);
    setCart(removedCartItems);
  };

  const syncToBackend = async (item: CartItem) => {
    console.log('Sending to backend:', item.quantity);

    const res = await fetch(`${process.env.NEXT_PUBLIC_ENDPOINT}/cartitems/update`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        cartId,
        productId: item.productId,
        quantity: item.quantity,
      }),
    });

    if (!res.ok) {
      console.log('Error updating item');
      return;
    }

    const data = await res.json();
  };

  const updateQuantity = (cartItemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    // Update store
    const updatedItems = cartItems.map((item) =>
      item.cartItemId === cartItemId ? { ...item, quantity: newQuantity } : item,
    );
    setCart(updatedItems);

    // Save which item changed
    const changedItem = updatedItems.find((i) => i.cartItemId === cartItemId);
    lastChangedItemRef.current = changedItem || null;

    // Clear old timer and start new one
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      if (lastChangedItemRef.current) {
        syncToBackend(lastChangedItemRef.current);
      }
    }, 2000);
  };

  const reduceQty = (item: CartItem) => {
    updateQuantity(item.cartItemId, item.quantity - 1);
  };

  const increaseQty = (item: CartItem) => {
    updateQuantity(item.cartItemId, item.quantity + 1);
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_ENDPOINT}/cartItems/${cartId}`);

      if (!res.ok) {
        console.log('Error fetching data');
        return;
      }
      const data: CartItemReturn[] = await res.json();
      const mappedDate = data.map((item) => ({
        cartItemId: item._id,
        productId: item.productId._id,
        image: item.productId.image,
        name: item.productId.name,
        price: item.productId.price,
        stock: item.productId.stock,
        cartId: item.cartId,
        quantity: item.quantity,
      })) as CartItem[];
      setCart(mappedDate);
    };
    if (cartId) {
      fetchData();
    }
  }, [cartId, setCart]);

  return (
    <div className="w-full max-w-250">
      <div className="py-2 w-fit">
        <Link href="/products" className="flex gap-2 items-center">
          <MdOutlineKeyboardArrowLeft className="text-lg" />
          <span className="underline">Continue Shopping</span>
        </Link>
      </div>

      <div>
        <h2 className="py-6 text-3xl border-b border-[rgba(0,143,171,0.5)]">Shopping Bag</h2>

        {cartItems.map((item) => (
          <div
            key={`cartItem-${item.cartItemId}`}
            className="py-4 px-4 md:px-8 flex gap-6 border-b border-[rgba(0,143,171,0.5)]"
          >
            <Image
              src={`/assets/shine_studio_images/${item.image}`}
              width={200}
              height={150}
              alt={item.name.slice(0, 10)}
              className="h-33 md:h-50 aspect-square my-auto"
            />

            <div className="w-[90%] lg:py-4">
              <div className="flex justify-between pb-6">
                <div className="w-[65%] max-w-[380px] w-auto text-sm md:text-[18px]">
                  {item.name}
                </div>

                <RiCloseLargeLine
                  onClick={() => removeFromCart(item.cartItemId)}
                  className="text-lg text-[#008FAB] cursor-pointer"
                />
              </div>

              <div className="flex justify-between pb-6">
                <div className="flex items-center border border-[#008FAB] p-1">
                  <button
                    type="button"
                    className="px-3 py-1 cursor-pointer"
                    onClick={() => reduceQty(item)}
                  >
                    -
                  </button>
                  <div>{item.quantity}</div>
                  <button
                    type="button"
                    className="px-3 py-1 cursor-pointer"
                    onClick={() => increaseQty(item)}
                  >
                    +
                  </button>
                </div>

                <div>$ {item.price}</div>
              </div>

              <div className="underline cursor-pointer" onClick={() => addToWishList(item)}>
                Save for Later
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShoppingBagList;
