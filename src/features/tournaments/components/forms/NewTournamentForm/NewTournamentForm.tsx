// 'use client';
import CardWrapper from '../../../../../components/ui/card-wrapper/CardWrapper';
import useFormContext from '../../../../../hooks/useFormContext';
import GroupSettingsForm from '../../../../groups/components/forms/GroupSettingsForm/GroupSettingsForm';
import AddTeamForm from '../../../../teams/components/forms/AddTeamForm/AddTeamForm';
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
