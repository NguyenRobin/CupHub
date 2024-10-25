import Image from 'next/image';
import React from 'react';
import './Tournament.scss';
import { SlEvent } from 'react-icons/sl';
import { MdLocationOn } from 'react-icons/md';
import CardWrapper from '../../../../../components/ui/card-wrapper/CardWrapper';
import { TbTournament } from 'react-icons/tb';
import Link from 'next/link';
import { IoIosArrowRoundBack } from 'react-icons/io';
import ActiveTournamentDetailView from '../ActiveTournamentDetailView/ActiveTournamentDetailView';
import { dateFormatter } from '../../../../../lib/server';
import { getTournamentById } from '../../../server/actions/tournament';

async function Tournament({ tournamentId, children }: any) {
  const response = await getTournamentById(tournamentId);

  if (response.status !== 200) {
    return <p>{response.message}</p>;
  }

  const { name, location, startDate, _id } = response?.tournament;

  return (
    <CardWrapper>
      <Link href={'/dashboard'}>
        <IoIosArrowRoundBack size={25} />
      </Link>

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
              <p>{dateFormatter(startDate)}</p>
            </div>

            <div>
              <MdLocationOn />
              <p>{location}</p>
            </div>
          </div>
        </div>

        <ActiveTournamentDetailView tournamentId={_id.toString()} />

        <div className="tournament-container__children">{children}</div>
      </div>
    </CardWrapper>
  );
}

export default Tournament;
