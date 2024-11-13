import React from 'react';
import './PriceCard.scss';
type Props = {
  title: string;
  price: string;
  children: React.ReactNode;
};
function PriceCard({ title, price, children }: Props) {
  return (
    <section className="price-card">
      <section className="price-card__package">
        <section className="price-card__price">
          <h4>{title}</h4>
          <h2>{price}</h2>
        </section>

        <ul className="price-card__children">{children}</ul>
        <button className="price-card__btn">Välj plan</button>
      </section>
    </section>
  );
}

export default PriceCard;
