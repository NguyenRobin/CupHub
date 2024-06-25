"use client";
import Header from "@/components/Header";
import "./page.scss";
import Image from "next/image";
import planning from "../../public/planning.svg";

import { GoTrophy } from "react-icons/go";
import { TbTournament } from "react-icons/tb";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { IoIosContact } from "react-icons/io";
import { MdLiveTv } from "react-icons/md";
import { MdOutlinePayment } from "react-icons/md";
import { GrContact } from "react-icons/gr";
import Link from "next/link";
import { useState } from "react";

const dummyData = [
  {
    id: "tournament",
    icon: <GoTrophy className="icon" />,
    title: "Turneringsskapare",
    content:
      "Vår turneringsskapare låter dig skapa och hantera turneringar med några få klick. Anpassa format, regler och deltagarlistor enkelt och håll koll på all nödvändig information på ett ställe. Med ett användarvänligt gränssnitt blir det enkelt att organisera professionella turneringar.",
  },
  {
    id: "team-administration",
    icon: <MdOutlineAdminPanelSettings className="icon" />,
    title: "Lagadministration",
    content:
      "Hantera lagens information effektivt med vår lagadministrationsfunktion. Du kan enkelt lägga till, ta bort och redigera spelare och personal. Håll koll på kontaktinformation, betalningsstatus och andra viktiga detaljer för varje lag.",
  },
  {
    id: "players-information",
    icon: <IoIosContact className="icon" />,
    title: "Spelinformation",
    content:
      "Ge spelare och fans all nödvändig spelinformation direkt i appen. Från matchtider och platser till domarlistor och resultat - allt är lättillgängligt. Med pushnotiser håller alla sig uppdaterade med de senaste ändringarna.",
  },
  {
    id: "schedule",
    icon: <TbTournament className="icon" />,
    title: "Lottning av spelschema",
    content:
      "Slipp manuella misstag och spara tid med vår spelschemagenerator. Den automatiserar schemaläggningen baserat på dina inställningar och förutsättningar, vilket gör det enkelt att skapa rättvisa och balanserade spelscheman.",
  },
  {
    id: "live-tv",
    icon: <MdLiveTv className="icon" />,
    title: "Liveresultat",
    content:
      "Håll engagemanget uppe med liveresultat och uppdateringar i realtid. Följ matchens utveckling direkt i appen och ge fansen en upplevelse som om de vore på plats.",
  },
  {
    id: "payments",
    icon: <MdOutlinePayment className="icon" />,
    title: "Betalningshantering",
    content:
      "Hantera alla betalningar smidigt och säkert. Vår betalningshanteringsfunktion gör det enkelt att ta emot betalningar för turneringsavgifter, lagavgifter och annat. Du får en tydlig översikt över alla transaktioner och kan enkelt följa upp obetalda fakturor.",
  },
  {
    id: "communication",
    icon: <GrContact className="icon" />,
    title: "Kommunikation",
    content:
      "Förbättra kommunikationen med våra verktyg för meddelanden och notifikationer. Skicka viktiga meddelanden till hela laget eller specifika grupper och säkerställ att ingen missar viktig information. Med inbyggd chatt och e-postintegration blir kommunikationen smidigare än någonsin.",
  },
];

