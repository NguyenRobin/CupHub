'use client';

import React from 'react';
import './checkout-page.scss';
import { loadStripe } from '@stripe/stripe-js';

import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from '@stripe/react-stripe-js';
import NavBar from '../landing-page/ui/NavBar/NavBar';

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error('NEXT_PUBLIC_STRIPE_PUBLIC_KEY is NOT defined');
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export function StripeEmbeddedCheckout({ fetchClientSecret }: any) {
  const options = { fetchClientSecret };

  return (
    <div>
      <NavBar />
      <div className="checkout-content">
        <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
          <EmbeddedCheckout className="embedded-checkout" />
        </EmbeddedCheckoutProvider>
      </div>
    </div>
  );
}
