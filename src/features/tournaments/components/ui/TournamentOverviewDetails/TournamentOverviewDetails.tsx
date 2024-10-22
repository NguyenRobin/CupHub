import { FaHourglassEnd, FaHourglassStart } from 'react-icons/fa6';
import { GrStatusInfo } from 'react-icons/gr';
import { MdLocationOn } from 'react-icons/md';
import { TbFileDescription, TbTournament } from 'react-icons/tb';
import { formatDate } from '../../../../../lib/client';
import { RiTeamLine } from 'react-icons/ri';
import './TournamentOverviewDetails.scss';

function TournamentOverviewDetails({
  name,
  description,
  location,
  status,
  startDate,
  endDate,
  total_teams,
  format,
}: any) {
  return (
    <div className="tournament-overview-details">
      <div className="tournament-overview-details__label">
        <TbTournament />
        <p>Namn: {name}</p>
      </div>
      <div className="tournament-overview-details__label">
        <TbFileDescription />
        <p>Beskrivning: {description}</p>
      </div>
      <div className="tournament-overview-details__label">
        <MdLocationOn />
        <p>Plats: {location}</p>
      </div>
      <div className="tournament-overview-details__label">
        <GrStatusInfo />
        <p>Status: {status === 'scheduled' ? 'Schemalagd' : ''}</p>
      </div>
      <div className="tournament-overview-details__label">
        <FaHourglassStart />
        <p>Startar: {formatDate(startDate)}</p>
      </div>
      <div className="tournament-overview-details__label">
        <FaHourglassEnd />
        <p>Slutar: {formatDate(endDate)}</p>
      </div>
      <div className="tournament-overview-details__label">
        <RiTeamLine />
        <p>Antalet lag: {total_teams}</p>
      </div>
      <div className="tournament-overview-details__label">
        <TbTournament />
        <p>
          Format:{' '}
          {format === 'group_stage_with_knockout' ? 'Gruppspel + Slutspel' : ''}
        </p>
      </div>
    </div>
  );
}
export default TournamentOverviewDetails;
