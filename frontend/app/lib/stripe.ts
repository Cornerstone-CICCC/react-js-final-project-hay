import 'server-only';

import Stripe from 'stripe';

console.log('🔑 Secret key value:', process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);
console.log('🔑 Is it defined?', !!process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
