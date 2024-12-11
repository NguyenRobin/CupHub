import { cookies } from 'next/headers';
import EventSelection from './EventSelection/EventSelection';
import './DashboardOverview.scss';
import UpcomingEvents from './UpcomingEvents/UpcomingEvents';
import LiveMatches from './LiveMatches/LiveMatches';
import UpcomingMatches from './UpcomingMatches/UpcomingMatches';
import CardWrapper from '../../../ui/card-wrapper/CardWrapper';
import { Suspense } from 'react';
import { getMatchesByStatus } from '../../../../features/matches/server/actions/match';

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

  const results = await Promise.allSettled([
    getMatchesByStatus('ongoing', 3),
    getMatchesByStatus('scheduled', 3),
  ]);

  const ongoingMatches =
    results[0].status === 'fulfilled' ? results[0].value : { matches: [] };
  const upcomingMatches =
    results[1].status === 'fulfilled' ? results[1].value : { matches: [] };

  const { tournaments, username } = overview?.data;
  const liveMatches = ongoingMatches?.matches;
  const scheduledMatches = upcomingMatches?.matches;

  return (
    <section className="overview">
      <section className="overview__welcome-text">
        <h1>Välkommen, {username}! 👋</h1>
      </section>

      <section className="overview__widgets">
        <Suspense fallback={<p>LOADING CHILDREN............</p>}>
          <UpcomingEvents events={tournaments} />
          <EventSelection />

          <LiveMatches matches={liveMatches} />

          <UpcomingMatches matches={scheduledMatches} />

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
  );
}

export default DashboardOverview;
