import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripeSecret = process.env.STRIPE_SECRET_KEY;
const publishable = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
const priceCents = parseInt(process.env.PRICE_CENTS || '497', 10);

// Instantiate the Stripe client lazily.  Doing this outside of the handler
// avoids recreating the client on every request which can be expensive.
const stripe = stripeSecret
  ? new Stripe(stripeSecret, { apiVersion: '2023-10-16' })
  : null;

export async function POST() {
  if (!stripe) {
    return NextResponse.json({ error: 'Stripe is not configured.' }, { status: 500 });
  }
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Jedi Path Destiny',
              description: 'Unlock your full Jedi destiny',
            },
            unit_amount: priceCents,
          },
          quantity: 1,
        },
      ],
      success_url: `${siteUrl}/?paid=true`,
      cancel_url: `${siteUrl}/?canceled=true`,
    });
    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error('Stripe checkout error:', err);
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 });
  }
}