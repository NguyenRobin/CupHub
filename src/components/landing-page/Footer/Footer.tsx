import Link from "next/link";
import React from "react";
import "./Footer.scss";

function Footer() {
  return (
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
            <Link href="/services/payment-solutions">Betalningslösningar</Link>
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
  );
}

export default Footer;
