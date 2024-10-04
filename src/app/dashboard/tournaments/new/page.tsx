"use client";

import React from "react";
import { FormProvider } from "../../../../context/FormContext";
import NewTournament from "../../../../components/dashboard-page/ui/NewTournament/NewTournament";

const page = () => {
  return (
    <FormProvider>
      <NewTournament />
    </FormProvider>
  );
};

export default page;
