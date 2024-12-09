import React, { Suspense } from 'react';
import SignUpForm from '../../features/users/components/forms/signup-form/SignUpForm';
import LoadingSpinner from '../../components/ui/loading-spinner/LoadingSpinner';

function SignUpPage() {
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
      <SignUpForm />
    </Suspense>
  );
}

export default SignUpPage;
