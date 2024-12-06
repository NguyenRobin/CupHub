import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(request: NextRequest) {
  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [
        {
          price: 'price_1QMrw0AUvoU251McuFXUZXNt',
          quantity: 1,
        },
      ],
      ui_mode: 'embedded',
      return_url: `http://localhost:3000/checkout?session_id={CHECKOUT_SESSION_ID}`,
    });

    return NextResponse.json({
      status: 200,
      client_secret: session.client_secret,
    });
  } catch (error) {
    console.log('Error at api/stripe/checkout', error);
    return NextResponse.json({ message: 'no' });
  }
}
