'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { IoIosCheckmarkCircleOutline } from 'react-icons/io';
import { PiHeartThin } from 'react-icons/pi';
import type { Product } from '@/app/types/products.type';
import { socket } from '@/app/socket';

type Props = {
  product: Product;
};

const ItemDetail = ({ product }: Props) => {

  const [quantity, setQuantity] = useState<number>(1);
  const [isLiked, setIsLiked] = useState(false);
  const [isInBag, setIsInBag] = useState(false);

  useEffect(() => {
    //set liked and in bag
    const socketData = {
      productId:product._id,
      userId:"1"
    }
    socket.emit('shopProduct',(socketData))
  }, []);

  return (
    <>
      <div className="md:flex gap-8 p-6 justify-center">
        <Image
          src={product.image}
          width={350}
          height={350}
          alt={`${product.name.slice(0, 10)}`}
          className="justify-self-center lg:w-[500]"
        />

        <div className="flex flex-col gap-4 pt-4 lg:w-[45%]">
          <div className="flex items-center justify-end gap-4">
            <PiHeartThin className="text-[18px]" />
            Add to Wishlist
          </div>

          <div className="text-xl md:text-[30px] ">{product.name}</div>
          <div>Free Size</div>
          <div className="flex justify-between">
            <div className="font-bold text-2xl md:text-[40px] flex flex-col">
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
                className="px-6 py-2 cursor-pointer"
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
                className="px-6 py-2 cursor-pointer"
                onClick={() => setQuantity((prev) => prev + 1)}
              >
                +
              </button>
            </div>

            <div className="w-full text-center border border-[#008FAB] self-center py-2 hover:bg-[#008FAB] hover:text-white">
              Add to Bag
            </div>
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
