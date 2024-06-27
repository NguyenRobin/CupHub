import React from "react";
import "./HeroBanner.scss";

function HeroBanner() {
  return (
    <section className="hero-banner">
      <section className="hero-banner__info">
        <h1>Skapa och hantera era turneringar enkelt!</h1>

        <section className="hero-banner__info-buttons">
          <button className="hero-banner__info-buttons-buy">Köp nu</button>
          <button className="hero-banner__info-buttons-demo">Demo</button>
        </section>
      </section>
    </section>
  );
}

export default HeroBanner;
