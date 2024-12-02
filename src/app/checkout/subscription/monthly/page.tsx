import { StripeEmbeddedCheckout } from '../../../../components/checkout-page/CheckoutPage';
import './Checkout.scss';

const CheckoutPage = async () => {
  const fetchClientSecret = async () => {
    'use server';
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/checkout_sessions`,
      { method: 'POST' }
    );
    const data = await response.json();
    return data.client_secret;
  };

  return (
    <div className="checkout">
      <StripeEmbeddedCheckout fetchClientSecret={fetchClientSecret} />
    </div>
  );
};
export default CheckoutPage;
