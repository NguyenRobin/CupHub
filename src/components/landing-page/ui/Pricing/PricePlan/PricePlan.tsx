import React from 'react';
import './PricePlan.scss';
type Props = {
  title: string;
  price: string;
  optionalText?: string;
  description: string;
  children: React.ReactNode;
};
function PricePlan({
  title,
  price,
  optionalText,
  description,
  children,
}: Props) {
  return (
    <section className="price-plan">
      <section className="price-plan__information">
        <section className="price-plan__price">
          <h4>
            {title} <span style={{ fontSize: '1rem' }}>{optionalText}</span>
          </h4>
          <h2>
            {`${price.split('/')[0]}`}
            <span className="price-plan__price--subscription">{`/ ${
              price.split('/')[1]
            }`}</span>
          </h2>

          <p>{description}</p>
        </section>

        <ul className="price-plan__children">{children}</ul>
      </section>
    </section>
  );
}

export default PricePlan;
