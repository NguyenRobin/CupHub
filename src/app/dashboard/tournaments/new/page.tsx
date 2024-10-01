"use client";

import NewTournament from "@/components/dashboard/NewTournament/NewTournament";
import { FormProvider } from "@/context/FormContext";
import React from "react";

const page = () => {
  return (
    <FormProvider>
      <NewTournament />
    </FormProvider>
  );
};

export default page;
