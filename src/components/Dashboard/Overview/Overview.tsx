import React from "react";
import UpcomingEvent from "../UpcomingEvent/UpcomingEvent";
import Event from "../Event/Event";
import "./Overview.scss";

function Overview() {
  return (
    <section className="overview">
      <section className="overview__welcome-text">
        <h1>Välkommen, Robin!</h1>
      </section>

      <section className="overview__listing">
        <UpcomingEvent />
        <Event />
      </section>
    </section>
  );
}

export default Overview;
