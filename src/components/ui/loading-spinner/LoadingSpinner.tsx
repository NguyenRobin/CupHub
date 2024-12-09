import React from 'react';
import { AiOutlineLoading } from 'react-icons/ai';
import './LoadingSpinner.scss';

type Props = {
  size?: number;
  color?: string;
};
function LoadingSpinner({ size = 20, color }: Props) {
  return (
    <div>
      <AiOutlineLoading className="loading-spinner" size={size} color={color} />
    </div>
  );
}

export default LoadingSpinner;
