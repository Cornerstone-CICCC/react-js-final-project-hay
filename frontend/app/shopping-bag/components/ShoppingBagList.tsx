'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md';
import { RiCloseLargeLine } from 'react-icons/ri';
import { product } from '@/app/products/dummy';
import type { Product } from '@/app/types/products.type';
import { useClickAway } from '@uidotdev/usehooks';

interface CartItem extends Product {
  cartItemId: string;
  quantity: number;
}

const ShoppingBagList = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);//this need to be repalce with store
  const [activeItem, setActiveItem] = useState<CartItem| null>(null)
  const ref = useRef<HTMLDivElement|null>(null)

  const addToWishList = async(item: CartItem) => {
    console.log(item)
    //add it to wish list

    //remove from cart
    await removeFromCart(item.cartItemId)

  };

  const removeFromCart =async(cartItemId: string)=>{
    //remove from cart 
    setCartItems(prev=>prev.filter(item=>item.cartItemId!==cartItemId))

    //request remove cartItem to backend
  }

  const reduceQty = (item:CartItem) => {
    if(item.quantity===1){
      return
    }

    const newQty = item.quantity-1
    setCartItems(prev=>{
      const updatedCartItems = [...prev]
      const existingItem = updatedCartItems.find((i)=>i._id === item._id)

      if(existingItem){
        existingItem.quantity = newQty
      }
      return updatedCartItems
    })

  };

  const increaseQty =(item:CartItem)=>{
    const newQty = item.quantity+1
    setCartItems(prev=>{
      const updatedCartItems = [...prev]
      const existingItem = updatedCartItems.find((i)=>i._id === item._id)

      if(existingItem){
        existingItem.quantity = newQty
      }
      return updatedCartItems
    })
  }

  const handleQuantity =async(item:CartItem)=>{

  }

  useEffect(() => {
    const newCartItem: CartItem = {
      ...product,
      _id: '1',
      cartItemId: '23',
      quantity: 1,
    };
    const newCartItem2: CartItem = {
      ...product,
      price:2000,
      _id: '2',
      cartItemId: '232',
      quantity: 1,
    };
    setCartItems((prev) => [...prev, newCartItem, newCartItem2]);
  }, []);

  useEffect(()=>{
    function handleClickOutside(e:MouseEvent){
      if(activeItem && ref.current && !ref.current.contains(e.target as Node)){
        console.log('Clicked outside, active item was:', activeItem);
        handleQuantity(activeItem)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return ()=>document.removeEventListener("mousedown", handleClickOutside)
  },[activeItem])

  return (
    <div className="w-full max-w-250">
      <div
      className='py-2'>
        <Link href="/products" className="flex gap-2 items-center">
          <MdOutlineKeyboardArrowLeft className="text-lg" />
          <span className="underline">Continue Shopping</span>
        </Link>
      </div>

      <div>
        <h2 className="py-6 text-3xl border-b border-[rgba(0,143,171,0.5)]">Shopping Bag</h2>

        {cartItems.map((item) => (
          <div
            key={item._id}
            ref ={activeItem?._id === item._id?ref : null}
            className="py-4 px-4 md:px-8 flex gap-6 border-b border-[rgba(0,143,171,0.5)]"
          >
            <Image
              src={item.image}
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
                onClick={()=>setActiveItem(item)}>
                  <button
                  type='button'
                  className="px-3 py-1 cursor-pointer"
                  onClick={()=>reduceQty(item)}>-</button>
                  <div>{item.quantity}</div>
                  <button 
                  type='button'
                  className="px-3 py-1 cursor-pointer"
                  onClick={()=>increaseQty(item)}>+</button>
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
