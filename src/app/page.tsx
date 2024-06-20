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
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro, minima inventore nesciunt eos unde cum ab quas dignissimos alias exercitationem delectus neque cupiditate consectetur repellendus ipsam magni enim eveniet nemo harum vel, nisi ut nobis, ducimus et! Nobis deleniti tempora dignissimos sequi ratione consectetur fugit, at, commodi ex beatae consequatur.",
  },
  {
    id: "team-administration",
    icon: <MdOutlineAdminPanelSettings className="icon" />,
    title: "Lagadministration",
    content:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro, minima inventore nesciunt eos unde cum ab quas dignissimos alias exercitationem delectus neque cupiditate consectetur repellendus ipsam magni enim eveniet nemo harum vel, nisi ut nobis, ducimus et! Nobis deleniti tempora dignissimos sequi ratione consectetur fugit, at, commodi ex beatae consequatur.",
  },
  {
    id: "players-information",
    icon: <IoIosContact className="icon" />,
    title: "Spelinformation",
    content:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro, minima inventore nesciunt eos unde cum ab quas dignissimos alias exercitationem delectus neque cupiditate consectetur repellendus ipsam magni enim eveniet nemo harum vel, nisi ut nobis, ducimus et! Nobis deleniti tempora dignissimos sequi ratione consectetur fugit, at, commodi ex beatae consequatur.",
  },
  {
    id: "schedule",
    icon: <TbTournament className="icon" />,
    title: "Spelschemagenerering",
    content:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro, minima inventore nesciunt eos unde cum ab quas dignissimos alias exercitationem delectus neque cupiditate consectetur repellendus ipsam magni enim eveniet nemo harum vel, nisi ut nobis, ducimus et! Nobis deleniti tempora dignissimos sequi ratione consectetur fugit, at, commodi ex beatae consequatur.",
  },
  {
    id: "live-tv",
    icon: <MdLiveTv className="icon" />,
    title: "Liveresultat",
    content:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro, minima inventore nesciunt eos unde cum ab quas dignissimos alias exercitationem delectus neque cupiditate consectetur repellendus ipsam magni enim eveniet nemo harum vel, nisi ut nobis, ducimus et! Nobis deleniti tempora dignissimos sequi ratione consectetur fugit, at, commodi ex beatae consequatur.",
  },
  {
    id: "payments",
    icon: <MdOutlinePayment className="icon" />,
    title: "Betalningshantering",
    content:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro, minima inventore nesciunt eos unde cum ab quas dignissimos alias exercitationem delectus neque cupiditate consectetur repellendus ipsam magni enim eveniet nemo harum vel, nisi ut nobis, ducimus et! Nobis deleniti tempora dignissimos sequi ratione consectetur fugit, at, commodi ex beatae consequatur.",
  },
  {
    id: "communication",
    icon: <GrContact className="icon" />,
    title: "Kommunikation",
    content:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro, minima inventore nesciunt eos unde cum ab quas dignissimos alias exercitationem delectus neque cupiditate consectetur repellendus ipsam magni enim eveniet nemo harum vel, nisi ut nobis, ducimus et! Nobis deleniti tempora dignissimos sequi ratione consectetur fugit, at, commodi ex beatae consequatur.",
  },
];

