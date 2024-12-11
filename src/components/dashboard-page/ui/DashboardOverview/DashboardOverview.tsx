import { cookies } from 'next/headers';
import EventSelection from './EventSelection/EventSelection';
import './DashboardOverview.scss';
import UpcomingEvents from './UpcomingEvents/UpcomingEvents';
import LiveMatches from './LiveMatches/LiveMatches';
import UpcomingMatches from './UpcomingMatches/UpcomingMatches';
import CardWrapper from '../../../ui/card-wrapper/CardWrapper';
import { Suspense } from 'react';

async function getDashboardOverview() {
  const token = (await cookies()).get(process.env.TOKEN_NAME!);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Cookie: `${process.env.TOKEN_NAME}=${token?.value}`,
      },
    }
  );

  const data = await response.json();
  return data;
}

async function DashboardOverview() {
  const overview = await getDashboardOverview();

  if (overview.status !== 200) {
    return <p>{overview.message}</p>;
  }
  const { tournaments, username } = overview?.data;

  return (
    <Suspense fallback={<p>Loading ALL DASHBORD CONTENT............🚀</p>}>
      <section className="overview">
        <section className="overview__welcome-text">
          <Suspense fallback={<p>Loading USERNAME............</p>}>
            <h1>Välkommen, {username}! 👋</h1>
          </Suspense>
        </section>

        <section className="overview__widgets">
          <Suspense fallback={<p>LOADING OVERVIEW............</p>}>
            <UpcomingEvents events={tournaments} />
            <EventSelection />

            <LiveMatches />

            {/* <UpcomingMatches /> */}

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
          </Suspense>
        </section>
      </section>
    </Suspense>
  );
}

export default DashboardOverview;
