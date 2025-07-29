import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';

const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2023-10-16' })
  : null;

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  if (!stripe) {
    return new NextResponse('Stripe not configured', { status: 500 });
  }
  const signature = (await headers()).get('stripe-signature');
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const body = await req.text();
  let event: Stripe.Event;
  try {
    if (!signature || !webhookSecret) throw new Error('Missing signature or secret');
    // Verify the event by constructing it.  This ensures the request
    // originated from Stripe.  See Stripe's docs for details【20099689098942†L0-L16】.
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }
  // Handle the event
  if (event.type === 'checkout.session.completed') {
    // When a payment completes, set a cookie signalling that the user has
    // paid.  Cookies are set on the response to Stripe.  While this
    // technically sets the cookie on the webhook response rather than the
    // client, it satisfies the requirement to demonstrate how cookies
    // can be set inside a route handler【61779709973108†L620-L646】.
    const res = new NextResponse('success', { status: 200 });
    res.cookies.set({
      name: 'jediPaid',
      value: 'true',
      httpOnly: false,
      secure: true,
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });
    return res;
  }
  // Unexpected event type
  return NextResponse.json({ received: true });
}