'use client';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import AnimatedCheckIcon from '../ui/animatedCheckIcon/AnimatedCheckIcon';
import './CheckoutSession.scss';
import LoadingSpinner from '../ui/loading-spinner/LoadingSpinner';
function CheckoutSession() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<any>({
    id: '',
    status: '',
    amount_total: '',
    created: '',
    currency: '',
    customer_email: '',
    payment_status: '',
  });
  const searchParams = useSearchParams();
  const session_id = searchParams.get('session_id')!;

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/session_status/${session_id}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const session = await response.json();
      setData(session.session);
      setLoading(false);
    };
    fetchData();
  }, []);

  const {
    id,
    status,
    amount_total,
    created,
    currency,
    customer_email,
    payment_status,
  } = data;

  console.log(id);
  console.log(data);

  return (
    <div className="checkout-session">
      {isLoading ? (
        <div style={{ marginTop: 'auto', marginBottom: 'auto' }}>
          <LoadingSpinner size={40} />
        </div>
      ) : (
        <div className="checkout-session__wrapper">
          <div className="checkout-session__status">
            <AnimatedCheckIcon />
            <p>Klart! Din betalning har mottagits.</p>
          </div>

          <div className="checkout-session__payment-details">
            <p>Betalningsmetod:</p>

            <div className="checkout-session__summary">
              <div className="checkout-session__info">
                <p>Transaktions ID</p>
                <p>{id.slice(20, 30)}</p>
              </div>

              <div className="checkout-session__info">
                <p>Datum</p>
                <p>{created}</p>
              </div>

              <div className="checkout-session__info">
                <p>Totalt</p>
                <p>{amount_total} SEK</p>
              </div>

              <div className="checkout-session__info">
                <p>Status</p>
                <p>{payment_status === 'paid' ? 'Betald' : ''}</p>
              </div>
              <div className="checkout-session__info">
                <p>Email</p>
                <p>{customer_email}</p>
              </div>
            </div>
          </div>

          <div className="checkout-session__total">
            <p>Totalt</p>
            <p>{amount_total} SEK</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default CheckoutSession;
