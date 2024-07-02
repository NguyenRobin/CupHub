import React from "react";
import "./HeroBanner.scss";
import Link from "next/link";

function HeroBanner() {
  return (
    <section className="hero-banner">
      <section className="hero-banner__info">
        <h1>Skapa och hantera era turneringar enkelt!</h1>

        <section className="hero-banner__info-buttons">
          <Link href="/" className="hero-banner__info-buttons-buy">
            Köp nu
          </Link>
          <Link href="/dashboard" className="hero-banner__info-buttons-demo">
            Demo
          </Link>
        </section>
      </section>
    </section>
  );
}

export default HeroBanner;
