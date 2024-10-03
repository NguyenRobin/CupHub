"use client";
import Event from "../Event/Event";
import "./Overview.scss";
import UpcomingEvents from "../UpcomingEvents/UpcomingEvents";
import { useEffect, useState } from "react";

function Overview() {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/api/tournaments")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  if (!data) return <p>No data</p>;

  return (
    <section className="overview">
      <section className="overview__welcome-text">
        <h1>Välkommen, Robin!</h1>
      </section>

      <section className="overview__listing">
        {isLoading ? <p>loading...</p> : <UpcomingEvents events={data} />}
        <Event />
      </section>
    </section>
  );
}

export default Overview;
