'use client'
import { RiCloseLargeLine } from "react-icons/ri";
import { product } from "@/app/products/dummy"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Product } from "@/app/types/products.type";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";

interface CartItem extends Product{
    cartItemId: string,
    quantity:number
}

const ShoppingBagList = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([])

    const addToWishList =(productId:string)=>{

    }

    const removeFromCart =(cartItemId:string)=>{

    } 


    useEffect(()=>{
        const newCartItem :CartItem = {
            ...product,
            _id:"1",
            cartItemId:"23",
            quantity:1
        }
        setCartItems(prev=>[
            ...prev,
            newCartItem
        ])
    },[])
  return (
    <div className="w-full max-w-250">
        <div>
            <Link
            href="/products"
            className="flex gap-2 items-center">
                <MdOutlineKeyboardArrowLeft
                className="text-lg"/>
                <span
                className="underline">
                    Continue Shopping</span>
                
            </Link>
        </div>

        <div>
            <h2
            className="py-6 text-3xl border-b border-[rgba(0,143,171,0.5)]">
                Shopping Bag
            </h2>

            {cartItems.map(item=>(
            <div
            key={item._id}
            className="py-4 px-4 md:px-8 flex gap-6 border-b border-[rgba(0,143,171,0.5)]">
                <Image
                src={item.image}
                width={200}
                height={150}
                alt={item.name.slice(0,10)}
                className="h-33 md:h-50 aspect-square my-auto"
                />

                <div className="w-[90%] lg:py-4">
                    <div
                    className="flex justify-between pb-6">
                        <div
                        className="w-[65%] max-w-[380px] w-auto text-sm md:text-[18px]">
                            {item.name}
                        </div>

                        <RiCloseLargeLine
                        onClick={()=>removeFromCart(item.cartItemId)}
                        className="text-lg text-[#008FAB] cursor-pointer"/>
                    </div>

                    <div
                    className="flex justify-between pb-6">
                        <div className="flex items-center border border-[#008FAB]">
                            <button
                            className="px-3 py-1 cursor-pointer"
                        >
                            -</button>
                            <div>
                                {item.quantity}
                            </div>
                            <button
                            className="px-3 py-1 cursor-pointer">+</button>
                        </div>

                        <div>
                            $ {item.price}
                        </div>
                    </div>

                    <div
                    className="underline cursor-pointer"
                    onClick={()=>addToWishList(item._id)}>
                        Save for Later
                    </div>
                </div>


            </div>
            ))
            }
        </div>
    </div>
  )
}

export default ShoppingBagList