import React from 'react';
import './PricePlan.scss';
type Props = {
  title: string;
  price: string;
  children: React.ReactNode;
};
function PricePlan({ title, price, children }: Props) {
  return (
    <section className="price-plan">
      <section className="price-plan__information">
        <section className="price-plan__price">
          <h4>{title}</h4>
          <h2>{price}</h2>
        </section>

        <ul className="price-plan__children">{children}</ul>
      </section>
    </section>
  );
}

export default PricePlan;
