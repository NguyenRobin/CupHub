import React from 'react';
import PricePlan from './PricePlan/PricePlan';
import SubscriptionItem from './SubscriptionItem/SubscriptionItem';
import './Pricing.scss';
import Link from 'next/link';

const plans = [
  {
    label: 'Starter',
    value: '49 kr/månad',
    currency: 'SEK',
    href: '/checkout/subscription/free',
    description:
      'En prisvärd plan för att komma igång och skapa din första turnering enkelt.',
    package: [
      'Skapa en tunering',
      'En användare',
      'Begränsad lagring',
      'Grundläggande support',
    ],
  },
  {
    label: 'Pro',
    value: '199 kr/månad',
    currency: 'SEK',
    href: '/checkout/subscription/monthly',
    description:
      'Pro-planen ger full frihet med alla funktioner. Perfekt för föreningar.',
    package: [
      'Full tillgång till alla funktioner',
      '3 antal användare',
      'Obegränsad lagring',
      'Prioriterad support"',
      'Tillgång till gemenskap och forum',
      'Riskfri: 15 dagars återbetalningsperiod',
    ],
  },
  {
    label: 'Unlimited',
    value: '999 kr/år',
    currency: 'SEK',
    href: '/checkout/subscription/yearly',
    description:
      'Unlimited-planen ger maximal frihet med obegränsade användare, funktioner och support. Nu till ett rabatterat årspris.',
    package: [
      'Spara 34% jämfört med den månatliga planen',
      'Full tillgång till alla funktioner',
      'Obegränsat antal användare',
      'Obegränsad lagring',
      'Prioriterad support"',
      'Tillgång till gemenskap och forum',
      'Riskfri: 15 dagars återbetalningsperiod',
    ],
  },
];

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

      <section className="pricing-container__price-plans">
        {plans.map((plan) => {
          return (
            <PricePlan
              key={plan.label}
              title={plan.label}
              price={plan.value}
              optionalText={plan.label === 'Pro' ? '( Populärast )' : ''}
              description={plan.description}
            >
              {plan.package.map((item) => {
                return <SubscriptionItem key={item} item={item} />;
              })}

              <section className="pricing-container__action">
                <Link href={plan.href} className="pricing-container__btn">
                  Välj Plan
                </Link>
              </section>
            </PricePlan>
          );
        })}

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