export default function Home() {
  const [isScrolling, setIsScrolling] = useState<string | null>(null);

  const handleToggle = (title: string) => {
    setIsScrolling(title);
  };
  console.log(isScrolling);
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
              {dummyData.map((section) => (
                <li key={section.id}>
                  <Link
                    href={`#${section.id}`}
                    onClick={() => handleToggle(section.id)}
                  >
                    {section.icon}
                    {section.title}
                  </Link>
                </li>
              ))}
              <li>
                {/* <GoTrophy className="icon" /> */}
                <Link
                  href="#tournament"
                  onClick={() => handleToggle("tournament")}
                >
                  <GoTrophy className="icon" />
                  Turneringsskapare
                </Link>
                {/* Turneringsskapare */}
              </li>
              <li>
                <Link
                  href="#team-administration"
                  onClick={() => handleToggle("teamAdministration")}
                >
                  <MdOutlineAdminPanelSettings className="icon" />
                  Lagadministration
                </Link>
              </li>
              <li>
                <Link
                  href="#players-information"
                  onClick={() => handleToggle("playersInformation")}
                >
                  <IoIosContact className="icon" />
                  Spelinformation
                </Link>
              </li>

              <li>
                <Link href="#schedule" onClick={() => handleToggle("schedule")}>
                  <TbTournament className="icon" />
                  Spelschemagenerering
                </Link>
              </li>
              <li>
                <Link href="#live-tv" onClick={() => handleToggle("liveTV")}>
                  <MdLiveTv className="icon" />
                  Liveresultat
                </Link>
              </li>
              <li>
                <Link href="#payments" onClick={() => handleToggle("payments")}>
                  <MdOutlinePayment className="icon" />
                  Betalningshantering
                </Link>
              </li>
              <li>
                <Link
                  href="#communication"
                  onClick={() => handleToggle("communication")}
                >
                  <GrContact className="icon" />
                  Kommunikation
                </Link>
              </li>
            </ul>
          </section>
        </section>

        <section className="feature-container">
          {dummyData.map((feature) => (
            <section
              key={feature.id}
              className={`feature-container_feature ${
                isScrolling === feature.id ? "full" : ""
              }`}
              id={feature.id}
            >
              {feature.icon}
              <section>
                <h2>{feature.title}</h2>
                <p>{feature.content}</p>
              </section>
            </section>
          ))}

          {/* <section
            className={`feature-container_feature ${
              isScrolling.tournament ? "full" : ""
            }`}
            id="tournament"
          >
            <GoTrophy className="feature-container_feature-icon" />

            <section>
              <h2>Turneringsskapare</h2>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro,
                minima inventore nesciunt eos unde cum ab quas dignissimos alias
                exercitationem delectus neque cupiditate consectetur repellendus
                ipsam magni enim eveniet nemo harum vel, nisi ut nobis, ducimus
                et! Nobis deleniti tempora dignissimos sequi ratione consectetur
                fugit, at, commodi ex beatae consequatur.
              </p>
            </section>
          </section>

          <section
            // className="feature-container_feature"
            className={`feature-container_feature ${
              isScrolling.teamAdministration ? "full" : ""
            }`}
            id="team-administration"
          >
            <MdOutlineAdminPanelSettings className="feature-container_feature-icon" />
            <section>
              <h2>Lagadministration</h2>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro,
                minima inventore nesciunt eos unde cum ab quas dignissimos alias
                exercitationem delectus neque cupiditate consectetur repellendus
                ipsam magni enim eveniet nemo harum vel, nisi ut nobis, ducimus
                et! Nobis deleniti tempora dignissimos sequi ratione consectetur
                fugit, at, commodi ex beatae consequatur.
              </p>
            </section>
          </section>

          <section
            // className="feature-container_feature"
            className={`feature-container_feature ${
              isScrolling.playersInformation ? "full" : ""
            }`}
            id="players-information"
          >
            <IoIosContact className="feature-container_feature-icon" />
            <section>
              <h2>Spelinformation</h2>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro,
                minima inventore nesciunt eos unde cum ab quas dignissimos alias
                exercitationem delectus neque cupiditate consectetur repellendus
                ipsam magni enim eveniet nemo harum vel, nisi ut nobis, ducimus
                et! Nobis deleniti tempora dignissimos sequi ratione consectetur
                fugit, at, commodi ex beatae consequatur.
              </p>
            </section>
          </section>

          <section
            //  className="feature-container_feature"
            className={`feature-container_feature ${
              isScrolling.schedule ? "full" : ""
            }`}
            id="schedule"
          >
            <TbTournament className="feature-container_feature-icon" />
            <section>
              <h2>Spelschemagenerering</h2>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro,
                minima inventore nesciunt eos unde cum ab quas dignissimos alias
                exercitationem delectus neque cupiditate consectetur repellendus
                ipsam magni enim eveniet nemo harum vel, nisi ut nobis, ducimus
                et! Nobis deleniti tempora dignissimos sequi ratione consectetur
                fugit, at, commodi ex beatae consequatur.
              </p>
            </section>
          </section>

          <section
            // className="feature-container_feature"
            className={`feature-container_feature ${
              isScrolling.liveTV ? "full" : ""
            }`}
            id="live-tv"
          >
            <MdLiveTv className="feature-container_feature-icon" />
            <section>
              <h2>Liveresultat</h2>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro,
                minima inventore nesciunt eos unde cum ab quas dignissimos alias
                exercitationem delectus neque cupiditate consectetur repellendus
                ipsam magni enim eveniet nemo harum vel, nisi ut nobis, ducimus
                et! Nobis deleniti tempora dignissimos sequi ratione consectetur
                fugit, at, commodi ex beatae consequatur.
              </p>
            </section>
          </section>

          <section
            // className="feature-container_feature"
            className={`feature-container_feature ${
              isScrolling.payments ? "full" : ""
            }`}
            id="payments"
          >
            <MdOutlinePayment className="feature-container_feature-icon" />
            <section>
              <h2>Betalningshantering</h2>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro,
                minima inventore nesciunt eos unde cum ab quas dignissimos alias
                exercitationem delectus neque cupiditate consectetur repellendus
                ipsam magni enim eveniet nemo harum vel, nisi ut nobis, ducimus
                et! Nobis deleniti tempora dignissimos sequi ratione consectetur
                fugit, at, commodi ex beatae consequatur.
              </p>
            </section>
          </section>

          <section
            // className="feature-container_feature"
            className={`feature-container_feature ${
              isScrolling.communication ? "full" : ""
            }`}
            id="communication"
          >
            <GrContact className="feature-container_feature-icon" />
            <section>
              <h2>Kommunikation</h2>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro,
                minima inventore nesciunt eos unde cum ab quas dignissimos alias
                exercitationem delectus neque cupiditate consectetur repellendus
                ipsam magni enim eveniet nemo harum vel, nisi ut nobis, ducimus
                et! Nobis deleniti tempora dignissimos sequi ratione consectetur
                fugit, at, commodi ex beatae consequatur.
              </p>
            </section>
          </section> */}
        </section>

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
