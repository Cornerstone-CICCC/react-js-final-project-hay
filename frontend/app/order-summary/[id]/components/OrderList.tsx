'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { product } from '@/app/products/dummy';
import { useAuthStore } from '@/app/store/auth.store';
import { useCartStore } from '@/app/store/cart.store';
import type { Product } from '@/app/types/products.type';

type Props = {
  data: OrderItem[];
};
export interface OrderItem extends Product {
  quantity: number;
}

const OrderList = ({ data }: Props) => {
  const [subtotal, setSubtotal] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [discount, setDiscount] = useState<number>(0);

  const useId = useAuthStore((s) => s.user?.id);
  const cartId = useCartStore((setDiscount) => setDiscount.cartId);

  useEffect(() => {
    const newSubtotal = data.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);

    setSubtotal(newSubtotal);
    let total: number = newSubtotal;
    if (discount > 0) {
      total -= discount;
    }

    setTotal(total);
  }, [data, discount]);

  useEffect(() => {}, [useId, cartId]);

  return (
    <div className="md:w-[70%] max-w-225 mx-auto">
      <h2 className="font-bold text-2xl text-center">Order Confirmation</h2>
      <div className="p-6">
        {data.map((item) => (
          <div
            key={item._id}
            className="flex md:gap-20 gap-6 py-6 border-b border-[rgba(0,143,171,0.3)] "
          >
            <div className="basis-[250px]">
              <Image
                src={`/assets/shine_studio_images/${item.image}`}
                width={250}
                height={250}
                alt={item.name.slice(0, 10)}
                className="aspect-square"
              />
            </div>

            <div className="flex flex-col gap-20 h-full my-auto basis-43 sm:basis-120 lg:basis-250">
              <h2 className="text-[12px] sm:text-lg">{item.name}</h2>

              <div className="flex justify-between">
                <div>
                  Qty
                  <span className="ps-5">{item.quantity}</span>
                </div>
                <div className="font-bold">$ {item.price * item.quantity}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="px-6">
        <div className="pb-4 border-b border-[rgba(0,143,171,0.3)]">
          <div className="flex justify-between py-2 font-bold">
            <div>Subtotal</div>
            <div>$ {subtotal}</div>
          </div>
          <div className="flex justify-between py-2">
            <div>Promo Code</div>
            <div className="text-[#008FAB]">- $ {discount}</div>
          </div>
        </div>

        <div className="py-6 font-bold flex justify-between">
          <div>Total</div>
          <div>$ {total}</div>
        </div>
      </div>
    </div>
  );
};

export default OrderList;
