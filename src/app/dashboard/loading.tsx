import React from 'react';
import LoadingSpinner from '../../components/ui/loading-spinner/LoadingSpinner';

function LoadingWrapper() {
  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <LoadingSpinner size={40} />
    </div>
  );
}

export default LoadingWrapper;
