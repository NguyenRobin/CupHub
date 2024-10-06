import Event from "../Event/Event";
import "./Overview.scss";
import UpcomingEvents from "../UpcomingEvents/UpcomingEvents";

function Overview() {
  return (
    <section className="overview">
      <section className="overview__welcome-text">
        <h1>Välkommen, Robin!</h1>
      </section>

      <section className="overview__listing">
        {/* {isLoading ? <p>loading...</p> : <UpcomingEvents />} */}
        <UpcomingEvents />
        <Event />
      </section>
    </section>
  );
}

export default Overview;
