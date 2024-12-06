import Link from 'next/link';
import './ListTournamentMatches.scss';
import { getTournamentMatchesByID } from '../../../server/actions/match';
import Pulse from '../../../../../components/ui/pulse/Pulse';
import { TMatch } from '../../../../../types/types';

async function ListTournamentMatches({ matches }: { matches: TMatch[] }) {
  return (
    <div className="matches-container">
      {matches?.map((match) => (
        <Link
          href={`/dashboard/match/${match._id}`}
          key={match.match_id}
          className="matches-container__match"
        >
          <div className="matches-container__match__info">
            {match.status === 'ongoing' && <Pulse />}

            <p className={`matches-container__match__info--${match.status}`}>
              {match.status === 'ongoing' && 'Live'}
              {match.status === 'completed' && 'Avslutad'}
            </p>

            <div className="matches-container__match__info--name">
              <span>{match.homeTeam.name}</span>
              <span>{match.awayTeam.name}</span>
            </div>
          </div>

          <div className="matches-container__match__score">
            <span className={`${match.status === 'ongoing' && 'ongoing'}`}>
              {match.status === 'scheduled' ? '-' : match.homeTeam.score}
            </span>
            <span className={`${match.status === 'ongoing' && 'ongoing'}`}>
              {match.status === 'scheduled' ? '-' : match.awayTeam.score}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default ListTournamentMatches;
