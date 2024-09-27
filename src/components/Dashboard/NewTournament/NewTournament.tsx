"use client";

import AddTeam from "@/components/Dashboard/AddTeam/AddTeam";
import GroupSettingsForm from "@/components/Dashboard/GroupSettingsForm/GroupSettingsForm";
import TournamentInfo from "@/components/Dashboard/TournamentInfo/TournamentInfo";
import useFormContext from "@/hooks/useFormContext";

function NewTournament() {
  const { page } = useFormContext();
  const pages = [<TournamentInfo />, <GroupSettingsForm />, <AddTeam />];

  return <div>{pages[page]}</div>;
}

export default NewTournament;
