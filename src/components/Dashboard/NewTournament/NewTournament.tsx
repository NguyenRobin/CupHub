"use client";

import AddTeam from "@/components/dashboard/AddTeam/AddTeam";
import GroupSettingsForm from "@/components/dashboard/GroupSettingsForm/GroupSettingsForm";
import TournamentInfo from "@/components/dashboard/TournamentInfo/TournamentInfo";
import useFormContext from "@/hooks/useFormContext";

function NewTournament() {
  const { page } = useFormContext();

  const pages = [
    <TournamentInfo key={1} />,
    <GroupSettingsForm key={2} />,
    <AddTeam key={3} />,
  ];

  return <>{pages[page]}</>;
}

export default NewTournament;
