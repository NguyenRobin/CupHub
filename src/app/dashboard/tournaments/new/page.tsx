"use client";

import React from "react";
import NewTournament from "../../../../components/dashboard/NewTournament/NewTournament";
import { FormProvider } from "../../../../context/FormContext";

const page = () => {
  return (
    <FormProvider>
      <NewTournament />
    </FormProvider>
  );
};

export default page;
