'use client';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import { PiHeartFill, PiHeartThin } from 'react-icons/pi';
import type { Product } from '@/app/types/products.type';
import type { WishList } from '@/app/types/wishList.types';

type Props = {
  item: WishList;
};

const WishiItem = ({ item }: Props) => {
  const [isLiked, setIsLiked] = useState<boolean>(true);
  const [isInBag, setIsInBag] = useState<boolean>(false);

  const handleToggleWishList = () => {
    setIsLiked(false);
  };

  const addToBag = (item: Product) => {};

  useEffect(() => {
    // const inBag = cartItems.find(t=>t.productId === item.productId._id)
    //if(inBag) setIsInBag(true)
  }, []);
  return (
    <div className="flex flex-col w-[70%] max-w-[300px] justify-center mx-auto md:pt-8">
      <Image
        width={250}
        height={250}
        src={item.productId.image}
        alt={item.productId.name.slice(0, 5)}
        className="pb-4 mx-auto w-full "
      />
      <div className="text-sm">{item.productId.name}</div>

      <div className="w-full flex justify-between py-4">
        <div className="font-bold">$ {item.productId.price}</div>
        <div className="cursor-pointer" onClick={handleToggleWishList}>
          {isLiked ? <PiHeartFill className="text-[#008FAB] text-lg" /> : <PiHeartThin />}
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
