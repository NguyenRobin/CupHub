import React, { Suspense } from 'react';
import LoginForm from '../../features/users/components/forms/login-form/LoginForm';
import LoadingSpinner from '../../components/ui/loading-spinner/LoadingSpinner';

function LoginHomePage() {
  return (
    <Suspense fallback={<LoadingSpinner size={40} />}>
      <LoginForm />
    </Suspense>
  );
}

export default LoginHomePage;
