import React from 'react';
import './CardWrapper.scss';

type Props = {
  children: React.ReactNode;
};

function CardWrapper({ children }: Props) {
  return <div className="card-wrapper">{children}</div>;
}

export default CardWrapper;
