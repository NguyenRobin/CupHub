import { cookies } from 'next/headers';
import EventSelection from '../EventSelection/EventSelection';
import UpcomingEvents from '../UpcomingEvents/UpcomingEvents';
import './Overview.scss';
import LiveMatches from '../LiveMatches/LiveMatches';
import UpcomingMatches from '../UpcomingMatches/UpcomingMatches';

async function getDashboardOverview() {
  const token = cookies().get(process.env.TOKEN_NAME!);

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

  if (!response.ok) {
    throw new Error('Dashboard could not be fetched');
  }

  const data = await response.json();
  
  return data;
}
async function Overview() {
  const overview = await getDashboardOverview();
  const { tournaments, username } = overview?.data;

  return (
    <section className="overview">
      <section className="overview__welcome-text">
        <h1>Välkommen, {username}! 👋</h1>
      </section>

      <section className="overview__listing">
        <UpcomingEvents events={tournaments} />
        <EventSelection />
        <LiveMatches />
        <UpcomingMatches />
      </section>
    </section>
  );
}

export default Overview;
