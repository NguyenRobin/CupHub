'use client';

import useFormContext from '../../../../../hooks/useFormContext';
import AddTeamForm from '../../../../teams/components/forms/AddTeamForm/AddTeamForm';
import GroupSettingsForm from '../../../../groups/components/forms/GroupSettingsForm/GroupSettingsForm';
import TournamentInfoForm from '../TournamentInfoForm/TournamentInfoForm';

function NewTournamentForm() {
  const { page } = useFormContext();

  const pages = [
    <TournamentInfoForm key={1} />,
    <GroupSettingsForm key={2} />,
    <AddTeamForm key={3} />,
  ];

  return <>{pages[page]}</>;
}

export default NewTournamentForm;
