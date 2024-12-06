import React, { Suspense } from 'react';

import CheckoutSession from '../../components/checkout-session/CheckoutSession';

function page() {
  return (
    <Suspense>
      <CheckoutSession />;
    </Suspense>
  );
}

export default page;
