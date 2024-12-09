import React, { Suspense } from 'react';
import LoginForm from '../../features/users/components/forms/login-form/LoginForm';
import LoadingSpinner from '../../components/ui/loading-spinner/LoadingSpinner';

function LoginHomePage() {
  return (
    <Suspense
      fallback={
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
      }
    >
      <LoginForm />
    </Suspense>
  );
}

export default LoginHomePage;
