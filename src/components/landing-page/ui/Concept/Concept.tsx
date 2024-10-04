import React from "react";
import Image from "next/image";
import planning from "../../../../../public/planning.svg";
import "./Concept.scss";

function Concept() {
  return (
    <section className="idea-container">
      <section>
        <section className="idea-text">
          <h2>Vår idé</h2>
          <p>
            En komplett lösning för er förening – samlar alla aktörer inom just
            er sport för enklare organisation och bättre tillgänglighet!
          </p>
        </section>

        <section className="idea-cta">
          <Image src={planning} height={300} width={250} alt="Planning" />

          <button>Läs mer</button>
        </section>
      </section>
    </section>
  );
}

export default Concept;
