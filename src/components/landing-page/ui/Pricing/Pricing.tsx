import React from 'react';
import PricePlan from './PricePlan/PricePlan';
import SubscriptionItem from './SubscriptionItem/SubscriptionItem';
import './Pricing.scss';
import Link from 'next/link';

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

      <section className="pricing-container__price-plan">
        <PricePlan title="Gratis Plan" price="0 kr/Månad">
          <SubscriptionItem item="Skapa en tunering" />
          <SubscriptionItem item="En användare" />
          <SubscriptionItem item="Begränsad lagring" />
          <SubscriptionItem item="Grundläggande support" />

          <section className="pricing-container__action">
            <Link href="/" className="pricing-container__btn">
              Välj Plan
            </Link>
          </section>
        </PricePlan>

        <PricePlan title="Månads Plan" price="249 kr/Månad">
          <SubscriptionItem
            item="Full tillgång till alla
                  funktioner"
          />
          <SubscriptionItem item="En användare" />
          <SubscriptionItem item="Obegränsat antal användare" />
          <SubscriptionItem item="Obegränsad lagring" />
          <SubscriptionItem item="Prioriterad support" />
          <SubscriptionItem
            item="Tillgång till gemenskap och
                  forum"
          />
          <SubscriptionItem item="Riskfri: 15 dagars återbetalningsperiod" />

          <section className="pricing-container__action">
            <Link
              href="/subscription-monthly"
              className="pricing-container__btn"
            >
              Välj Plan
            </Link>
          </section>
        </PricePlan>

        <PricePlan title="Årlig Plan" price="999 kr/År">
          <SubscriptionItem
            item="Spara 34% jämfört med den
                  månatliga planen"
          />
          <SubscriptionItem
            item="Full tillgång till alla
                  funktioner"
          />
          <SubscriptionItem item="Obegränsat antal användare" />
          <SubscriptionItem item="Obegränsad lagring" />
          <SubscriptionItem item="Prioriterad support" />
          <SubscriptionItem
            item="Tillgång till gemenskap och
                  forum"
          />
          <SubscriptionItem item="Riskfri: 15 dagars återbetalningsperiod" />

          <section className="pricing-container__action">
            <Link href="/" className="pricing-container__btn">
              Välj Plan
            </Link>
          </section>
        </PricePlan>

        {/* <PricePlan title="Specifik funktion" price="250 kr/Funktion">
          <SubscriptionItem
            item="Köp specifika
                  premiumfunktioner en gång"
          />
          <SubscriptionItem
            item="Livstidstillgång till köpta
                  funktioner"
          />
          <SubscriptionItem
            item=" Tillgång till relevanta
                  uppdateringar"
          />
          <SubscriptionItem
            item="Riskfri: 15 dagars
                  återbetalningsperiod"
          />
        </PricePlan> */}
      </section>
    </section>
  );
}

export default Pricing;
