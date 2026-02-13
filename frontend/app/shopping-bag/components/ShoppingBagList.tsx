'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md';
import { RiCloseLargeLine } from 'react-icons/ri';
import type { Product } from '@/app/types/products.type';
import { CartItem, useCartStore } from '@/app/store/cart.store';
import { useAuthStore } from '@/app/store/auth.store';
import { useWishlistStore, WishItem } from '@/app/store/wishlist.store';
import { redirect } from 'next/navigation';



interface WishlistsReturnType{
  userId:string,
  productId:Product,
  _id:string,
}

interface CartItemReturn{
  _id:string,
  cartId:string,
  productId:Product,
  quantity:number
}

const ShoppingBagList = () => {
  const user =useAuthStore(state=>state.user)
  const cartId = useCartStore(state=>state.cartId)
  const cartItems = useCartStore(state=>state.cartItems)
  const setCart = useCartStore(state=>state.setCart)
  const wishItems = useWishlistStore(state=>state.wishItems)
  const setWishlist= useWishlistStore(state=>state.setWishlist)
  const [data, setData] = useState<CartItem[]>([])
  const [activeItem, setActiveItem] = useState<CartItem | null>(null);
  const ref = useRef<HTMLDivElement | null>(null);

  if(!user){
    redirect("/login")
  }

  const addToWishList = async (item: CartItem) => {
    
    if(!user){
      console.log("User not exist")
      return
    }
    //add it to wish list
    const res = await fetch(`${process.env.NEXT_PUBLIC_ENDPOINT}/wishlists`,{
      method:"POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId:user.id,
        productId:item.productId
      })
    })

    const data: WishlistsReturnType = await res.json()
    
    const newWishItems :WishItem[]=[
      ...wishItems,
      {
        wishlistId: data._id??"",
        productId: data.productId._id??"",
        image: data.productId.image??"",
        name: data.productId.name??"",
        price: data.productId.price??"",
      }
    ]

    setWishlist(newWishItems)

    //remove from cart
    await removeFromCart(item.cartItemId);
  };

  const removeFromCart = async (cartItemId: string) => {
    //request remove cartItem to backend
    const res = await fetch(`${process.env.NEXT_PUBLIC_ENDPOINT}/cartitems/${cartItemId}`,{
      method:"DELETE"
    })

    if(!res.ok){
      console.log("Error deleting cart item")
      return
    }
    const data = await res.json()
    console.log(data)

    //remove from cart
    const removedCartItems = cartItems.filter(item=>item.cartItemId!==cartItemId)
    setCart(removedCartItems)
  };

  const reduceQty = (item: CartItem) => {
    console.log(item)
    if (item.quantity === 1) {
      return;
    }
    const newQty = item.quantity - 1;

    let updatedCartItems = [...cartItems];
    let existingItem = updatedCartItems.find((i) => i.cartItemId === item.cartItemId);

    if (existingItem) {
      existingItem ={
          cartItemId: existingItem.cartItemId,
          productId: existingItem.productId,
          image: existingItem.image,
          name: existingItem.name,
          price: existingItem.price,
          stock: existingItem.stock,
          cartId: existingItem.cartId,
          quantity: newQty
      } as CartItem
    }

    setCart(updatedCartItems)

  };

  const increaseQty = (item: CartItem) => {
    const newQty = item.quantity + 1;

    let updatedCartItems = [...cartItems];
    let existingItem = updatedCartItems.find((i) => i.cartItemId === item.cartItemId);

    if (existingItem) {
      existingItem ={
          cartItemId: existingItem.cartItemId,
          productId: existingItem.productId,
          image: existingItem.image,
          name: existingItem.name,
          price: existingItem.price,
          stock: existingItem.stock,
          cartId: existingItem.cartId,
          quantity: newQty
      } as CartItem
    }

    setCart(updatedCartItems)
  };

  const handleQuantity = async (item: CartItem) => {
    console.log("Sending to backend")
  };


  useEffect(() => {
    const fetchData = async ()=>{
      const res = await fetch(`${process.env.NEXT_PUBLIC_ENDPOINT}/cartItems/${cartId}`)

      if(!res.ok){
        console.log("Error fetching data")
        return
      }
      const data:CartItemReturn[]= await res.json()
      const mappedDate= data.map(item=>({
          cartItemId: item._id,
          productId: item.productId._id,
          image: item.productId.image,
          name: item.productId.name,
          price: item.productId.price,
          stock: item.productId.stock,
          cartId: item.cartId,
          quantity: item.quantity
      })) as CartItem[]
      setData(mappedDate)
    }
    fetchData()
  }, [data]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (activeItem && ref.current && !ref.current.contains(e.target as Node)) {
        console.log('Clicked outside, active item was:', activeItem);
        handleQuantity(activeItem);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [activeItem]);

  return (
    <div className="w-full max-w-250">
      <div className="py-2">
        <Link href="/products" className="flex gap-2 items-center">
          <MdOutlineKeyboardArrowLeft className="text-lg" />
          <span className="underline">Continue Shopping</span>
        </Link>
      </div>

      <div>
        <h2 className="py-6 text-3xl border-b border-[rgba(0,143,171,0.5)]">Shopping Bag</h2>

        {data.map((item) => (
          <div
            key={item.cartItemId}
            ref={activeItem?.cartItemId === item.cartItemId ? ref : null}
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
                <div
                  className="flex items-center border border-[#008FAB] p-1"
                  onClick={() => setActiveItem(item)}
                >
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
