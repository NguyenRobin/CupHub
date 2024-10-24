'use client';

import React from 'react';
import { FormProvider } from '../../../../context/FormContext';
import NewTournamentForm from '../../../../features/tournaments/components/forms/NewTournamentForm/NewTournamentForm';

const page = () => {
  return (
    <FormProvider>
      <NewTournamentForm />
    </FormProvider>
  );
};

export default page;
