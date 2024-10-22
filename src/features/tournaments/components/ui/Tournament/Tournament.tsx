'use client';
import Image from 'next/image';
import React from 'react';
import './Tournament.scss';
import { SlEvent } from 'react-icons/sl';
import { MdLocationOn } from 'react-icons/md';
import { formatDate } from '../../../../../lib/client';
import CardWrapper from '../../../../../components/ui/card-wrapper/CardWrapper';
import { TbTournament } from 'react-icons/tb';
import Link from 'next/link';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { usePathname } from 'next/navigation';

const lists = [
  { title: 'Översikt', url: '/dashboard/tournaments', endUrl: 'overview' },
  { title: 'Matcher', url: '/dashboard/tournaments', endUrl: 'matches' },
  { title: 'Grupper', url: '/dashboard/tournaments', endUrl: 'groups' },
  { title: 'Slutspel', url: '/dashboard/tournaments', endUrl: 'playoffs' },
  { title: 'Lag', url: '/dashboard/tournaments', endUrl: 'teams' },
];
function Tournament({ data, children }: any) {
  const { name, location, startDate, _id } = data?.tournament;

  const pathname = usePathname();

  const currentView = lists.find((list) =>
    pathname.includes(list.endUrl)
  )?.endUrl;

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
            {lists.map((list) => (
              <li
                key={list.title}
                className={`${list.endUrl === currentView ? 'active' : ''}`}
              >
                <Link href={`${list.url}/${_id}/${list.endUrl}`}>
                  {list.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="tournament-container__children">{children}</div>
      </div>
    </CardWrapper>
  );
}

export default Tournament;
