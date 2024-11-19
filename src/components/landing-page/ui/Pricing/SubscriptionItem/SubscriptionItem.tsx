import React from 'react';
import { FaCheck } from 'react-icons/fa6';
import './SubscriptionItem.scss';

type Props = {
  item: string;
};

function SubscriptionItem({ item }: Props) {
  return (
    <li>
      <FaCheck className="check-icon" />
      {item}
    </li>
  );
}

export default SubscriptionItem;
