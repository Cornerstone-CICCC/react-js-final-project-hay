'use client';

import { Elements, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { type Appearance, loadStripe } from '@stripe/stripe-js';
import { type SubmitEvent, useState } from 'react';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

const PaymentForm = () => {
  const url = 'http://localhost:3000';
  //old cartId
  const id = '1';
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${url}/order-summary/${id}`,
      },
    });

    if (error.type === 'card_error' || error.type === 'validation_error') {
      setMessage(error.message as string);
    } else {
      setMessage('An unexpected error occurred.');
    }

    //send a api request to close cart

    //update new cartId to store

    setIsLoading(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" />
      <div className="py-15 px-6 flex justify-center">
        <button
          type='submit'
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
