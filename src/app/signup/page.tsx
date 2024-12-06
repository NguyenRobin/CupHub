import React, { Suspense } from 'react';
import SignUpForm from '../../features/users/components/forms/signup-form/SignUpForm';
import LoadingSpinner from '../../components/ui/loading-spinner/LoadingSpinner';

function SignUpPage() {
  <Suspense fallback={<LoadingSpinner size={40} />}>
    <SignUpForm />
  </Suspense>;
}

export default SignUpPage;
