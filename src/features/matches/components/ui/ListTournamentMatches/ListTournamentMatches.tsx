import Link from 'next/link';
import './ListTournamentMatches.scss';
import { getAllTournamentMatchesByID } from '../../../server/actions/match';

async function ListTournamentMatches({ tournamentId }: any) {
  const response = await getAllTournamentMatchesByID(tournamentId);

  if (response.status !== 200) {
    return <p>{response.message}</p>;
  }

  const { matches } = response;

  return (
    <div className="matches-container">
      {matches?.map((match) => (
        <Link
          href={`/dashboard/match/${match._id}`}
          key={match.match_id}
          className="matches-container__match"
        >
          <div className="matches-container__match__info">
            {match.status === 'ongoing' && <span className="pulse"></span>}

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
            <span>
              {match.status === 'scheduled' ? '-' : match.homeTeam.score}
            </span>
            <span>
              {match.status === 'scheduled' ? '-' : match.awayTeam.score}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default ListTournamentMatches;
