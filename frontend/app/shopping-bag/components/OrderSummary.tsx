'use client';

import { useAuthStore } from '@/app/store/auth.store';
import { useCartStore } from '@/app/store/cart.store';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';

const OrderSummary = () => {
  const user = useAuthStore(state=>state.user)
  const setCartId=useCartStore(state=>state.setCartId)
  const cartId = useCartStore(state=>state.cartId)
  const cartItems =useCartStore(state=>state.cartItems)
  const [total, setTotal] = useState<number>(0);
  const [subtotal, setSubTotal] = useState<number>(0);

  //calculate total from store
  useEffect(() => {
    const amount =cartItems.reduce((acc, curr)=>acc+= curr.price*curr.quantity,0)
    setSubTotal(amount)
    setTotal(amount)
  }, [JSON.stringify(cartItems)]);

  return (
    <div className="p-4 flex flex-col gap-4 justify-center">
      <h2 className="font-bold text-xl pb-2">Order Summary</h2>

      <div className="flex flex-col gap-4 pb-6 border-b border-[rgba(0,143,171,0.5)]">
        <div className="flex justify-between pb-2">
          <span className="font-bold">Subtotal</span>
          <span>$ {subtotal}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span>Complementary</span>
        </div>
      </div>

      <div className="font-bold py-6 flex justify-between">
        <span>Total</span>
        <span>$ {total}</span>
      </div>

      <Link
        href="/checkout"
        className="bg-[#008FAB] text-white text-center mt-3 px-6 py-2 rounded-xl"
      >
        Proceed to Checkout
      </Link>
      <div className="text-xs md:text-sm">
        *A complimentary Lillian shopping bag is included with every item.
      </div>
    </div>
  );
};

export default OrderSummary;
