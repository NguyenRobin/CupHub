import React from 'react';
import { AiOutlineLoading } from 'react-icons/ai';
import './LoadingSpinner.scss';
function LoadingSpinner({ size = 20 }: { size?: number }) {
  return (
    <div>
      <AiOutlineLoading className="loading-spinner" size={size} />
    </div>
  );
}

export default LoadingSpinner;
