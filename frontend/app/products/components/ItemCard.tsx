'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { PiHandbagSimpleFill, PiHandbagThin, PiHeartFill, PiHeartThin } from 'react-icons/pi';
import type { Product } from '@/app/types/products.type';

type Props = {
  product: Product;
};

const ItemCard = ({ product }: Props) => {
  const router = useRouter();
  const [isLiked, setIsLiked] = useState(false);
  const [isInBag, setIsInBag] = useState(false);
  //should have isInCart and isInWishlist to
  const handleToggleCart = () => {
    setIsInBag((prev) => !prev);
  };
  const handleToggleWishList = () => {
    setIsLiked((prev) => !prev);
  };

  const directItemPage = () => {
    router.push(`/products/${product._id}`);
  };
  return (
    <div className="w-fit justify-self-center py-6">
      <Image
        src={product.image}
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
              {isLiked ? <PiHeartFill className="text-[#008FAB]" /> : <PiHeartThin />}
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
