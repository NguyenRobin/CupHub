import Image from 'next/image';
import React, { Suspense } from 'react';
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
import DeleteTournamentBtn from '../DeleteTournamentBtn/DeleteTournamentBtn';
import { GiSoccerField } from 'react-icons/gi';
import LoadingSpinner from '../../../../../components/ui/loading-spinner/LoadingSpinner';

async function Tournament({ tournamentId, children }: any) {
  const response = await getTournamentById(tournamentId);

  if (response.status !== 200) {
    return <p>{response.message}</p>;
  }

  const { name, location, startDate, _id } = response?.tournament;

  return (
    <Suspense
      fallback={
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <LoadingSpinner size={40} />
        </div>
      }
    >
      <CardWrapper>
        <div className="actions">
          <Link href={'/dashboard'}>
            <IoIosArrowRoundBack size={25} />
          </Link>
          <DeleteTournamentBtn name={name} id={_id.toString()} />
        </div>

        <div className="tournament-container">
          <div className="tournament-container__overview">
            <GiSoccerField size={80} color="#006774" />

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
    </Suspense>
  );
}

export default Tournament;
