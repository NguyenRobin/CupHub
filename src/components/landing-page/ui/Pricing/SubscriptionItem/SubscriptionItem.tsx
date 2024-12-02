import React from 'react';
import { GoCheckCircle } from 'react-icons/go';

import './SubscriptionItem.scss';

type Props = {
  item: string;
};

function SubscriptionItem({ item }: Props) {
  return (
    <li>
      <span>
        <GoCheckCircle className="check-icon" />
      </span>

      <p>{item}</p>
    </li>
  );
}

export default SubscriptionItem;
