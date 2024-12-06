'use client';

import { useRouter } from 'next/navigation';
import './AdminMatchPanel.scss';

async function updateStatus(id: string, status: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/matches/${id}/status`,
    {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: status }),
    }
  );

  if (!response.ok) {
    throw new Error('any');
  }

  const updatedStatus = await response.json();
  console.log('updatedStatus', updatedStatus);
  return updatedStatus;
}
async function updateScore(
  id: string,
  team: string,
  score: number,
  operator: '+' | '-'
) {
  const teamScored = team === 'homeTeam' ? 'homeTeam' : 'awayTeam';
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/matches/${id}/score`,
    {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ [teamScored]: score, operator: operator }),
    }
  );

  if (!response.ok) {
    throw new Error('any');
  }

  const updatedScore = await response.json();

  console.log('updatedScore', updatedScore);
  return updatedScore;
}

type Props = {
  homeTeamName: string;
  awayTeamName: string;
  matchId: any;
};
function AdminMatchPanel({ homeTeamName, awayTeamName, matchId }: Props) {
  const router = useRouter();

  const updateHomeTeamScore = async (operator: '+' | '-') => {
    const update = await updateScore(matchId, 'homeTeam', 1, operator);
    if (update) {
      router.refresh();
    }
  };

  const updateAwayTeamScore = async (operator: '+' | '-') => {
    const update = await updateScore(matchId, 'awayTeam', 1, operator);
    if (update) {
      router.refresh();
    }
  };

  const updateMatchStatus = async (
    id: string,
    status: 'scheduled' | 'ongoing' | 'paused' | 'completed'
  ) => {
    const matchStatus = await updateStatus(id, status);
    if (matchStatus) {
      router.refresh();
    }
  };

  return (
    <div className="match-actions">
      <div className="match-actions__home">
        <button onClick={() => updateHomeTeamScore('+')}>
          <p>{homeTeamName}</p>
          <br />
          <span>+1 mål</span>
        </button>
        <button onClick={() => updateHomeTeamScore('-')}>
          <p>{homeTeamName}</p>
          <br />
          <span>-1 mål</span>
        </button>
      </div>

      <div className="match-actions__match">
        <button
          className="match-actions__match--start"
          onClick={() => {
            updateMatchStatus(matchId, 'ongoing');
          }}
        >
          Starta Match
        </button>

        <button
          className="match-actions__match--end"
          onClick={() => {
            updateMatchStatus(matchId, 'completed');
          }}
        >
          Avsluta Match
        </button>
      </div>

      <div className="match-actions__away">
        <button
          className="btn"
          onClick={() => {
            updateAwayTeamScore('+');
          }}
        >
          <p>{awayTeamName}</p>
          <br /> <span>+1 mål</span>
        </button>
        <button
          className="btn"
          onClick={() => {
            updateAwayTeamScore('-');
          }}
        >
          <p>{awayTeamName}</p>
          <br />
          <span>-1 mål</span>
        </button>
      </div>
    </div>
  );
}

export default AdminMatchPanel;
