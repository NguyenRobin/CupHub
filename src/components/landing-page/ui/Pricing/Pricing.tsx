import React from 'react';
import PriceCard from './PriceCard/PriceCard';
import PriceList from './PriceList/PriceList';
import './Pricing.scss';

function Pricing() {
  return (
    <section className="pricing-container" id="payments">
      <section className="pricing-container__title">
        <h2>Välj den perfekta planen för er organisation</h2>
        <p>
          Våra prisplaner erbjuder något för alla, från grundläggande funktioner
          för små team till avancerade verktyg för stora organisationer. Hitta
          den plan som passar just dig!
        </p>
      </section>

      <section className="pricing-container__cards">
        <PriceCard title="Gratis Plan" price="0 kr/Månad">
          <PriceList text="Skapa en tunering" />
          <PriceList text="En användare" />
          <PriceList text="Begränsad lagring" />
          <PriceList text="Grundläggande support" />
        </PriceCard>

        <PriceCard title="Månads Plan" price="249 kr/Månad">
          <PriceList
            text="Full tillgång till alla
                  funktioner"
          />
          <PriceList text="En användare" />
          <PriceList text="Obegränsat antal användare" />
          <PriceList text="Obegränsad lagring" />
          <PriceList text="Prioriterad support" />
          <PriceList
            text="Tillgång till gemenskap och
                  forum"
          />
          <PriceList text="Riskfri: 15 dagars återbetalningsperiod" />
        </PriceCard>

        <PriceCard title="Årlig Plan" price="999 kr/År">
          <PriceList
            text="Spara 34% jämfört med den
                  månatliga planen"
          />
          <PriceList
            text="Full tillgång till alla
                  funktioner"
          />
          <PriceList text="Obegränsat antal användare" />
          <PriceList text="Obegränsad lagring" />
          <PriceList text="Prioriterad support" />
          <PriceList
            text="Tillgång till gemenskap och
                  forum"
          />
          <PriceList text="Riskfri: 15 dagars återbetalningsperiod" />
        </PriceCard>

        <PriceCard title="Specifik funktion" price="250 kr/Funktion">
          <PriceList
            text="Köp specifika
                  premiumfunktioner en gång"
          />
          <PriceList
            text="Livstidstillgång till köpta
                  funktioner"
          />
          <PriceList
            text=" Tillgång till relevanta
                  uppdateringar"
          />
          <PriceList
            text="Riskfri: 15 dagars
                  återbetalningsperiod"
          />
        </PriceCard>
      </section>
    </section>
  );
}

export default Pricing;
