'use client'
import { PiHeartThin  } from "react-icons/pi";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { Product } from "@/app/types/products.type"
import Image from "next/image"
import { useState } from "react";


type Props = {
    product:Product
}

const ItemDetail = ({product}: Props) => {
    const [quantity, setQuantity]= useState<number>(1)
    const [isStock, setIsStock] = useState(true)

  return (
    <div className="md:flex gap-8 p-6 justify-center">
        <Image
        src={product.image}
        width={350}
        height={350}
        alt={`${product.name.slice(0,10)}`}
        className="justify-self-center lg:w-[500]"/>

        <div
        className="flex flex-col gap-4 pt-4 lg:w-[45%]">
            <div className="flex items-center justify-end gap-4">
                <PiHeartThin
                className="text-[18px]"/>
                Add to Wishlist
            </div>

            <div className="text-xl md:text-[30px] ">
                {product.name}
            </div>
            <div>
                Free Size
            </div>
            <div className="flex justify-between">
                <div className="font-bold text-2xl md:text-[40px] flex flex-col">
                    $ {product.price}
                    <span
                    className="text-xs font-medium">(Incl. taxes and charges)</span>
                </div>

                {isStock?
                <div
                className="flex items-center gap-2">
                    <IoIosCheckmarkCircleOutline
                    className="text-[#2DC84A] text-[18px]"/>
                    In stock - ready to ship
                </div>:
                <div>
                    Out of Stock
                </div>}
            </div>

            <div className="text-[#008FAB] flex justify-between text-[16px]">
                <div className="flex items-center border border-[#008FAB]">
                    <button
                    className="px-4 py-2 cursor-pointer"
                    onClick={()=>
                        setQuantity(prev=>{
                            if(prev===1) return 1
                            return prev-1
                        })
                    }>
                        -</button>
                    <div>
                        {quantity}
                    </div>
                    <button
                    className="px-4 py-2 cursor-pointer"
                    onClick={()=>setQuantity(prev=>prev+1)}>+</button>
                </div>

                <div>
                    Add to Bag
                </div>

            </div>
        </div>


    </div>
  )
}

export default ItemDetail