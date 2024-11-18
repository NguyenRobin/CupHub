import React from 'react';
import Image from 'next/image';
import planning from '../../../../../public/planning.svg';
import './Concept.scss';
import Link from 'next/link';

function Concept() {
  return (
    <section className="concept">
      <section className="concept__title">
        <h2>Vår idé</h2>
        <p>
          En komplett lösning för er förening – samlar alla aktörer inom just er
          sport för enklare organisation och bättre tillgänglighet!
        </p>
      </section>

      <section className="concept__cta">
        <Image src={planning} height={300} width={250} alt="Planning" />
      </section>

      <Link className="concept__link" href="#">
        Läs mer
      </Link>
    </section>
  );
}

export default Concept;
