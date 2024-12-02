import Stripe from 'stripe';
import { formatPrice } from '../../../../lib/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function getCheckoutSessionById(id: string) {
  const session = await stripe.checkout.sessions.retrieve(id);

  return {
    id: session.id,
    status: session.status,
    payment_status: session.payment_status,
    amount_total: formatPrice(session?.amount_total!),
    customer_email: session.customer_details?.email,
    created: session.created,
    currency: session.currency,
  };
}
