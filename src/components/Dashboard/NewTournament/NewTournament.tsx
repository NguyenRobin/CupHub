"use client";

import useFormContext from "../../../hooks/useFormContext";
import AddTeam from "../AddTeam/AddTeam";
import GroupSettingsForm from "../GroupSettingsForm/GroupSettingsForm";
import TournamentInfo from "../TournamentInfo/TournamentInfo";

function NewTournament() {
  const { page } = useFormContext();

  const pages = [
    <TournamentInfo key={1} />,
    <GroupSettingsForm key={2} />,
    <AddTeam key={3} />,
  ];

  return <div>{pages[page]}</div>;
}

export default NewTournament;
