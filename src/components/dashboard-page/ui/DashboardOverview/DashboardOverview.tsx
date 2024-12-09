import { cookies } from 'next/headers';
import EventSelection from './EventSelection/EventSelection';
import './DashboardOverview.scss';
import UpcomingEvents from './UpcomingEvents/UpcomingEvents';
import LiveMatches from './LiveMatches/LiveMatches';
import UpcomingMatches from './UpcomingMatches/UpcomingMatches';
import CardWrapper from '../../../ui/card-wrapper/CardWrapper';
import LoadingSpinner from '../../../ui/loading-spinner/LoadingSpinner';
import { Suspense } from 'react';
import { delay } from '../../../../lib/client';
import { redirect } from 'next/navigation';

async function getDashboardOverview() {
  const token = cookies().get('AUTH_SESSION_TOKEN');
  console.log(token);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard`,
    {
      cache: 'no-store',
      credentials: 'include',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Cookie: `${process.env.TOKEN_NAME}=${token?.value}`,
      },
    }
  );

  console.log(response);
  if (!response.ok) {
    redirect('/login');
  }

  const data = await response.json();

  return data;
}

async function DashboardOverview() {
  const overview = await getDashboardOverview();
  const { tournaments, username } = overview?.data;

  return (
    <Suspense
      fallback={
        <div
          style={{
            height: '100',
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
      <section className="overview">
        <section className="overview__welcome-text">
          <h1>Välkommen, {username}! 👋</h1>
        </section>

        <section className="overview__widgets">
          <UpcomingEvents events={tournaments} />
          <EventSelection />
          <LiveMatches />
          <UpcomingMatches />
          <CardWrapper>
            <h1>Betalningar</h1>
          </CardWrapper>
          <CardWrapper>
            <h1>Rekommenderade turneringar</h1>
          </CardWrapper>
          <CardWrapper>
            <h1>Turneringens tabellställning</h1>
          </CardWrapper>
          <CardWrapper>
            <h1>Nyheter och meddelanden</h1>
          </CardWrapper>
        </section>
      </section>
    </Suspense>
  );
}

export default DashboardOverview;
