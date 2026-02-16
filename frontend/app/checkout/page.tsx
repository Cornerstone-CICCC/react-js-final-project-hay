'use client';

import { useEffect, useState } from 'react';
import CheckoutForm from './components/CheckoutForm';

export default function CheckoutPage() {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setClientSecret(data.clientSecret);
        }
      })
      .catch((err) => {
        console.error('Error creating payment intent:', err);
        setError('Failed to initialize payment');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="p-6 text-center">
        <p>Loading payment form...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-500">
        <p>Error: {error}</p>
      </div>
    );
  }

  if (!clientSecret) {
    return (
      <div className="p-6 text-center">
        <p>Initializing payment...</p>
      </div>
    );
  }

  return (
    <div id="checkout" className="p-6 md:px-15">
      <CheckoutForm clientSecret={clientSecret} />
    </div>
  );
}