export default function HomePage() {
  const [scrollToElement, setScrollToElement] = useState<string | null>(null);

  function handleClick(event: React.SyntheticEvent) {
    event.preventDefault();
    const id = event.currentTarget.id;
    const element = document.getElementById(String(id)) as HTMLElement;
    const yOffset = -200;
    const y = element?.getBoundingClientRect()?.top + window.scrollY + yOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
    setScrollToElement(id);
  }

  function test(id: string) {
    setScrollToElement(id);
    const element = document.getElementById(String(id)) as HTMLElement;
    const yOffset = -200;
    const y = element?.getBoundingClientRect()?.top + window.scrollY + yOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  }

  return (
    <section className="wrapper">
      <Header />
      <main className="main-content">
        <section className="hero-banner">
          <section className="hero-banner__info">
            <h1>Skapa och hantera era turneringar enkelt!</h1>

            <section className="hero-banner__info-buttons">
              <button className="hero-banner__info-buttons-buy">Köp nu</button>
              <button className="hero-banner__info-buttons-demo">Demo</button>
            </section>
          </section>
        </section>

        {/* NEW SECTION */}
        <section className="idea-container">
          <section>
            <h2>Vår idé</h2>
            <p>
              En komplett lösning för er förening – samlar alla aktörer inom
              just er sport för enklare organisation och bättre tillgänglighet!
            </p>
            <Image src={planning} height={300} width={250} alt="Planning" />

            <button>Läs mer</button>
          </section>
        </section>

        {/* NEW SECTION */}
        <section className="features-container">
          <section>
            <h2>Funktioner</h2>
            <p>
              Skapa, hantera och marknadsför dina turneringar med några få
              klick.
            </p>
            <ul>
              {dummyData.map((feature) => (
                <li key={feature.id} onClick={() => test(feature.id)}>
                  <button>
                    {feature.icon}
                    {feature.title}
                  </button>
                </li>
              ))}
            </ul>
          </section>
        </section>

        {/* NEW SECTION */}
        <section className="feature-container">
          {dummyData.map((feature) => (
            <section
              key={feature.id}
              className={`feature-container_feature
                ${scrollToElement === feature.id ? "scroll-to-view" : ""}`}
              id={feature.id}
              onClick={handleClick}
            >
              <i className="icon">{feature.icon}</i>

              <section>
                <h2>{feature.title}</h2>
                <p>{feature.content}</p>
                {scrollToElement === feature.id && (
                  <Link href={feature.id}>Läs mer</Link>
                )}
              </section>
            </section>
          ))}
        </section>

        {/* NEW SECTION */}
        <section className="pricing-container">
          <section className="pricing-container">
            <h2>Välj den Perfekta Planen för Din Organisation</h2>
            <p>
              Våra prisplaner erbjuder något för alla, från grundläggande
              funktioner för små team till avancerade verktyg för stora
              organisationer. Hitta den plan som passar just dig!
            </p>
          </section>
        </section>

        {/* NEW SECTION */}
        <section className="testimonials">
          <section className="testimonials-slide">
            <section className="slide">
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/8/84/IFK_Uppsala_logo.svg"
                height={50}
                width={50}
                alt="ifk-uppsala-logo"
              />
              <p>Ifk Uppsala</p>
            </section>
            <section className="slide">
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/8/84/IFK_Uppsala_logo.svg"
                height={50}
                width={50}
                alt="ifk-uppsala-logo"
              />
              <p>Sirius</p>
            </section>
            <section className="slide">
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/8/84/IFK_Uppsala_logo.svg"
                height={50}
                width={50}
                alt="ifk-uppsala-logo"
              />
              <p>Dalkurd</p>
            </section>
            <section className="slide">
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/8/84/IFK_Uppsala_logo.svg"
                height={50}
                width={50}
                alt="ifk-uppsala-logo"
              />
              <p>Ik Uppsala</p>
            </section>
          </section>

          <section className="testimonials-slide">
            <section className="slide">
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/8/84/IFK_Uppsala_logo.svg"
                height={50}
                width={50}
                alt="ifk-uppsala-logo"
              />
              <p>Ifk Uppsala</p>
            </section>
            <section className="slide">
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/8/84/IFK_Uppsala_logo.svg"
                height={50}
                width={50}
                alt="ifk-uppsala-logo"
              />
              <p>Sirius</p>
            </section>
            <section className="slide">
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/8/84/IFK_Uppsala_logo.svg"
                height={50}
                width={50}
                alt="ifk-uppsala-logo"
              />
              <p>Dalkurd</p>
            </section>
            <section className="slide">
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/8/84/IFK_Uppsala_logo.svg"
                height={50}
                width={50}
                alt="ifk-uppsala-logo"
              />
              <p>Ik Uppsala</p>
            </section>
          </section>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="footer-container">
        <section>
          <h3>Om Oss</h3>
          <ul>
            <li>
              <Link href="/about-us">Vår Historia</Link>
            </li>
            <li>
              <Link href="/team">Teamet</Link>
            </li>
            <li>
              <Link href="/careers">Jobba med oss</Link>
            </li>
          </ul>
        </section>

        <section>
          <h3>Kontakt</h3>

          <ul>
            <li>
              <Link href="mailto:teamorganizer@example.com">
                info@teamorganizer.com
              </Link>
            </li>
          </ul>
        </section>
        <section>
          <h3>Support</h3>

          <ul>
            <li>
              <Link href="/support/faq">Vanliga frågor (FAQ)</Link>
            </li>
            <li>
              <Link href="/support/guides">Användarguider</Link>
            </li>
            <li>
              <Link href="/support/tech-support">Teknisk support</Link>
            </li>
            <li>
              <Link href="/support/feedback">Feedback</Link>
            </li>
          </ul>
        </section>

        <section>
          <h3>Sociala Medier</h3>
          <ul>
            <li>
              <Link href="https://www.facebook.com">Facebook</Link>
            </li>
            <li>
              <Link href="https://www.twitter.com">X</Link>
            </li>
            <li>
              <Link href="https://www.instagram.com">Instagram</Link>
            </li>
          </ul>
        </section>

        <section>
          <h3>Tjänster</h3>
          <ul>
            <li>
              <Link href="/services/tournament-management">
                Turneringshantering
              </Link>
            </li>
            <li>
              <Link href="/services/training-camps">Träningsläger</Link>
            </li>
            <li>
              <Link href="/services/payment-solutions">
                Betalningslösningar
              </Link>
            </li>
            <li>
              <Link href="/services/livescore">Livescore</Link>
            </li>
          </ul>
        </section>
        <section>
          <h3>Priser</h3>
          <ul>
            <li>
              <Link href="/pricing/plans">Prisplaner</Link>
            </li>
            <li>
              <Link href="/pricing/enterprise">Företagspriser</Link>
            </li>
            <li>
              <Link href="/pricing/discounts">Rabatter och Erbjudanden</Link>
            </li>
          </ul>
        </section>
      </footer>
    </section>
  );
}
