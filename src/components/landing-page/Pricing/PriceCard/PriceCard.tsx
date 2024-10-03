import React from "react";
import "./PriceCard.scss";
type Props = {
  title: string;
  price: string;
  children: React.ReactNode;
};
function PriceCard({ title, price, children }: Props) {
  return (
    <section className="price-card">
      <section>
        <section>
          <h4>{title}</h4>
          <h2>{price}</h2>
        </section>
        <ul>{children}</ul>
        <button>Välj plan</button>
      </section>
    </section>
  );
}

export default PriceCard;
