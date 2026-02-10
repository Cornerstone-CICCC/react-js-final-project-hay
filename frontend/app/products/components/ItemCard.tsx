'use client'
import { PiHeartThin, PiHandbagThin  } from "react-icons/pi";

import { Product } from "@/app/types/products.type"
import Image from "next/image"
import { useRouter } from "next/navigation";

type Props = {
    product:Product
}

const ItemCard = ({product}: Props) => {
    const router = useRouter()
    //should have isInCart and isInWishlist to 
    const handleAddCart=()=>{
    }
    const handleAddWishList=()=>{
    }

    const directItemPage=()=>{
        router.push(`/products/${product._id}`)
    }
  return (
    <div
    className="w-fit justify-self-center py-6">
        <Image
        src={product.image}
        width={250}
        height={250}
        alt={`${product.name.slice(0, 10)}`}
        className="cursor-pointer"
        onClick={directItemPage}
        />
        <div
        className="py-2 w-[250px]"
        >
            <div
            className="text-[15px]">
                {product.name}
            </div>
            <div
            className="flex justify-between w-full text-[20px] pt-2">
                <div
                className="font-bold">$ {product.price}</div>

                <div
                className="flex gap-2 items-center">
                    <PiHeartThin
                    onClick={handleAddWishList}/>
                    <PiHandbagThin 
                    onClick={handleAddCart}/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ItemCard