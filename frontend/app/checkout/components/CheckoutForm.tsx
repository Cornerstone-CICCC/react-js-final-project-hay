'use client';

import { Elements, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { type Appearance, loadStripe } from '@stripe/stripe-js';
import { stat } from 'fs';
import { redirect } from 'next/navigation';
import { type SubmitEvent, useState } from 'react';
import { useAuthStore } from '@/app/store/auth.store';
import { useCartStore } from '@/app/store/cart.store';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);
interface Cart {
  _id: string;
  userId: string;
  status: 'active' | 'inactive';
}

const PaymentForm = () => {
  const url = process.env.NEXT_PUBLIC_FRONTEND_SERVER_URL;
  //old cartId
  const cartId = useCartStore((state) => state.cartId);
  const setCartId = useCartStore((state) => state.setCartId);
  const clearCart = useCartStore((state) => state.clearCart);
  const cartItems = useCartStore((state) => state.cartItems);

  const user = useAuthStore((state) => state.user);
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  //if user nor cart exist, direnct to
  if (!user || !cartId) {
    redirect('/login');
  }

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    console.log('payment process');
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    //deactive cart
    const res = await fetch(`${process.env.NEXT_PUBLIC_ENDPOINT}/carts/inactive`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: user.userId,
        cartId: cartId,
      }),
    });

    if (!res.ok) {
      console.log('Error deactivating cart');
      return;
    }
    const data: {
      inactiveCart: Cart;
      newCart: Cart;
      message: string;
    } = await res.json();
    console.log(data);

    //set new cartId to store
    setCartId(data.newCart._id);
    clearCart();
    console.log(cartItems);
    setIsLoading(false);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${url}/order-summary/${cartId}`,
      },
    });

    if (error.type === 'card_error' || error.type === 'validation_error') {
      setMessage(error.message as string);
    } else {
      setMessage('An unexpected error occurred.');
    }
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit} className="max-w-130 mx-auto">
      <h2 className="text-xl md:text-2xl text-center font-bold py-10 md:py-15">
        Payment Method & Details
      </h2>
      <PaymentElement id="payment-element" />
      <div className="py-15 px-6 flex justify-center">
        <button
          type="submit"
          className="w-fit px-15 py-3 bg-[#008FAB] rounded-2xl text-white text-lg cursor-pointer"
          disabled={isLoading || !stripe || !elements}
          id="submit"
        >
          <span id="button-text">{isLoading ? 'Processing' : 'Pay now'}</span>
        </button>
      </div>

      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
};

type Props = {
  clientSecret: string | null;
};

export default function CheckoutForm({ clientSecret }: Props) {
  if (!clientSecret) return;
  const appearance: Appearance = {
    theme: 'stripe',
  };
  return (
    <Elements stripe={stripePromise} options={{ appearance, clientSecret }}>
      <PaymentForm />
    </Elements>
  );
}
