'use client';

import React from 'react';
import CardWrapper from '../../../card-wrapper/CardWrapper';
import './Match.scss';
import { useRouter, usePathname } from 'next/navigation';

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

function Match({ match }: any) {
  const { homeTeam, awayTeam, status, _id } = match?.match;
  const router = useRouter();

  return (
    <CardWrapper>
      <div className="match">
        <div className="match__team">
          <div className="match__team--home">
            <p>H</p>
          </div>
          <p>{homeTeam.name}</p>
        </div>

        <div className="match__score">
          <div className="match__score--date">
            <p></p>
          </div>
          <div className="match__score--result">
            {status === 'scheduled' && <p>-</p>}
            {status === 'ongoing' && (
              <p>
                {homeTeam.score} - {awayTeam.score}
              </p>
            )}
            {status === 'completed' && (
              <p>
                {homeTeam.score} - {awayTeam.score}
              </p>
            )}
          </div>
          <div className="match__score--status">
            <p>{status === 'scheduled' && 'kommande'}</p>
            <p>{status === 'ongoing' && 'Live'}</p>
            <p>{status === 'completed' && 'Avslutad'}</p>
          </div>
        </div>

        <div className="match__team">
          <div className="match__team--away">
            <p>B</p>
          </div>
          <p>{awayTeam.name}</p>
        </div>
      </div>

      {/* THIS SHOULD LATER ONLY BE VISIBLY FOR THE ADIMIN/CREATOR OF TOURNAMENT ETC */}
      <div className="match-actions">
        <div className="match-actions__home">
          <button
            className="btn"
            onClick={() => {
              updateScore(_id, 'homeTeam', 1, '+');
              router.refresh();
            }}
          >
            <p>{homeTeam.name}</p>
            <br />
            <span>+1 mål</span>
          </button>
          <button
            className="btn"
            onClick={() => {
              updateScore(_id, 'homeTeam', 1, '-');
              router.refresh();
            }}
          >
            <p>{homeTeam.name}</p>
            <br />
            <span>-1 mål</span>
          </button>
        </div>

        <div className="match-actions__match">
          <button
            className="match-actions__match--start btn"
            onClick={() => updateStatus(_id, 'ongoing')}
          >
            Starta Match
          </button>

          <button
            className="match-actions__match--end btn"
            onClick={() => updateStatus(_id, 'completed')}
          >
            Avsluta Match
          </button>
        </div>

        <div className="match-actions__away">
          <button
            className="btn"
            onClick={() => {
              updateScore(_id, 'awayTeam', 1, '+');
              router.refresh();
            }}
          >
            <p>{awayTeam.name}</p>
            <br /> <span>+1 mål</span>
          </button>
          <button
            className="btn"
            onClick={() => {
              updateScore(_id, 'awayTeam', 1, '-');
              router.refresh();
            }}
          >
            <p>{awayTeam.name}</p>
            <br />
            <span>-1 mål</span>
          </button>
        </div>
      </div>
    </CardWrapper>
  );
}

export default Match;
