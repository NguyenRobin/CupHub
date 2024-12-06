'use client';
import './ActiveTournamentDetailView.scss';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import React from 'react';
import { Types } from 'mongoose';

const lists = [
  { title: 'Översikt', url: '/dashboard/tournaments', endUrl: 'overview' },
  { title: 'Matcher', url: '/dashboard/tournaments', endUrl: 'matches' },
  { title: 'Grupper', url: '/dashboard/tournaments', endUrl: 'groups' },
  { title: 'Slutspel', url: '/dashboard/tournaments', endUrl: 'playoffs' },
  { title: 'Lag', url: '/dashboard/tournaments', endUrl: 'teams' },
];

function ActiveTournamentDetailView({
  tournamentId,
}: {
  tournamentId: Types.ObjectId;
}) {
  const pathname = usePathname();

  const currentView = lists.find((list) =>
    pathname.includes(list.endUrl)
  )?.endUrl;

  console.log(currentView);
  return (
    <div className="active-tournament-detail-view">
      <ul>
        {lists.map((list) => (
          <li
            key={list.title}
            className={`${list.endUrl === currentView ? 'active' : ''}`}
          >
            <Link href={`${list.url}/${tournamentId}/${list.endUrl}`}>
              {list.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ActiveTournamentDetailView;
