import Event from "../Event/Event";
import "./Overview.scss";
import UpcomingEvents from "../UpcomingEvents/UpcomingEvents";

function Overview() {
  const data = [];
  console.log(data.length);
  return (
    <section className="overview">
      <section className="overview__welcome-text">
        <h1>Välkommen, Robin!</h1>
      </section>

      <section className="overview__listing">
        <UpcomingEvents events={data} />
        <Event />
      </section>
    </section>
  );
}

export default Overview;
