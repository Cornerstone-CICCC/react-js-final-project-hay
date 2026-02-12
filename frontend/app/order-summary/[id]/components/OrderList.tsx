'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { product } from '@/app/products/dummy';
import type { Product } from '@/app/types/products.type';

type Props = {};
interface OrderItem extends Product {
  qty: number;
}

const OrderList = (props: Props) => {
  const [orderList, setOrderList] = useState<OrderItem[]>([]);
  const [subtotal, setSubtotal] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [discount, setDiscount] = useState<number>(0);

  useEffect(() => {
    setOrderList([
      {
        ...product,
        _id: '1',
        qty: 2,
      },
    ]);
  }, []);

  useEffect(() => {
    const newSubtotal = orderList.reduce((acc, curr) => acc + curr.price * curr.qty, 0);

    setSubtotal(newSubtotal);
    let total: number = newSubtotal;
    if (discount > 0) {
      total -= discount;
    }

    setTotal(total);
  }, [orderList, discount]);

  return (
    <div className="md:w-[70%] max-w-225 mx-auto">
      <h2 className="font-bold text-2xl text-center">Order Summary</h2>
      <div className="p-6">
        {orderList.map((item) => (
          <div
            key={item._id}
            className="flex md:gap-20 gap-6 py-6 border-b border-[rgba(0,143,171,0.3)] "
          >
            <Image
              src={item.image}
              width={150}
              height={300}
              alt={item.name.slice(0, 10)}
              className="md:w-[250px]"
            />

            <div className="flex flex-col gap-20 h-full my-auto">
              <h2>{item.name}</h2>

              <div className="flex justify-between">
                <div>
                  Qty
                  <span className="ps-5">{item.qty}</span>
                </div>
                <div className="font-bold">$ {item.price * item.qty}</div>
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
