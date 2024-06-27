import React from "react";
import teamDummyData from "../../dummyData/data.json";
import Image from "next/image";
import "./Testimonials.scss";
function Testimonials() {
  return (
    <>
      <section className="testimonials">
        <section className="testimonials-slide">
          {teamDummyData.teams.map((team) => (
            <section key={team.id}>
              <Image src={team.logo} height={65} width={65} alt={team.name} />
              <p>{team.name}</p>
            </section>
          ))}
        </section>

        <section className="testimonials-slide">
          {teamDummyData.teams.map((team) => (
            <section key={team.id}>
              <Image src={team.logo} height={65} width={65} alt={team.name} />
              <p>{team.name}</p>
            </section>
          ))}
        </section>
      </section>
    </>
  );
}

export default Testimonials;
