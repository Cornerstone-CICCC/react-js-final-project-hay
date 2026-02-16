import { stripe } from '@/app/lib/stripe';
import { NextRequest, NextResponse } from 'next/server';


export async function POST(request: NextRequest) {
  try {
    const { amount } = await request.json();

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount || 1400,
      currency: 'cad',
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return NextResponse.json({ 
      clientSecret: paymentIntent.client_secret 
    });
  } catch (error: any) {
    console.error('Payment Intent Creation Error:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}