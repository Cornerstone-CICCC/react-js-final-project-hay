import { stripe } from '@/app/lib/stripe';
import { NextResponse } from 'next/server';

export async function POST() {
  try {
    console.log('Creating payment intent...');
    console.log('Stripe key exists?', !!process.env.STRIPE_SECRET_KEY);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1400,
      currency: 'cad',
      automatic_payment_methods: {
        enabled: true,
      },
    });

    console.log('Payment intent created:', paymentIntent.id);

    return NextResponse.json({ 
      clientSecret: paymentIntent.client_secret 
    });
  } catch (error: any) {
    console.error('Payment Intent Creation Error:', error);
    console.error('Error details:', error.message, error.type);
    
    return NextResponse.json(
      { error: error.message || 'Failed to create payment intent' },
      { status: 500 }
    );
  }
}