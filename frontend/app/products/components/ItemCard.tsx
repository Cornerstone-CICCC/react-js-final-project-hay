'use client';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import { PiHandbagSimpleFill, PiHandbagThin, PiHeartFill, PiHeartThin } from 'react-icons/pi';
import { useAuthStore } from '@/app/store/auth.store';
import { type CartItem, useCartStore } from '@/app/store/cart.store';
import useSocketStore from '@/app/store/socket.store';
import { useWishlistStore, type WishItem } from '@/app/store/wishlist.store';
import type { Product } from '@/app/types/products.type';
import toast from 'react-hot-toast';
import Link from 'next/link';

interface CartItemReturn {
  _id: string;
  cartId: string;
  productId: Product;
  quantity: number;
}

interface WishlistsReturnType {
  userId: string;
  productId: Product;
  _id: string;
}
type Props = {
  product: Product;
};

const ItemCard = ({ product }: Props) => {
  //zustand
  const likedItem = useSocketStore((state) => state.likedItem);
  const user = useAuthStore((state) => state.user);
  const cartId = useCartStore((state) => state.cartId);
  const setCart = useCartStore((state) => state.setCart);
  const cartItems = useCartStore((state) => state.cartItems);
  const wishItems = useWishlistStore((state) => state.wishItems);
  const setWishlist = useWishlistStore((state) => state.setWishlist);
  const removeWishItem = useWishlistStore((state) => state.removeWishItem);

  const [isInBag, setIsInBag] = useState<CartItem | null>(null);

  useEffect(() => {
    const found = cartItems.find((item) => item.productId === product._id);

    if (found) {
      setIsInBag(found);
    }
  }, [product]);

  const handleToggleCart = async () => {
    if(!user){
      toast.custom((t) => (
        <div
          className={` max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex`}
        >
          <div
          className='py-4 px-6 justify-self-center flex-1'>
            Please 
            <Link
            href="/login"
            className='px-2 font-bold underline'>Login or Signup</Link>
            to shop
          </div>
          <div className="flex border-l border-gray-200">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="cursor-pointer w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium"
            >
              Close
            </button>
          </div>
        </div>
      ),{duration:1500})
      return
    }
    if (product.stock === 0) return;

    if (isInBag) {
      await removeFromCart(isInBag);
      setIsInBag(null);
    } else {
      const newCartItem = await addToCart();
      setIsInBag(newCartItem ? newCartItem : null);
    }
  };

  const addToCart = async () => {
    //api request
    const res = await fetch(`${process.env.NEXT_PUBLIC_ENDPOINT}/cartitems/update`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        cartId,
        productId: product._id,
        quantity: 1,
      }),
    });

    if (!res.ok) {
      console.log('Error making order');
      return;
    }
    const data = (await res.json()) as CartItemReturn;

    //update store
    const newCartItem: CartItem = {
      cartItemId: data._id,
      productId: data.productId._id,
      image: data.productId.image,
      name: data.productId.name,
      price: data.productId.price,
      stock: data.productId.stock,
      cartId: data.cartId,
      quantity: data.quantity,
    };
    const newCart = [...cartItems, newCartItem];

    setCart(newCart);
    return newCartItem;
  };

  const removeFromCart = async (foundItem: CartItem) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_ENDPOINT}/cartitems/${foundItem.cartItemId}`,
      {
        method: 'DELETE',
      },
    );

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
  const handleToggleWishList = async () => {

    if(!user){
      toast.custom((t) => (
        <div
          className={` max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex`}
        >
          <div
          className='py-4 px-6 justify-self-center flex-1'>
            Let's  
            <Link
            href="/login"
            className='px-2 font-bold underline'>become a member</Link>
            to use wishlist feature
          </div>
          <div className="flex border-l border-gray-200">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="cursor-pointer w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium"
            >
              Close
            </button>
          </div>
        </div>
      ),{duration:1500})
      return
    }
    //check if wish exist
    const find = wishItems.find((item) => item.productId === product._id);

    if (find) {
      //remove
      removeFromWishList(find);
    } else {
      await addToWishList();
    }
  };

  const addToWishList = async () => {
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
        productId: product._id,
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
  };

  const removeFromWishList = async (wishItem: WishItem) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_ENDPOINT}/wishlists/${wishItem.wishlistId}`,
      {
        method: 'DELETE',
      },
    );
    if (!res.ok) {
      console.log('error deleting wish item');
      return;
    }

    const data = await res.json();
    console.log(data);
    removeWishItem(wishItem.productId);
  };

  const directItemPage = () => {
    redirect(`/products/${product._id}`);
  };
  return (
    <div className="w-fit justify-self-center py-6 relative">
      {product.stock == 0 && (
        <div className="bg-black/30 absolute top-0 w-full h-full flex justify-center items-center">
          <div className="font-bold text-white text-xl">Out of Stock</div>
        </div>
      )}
      <Image
        src={`/assets/shine_studio_images/${product.image}`}
        width={250}
        height={250}
        alt={`${product.name.slice(0, 10)}`}
        className="cursor-pointer"
        onClick={directItemPage}
      />
      <div className="py-2 w-[250px]">
        <div className="text-[15px]">{product.name}</div>
        <div className="flex justify-between w-full text-[20px] pt-2">
          <div className="font-bold">$ {product.price}</div>

          <div className="flex gap-2 items-center">
            <div className="cursor-pointer" onClick={handleToggleWishList}>
              {wishItems.find((item) => item.productId === product._id) !== undefined ? (
                <PiHeartFill className="text-[#008FAB]" />
              ) : (
                <PiHeartThin />
              )}
            </div>

            <div className="cursor-pointer" onClick={handleToggleCart}>
              {isInBag ? <PiHandbagSimpleFill className="text-[#008FAB]" /> : <PiHandbagThin />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
