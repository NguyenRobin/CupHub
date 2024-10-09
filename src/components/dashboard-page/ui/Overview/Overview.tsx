import { cookies } from "next/headers";
import EventSelection from "../EventSelection/EventSelection";
import UpcomingEvents from "../UpcomingEvents/UpcomingEvents";
import "./Overview.scss";

async function getDashboardOverview() {
  const token = cookies().get(process.env.TOKEN_NAME!);

  const response = await fetch("http://localhost:3000/api/dashboard", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Cookie: `${process.env.TOKEN_NAME}=${token?.value}`,
    },
  });

  const data = await response.json();
  return data;
}
async function Overview() {
  const overview = await getDashboardOverview();
  const { tournaments, username } = overview.data;

  return (
    <section className="overview">
      <section className="overview__welcome-text">
        <h1>Välkommen, {username}! 👋</h1>
      </section>

      <section className="overview__listing">
        <UpcomingEvents events={tournaments} />
        <EventSelection />
      </section>
    </section>
  );
}

export default Overview;
