'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import './Tournament.scss';
import { cookies } from 'next/headers';
import { SlEvent } from 'react-icons/sl';
import { MdLocationOn } from 'react-icons/md';
import { formatDate } from '../../../../lib/client';
import CardWrapper from '../../../card-wrapper/CardWrapper';
import { FaHourglassStart, FaHourglassEnd } from 'react-icons/fa';
import { GrStatusInfo } from 'react-icons/gr';
import { TbFileDescription } from 'react-icons/tb';
import { TbTournament } from 'react-icons/tb';
import { RiTeamLine } from 'react-icons/ri';
import { GiChampions } from 'react-icons/gi';

import Group from '../Group/Group';
import BracketGenerator from '../BracketGenerator/BracketGenerator';
import Link from 'next/link';

const lists = ['Översikt', 'Matcher', 'Grupper', 'Slutspel'];
function Tournament({ data }: any) {
  const {
    name,
    location,
    status,
    startDate,
    endDate,
    total_teams,
    description,
    format,
    matches,
    groups,
    playoff,
  } = data.tournament;
  const [activeIndex, setActiveIndex] = useState(0);

  const handleOnClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <CardWrapper>
      <div className="tournament-container">
        <div className="tournament-container__overview">
          <Image
            src="/IFK_Uppsala_logo.svg.png"
            height={60}
            width={60}
            alt="IFk"
          />

          <div className="tournament-container__overview__details">
            <div>
              <TbTournament />
              <p>{name}</p>
            </div>

            <div>
              <SlEvent />
              <p>{formatDate(startDate)}</p>
            </div>

            <div>
              <MdLocationOn />
              <p>{location}</p>
            </div>
          </div>
        </div>
        <div className="tournament-container__information">
          <ul>
            {lists.map((list, index) => (
              <li
                key={list}
                className={`${activeIndex === index && 'active'}`}
                onClick={() => handleOnClick(index)}
              >
                {list}
              </li>
            ))}
          </ul>
        </div>
        {activeIndex === 0 && (
          <TournamentOverviewDetails
            name={name}
            description={description}
            location={location}
            status={status}
            startDate={startDate}
            endDate={endDate}
            teams_participating={groups}
            total_teams={total_teams}
            format={format}
          />
        )}
        {activeIndex === 1 && <Matches matches={matches} />}
        {activeIndex === 2 && <Groups groups={groups} />}
        {activeIndex === 3 && <BracketGenerator playoff={playoff[0].playoff} />}
      </div>
    </CardWrapper>
  );
}

export default Tournament;

function TournamentOverviewDetails({
  name,
  description,
  location,
  status,
  startDate,
  endDate,
  teams_participating,
  total_teams,
  format,
}) {
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
      <div className="tournament-overview-details__teams-participating">
        <div className="tournament-overview-details__teams-participating__title">
          <GiChampions />
          <p>Lag medverkar:</p>
        </div>
        <div className="tournament-overview-details__teams-participating__teams">
          {teams_participating.map((group) =>
            group.teams.map((team) => <p key={team.name}>{team.name},</p>)
          )}
        </div>
      </div>
    </div>
  );
}

function Matches({ matches }) {
  console.log(matches);
  return (
    <div className="matches-container">
      {matches.map((match) => (
        <Link
          href={`/dashboard/match/${match._id}`}
          key={match.match_id}
          className="matches-container__match"
        >
          <div className="matches-container__match__info">
            <p className="matches-container__match__info--status">
              {match.status === 'ongoing' ? 'Live' : ''}
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

function Groups({ groups }) {
  return (
    <div>
      <Group data={groups} />
    </div>
  );
}
