'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { IoIosCheckmarkCircleOutline } from 'react-icons/io';
import { PiHeartFill, PiHeartThin } from 'react-icons/pi';
import { useAuthStore } from '@/app/store/auth.store';
import { useCartStore } from '@/app/store/cart.store';
import useSocketStore from '@/app/store/socket.store';
import { useWishlistStore, type WishItem } from '@/app/store/wishlist.store';
import type { Product } from '@/app/types/products.type';
import Link from 'next/link';

type Props = {
  product: Product;
};
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

const ItemDetail = ({ product }: Props) => {
  const likedItem = useSocketStore((state) => state.likedItem);
  const user = useAuthStore((state) => state.user);
  const joinItem = useSocketStore((state) => state.joinItem);
  const leaveItem = useSocketStore((state) => state.leaveItem);
  const shopperCounter = useSocketStore((state) => state.shopperCounter);
  const setCart = useCartStore((state) => state.setCart);
  const cartId = useCartStore((state) => state.cartId);
  const cartItems = useCartStore((state) => state.cartItems);
  const setWishlist = useWishlistStore((state) => state.setWishlist);
  const wishItems = useWishlistStore((state) => state.wishItems);
  const removeWishItem = useWishlistStore((state) => state.removeWishItem);

  const [quantity, setQuantity] = useState<number>(1);
  // const [isLiked, setIsLiked] = useState<boolean>(false);

  const toggleWishList = async () => {
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

    //find matching item in wishlist
    const find = wishItems.find((item) => item.productId === product._id);

    if (find) {
      const res = await fetch(`${process.env.NEXT_PUBLIC_ENDPOINT}/wishlists/${find.wishlistId}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        console.log('Error removing wishlist');
        return;
      }

      const data = await res.json();
      console.log(data);

      removeWishItem(product._id);
    } else {
      console.log('adding to ');
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
      console.log(data);

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
    }
  };

  const addToCart = async () => {

    if(!user ||!cartId){
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
    //api request
    const res = await fetch(`${process.env.NEXT_PUBLIC_ENDPOINT}/cartitems/update`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        cartId,
        productId: product._id,
        quantity,
      }),
    });

    if (!res.ok) {
      console.log('Error adding items');
      return;
    }

    const data: CartItemReturn = await res.json();

    //updating store
    let updatedCartItems = [...cartItems];
    const existingItem = updatedCartItems.find((i) => i.cartItemId === data._id);

    if (existingItem) {
      existingItem.quantity = data.quantity;
    } else {
      updatedCartItems = [
        ...updatedCartItems,
        {
          cartItemId: data._id,
          productId: data.productId._id,
          image: data.productId.image,
          name: data.productId.name,
          price: data.productId.price,
          stock: data.productId.stock,
          cartId: data.cartId,
          quantity: data.quantity,
        },
      ];
    }
    setCart(updatedCartItems);
    setQuantity(1);
    toast('Item added to your cart!',{
      duration:1500
    });
  };

  useEffect(() => {
    if (!user) return;
    //socket
    const socketData = {
      productId: product._id,
      userId: user.id,
    };

    joinItem(socketData);

    const handleChange = () => {
      if (document.hidden) {
        leaveItem(socketData);
      } else {
        joinItem(socketData);
      }
    };

    const handleBeforeUnload = () => {
      leaveItem(socketData);
    };

    document.addEventListener('handleChange', handleChange);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      leaveItem(socketData);
      document.removeEventListener('handleChange', handleChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [user,cartId]);

  return (
    <>
      <div
        className='md:hidden pt-6 text-white '>
            {(shopperCounter!== null&&shopperCounter>0)&&
            <div
            className='flex-1 px-6 py-2 bg-[rgba(34,34,34,0.84)] text-white'>
              {shopperCounter===1?"Only you are viewing this item right now":
              `You and other ${shopperCounter-1} ${shopperCounter === 2 ? 'person' : 'people'} are viewing this item right now.`}
            </div>
            }
      </div>

      <div className="md:flex gap-8 lg:gap-20 pt-8 lg:pt-10 px-6 justify-center">
        <Image
          src={`/assets/shine_studio_images/${product.image}`}
          width={350}
          height={350}
          alt={`${product.name.slice(0, 10)}`}
          className="justify-self-center lg:basis-120 aspect-square h-auto my-auto"
        />

        <div className="flex flex-col gap-4 pt-4 lg:w-[45%]">
          <div className="flex items-center justify-end gap-4">
            {wishItems.find((i) => i.productId === product._id) === undefined ? (
              <>
                <PiHeartThin
                onClick={() => toggleWishList()} className="text-[18px] cursor-pointer" />
                Add to Wishlist
              </>
            ) : (
              <>
                <PiHeartFill
                  onClick={() => toggleWishList()}
                  className="text-[18px] text-[#008FAB] cursor-pointer"
                />
                Item In Wishlist
              </>
            )}
          </div>

          <div className="text-xl lg:text-[28px] ">{product.name}</div>
          <div>Free Size</div>
          <div className="flex justify-between">
            <div className="font-bold text-2xl lg:text-[40px] flex flex-col">
              $ {product.price}
              <span className="text-xs font-medium">(Incl. taxes and charges)</span>
            </div>

            {product.stock > 0 ? (
              <div className="flex items-center gap-2">
                <IoIosCheckmarkCircleOutline className="text-[#2DC84A] text-[18px]" />
                In stock - ready to ship
              </div>
            ) : (
              <div>Out of Stock</div>
            )}
          </div>

          <div className="text-[#008FAB] flex gap-4 text-[16px] font-semibold">
            <div className="flex items-center border border-[#008FAB]">
              <button
                type="button"
                className={`px-6 py-2 cursor-pointer ${(quantity===1)&&"text-gray-200"}`}
                onClick={() =>
                  setQuantity((prev) => {
                    if (prev === 1) return 1;
                    return prev - 1;
                  })
                }
              >
                -
              </button>
              <div>{quantity}</div>
              <button
                type="button"
                className={`px-6 py-2 cursor-pointer ${(quantity===product.stock||!user)&&"text-gray-200"}`}
                onClick={() => setQuantity((prev) =>{
                  if(prev===product.stock ||!user) return prev
                  return prev + 1})}
              >
                +
              </button>
            </div>

            <div
              onClick={addToCart}
              className="w-full text-center border border-[#008FAB] self-center py-2 hover:bg-[#008FAB] hover:text-white"
            >
              Add to Bag
            </div>
          </div>
          
          <div
          className='hidden md:block md:pt-10 lg:pt-20'>
            {(shopperCounter!== null&&shopperCounter>0)&&
            <div
            className='flex-1 px-6 py-2 bg-[rgba(34,34,34,0.84)] text-white'>
              {shopperCounter===1?"Only you are viewing this item right now":
              `You and other ${shopperCounter-1} ${shopperCounter === 2 ? 'person' : 'people'} are viewing this item right now.`}
            </div>
            }
          </div>
        </div>
      </div>
      <div className="my-8 py-6 px-4 border-t border-b border-[rgba(0,143,171,0.5)] text-sm">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="font-bold text-[#008FAB] text-lg md:text-[20px] pb-4 ps-4">Description</h2>
          {product.description}
        </div>
      </div>
    </>
  );
};

export default ItemDetail;
