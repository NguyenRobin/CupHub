"use client";
import Concept from "../components/landing-page/Concept/Concept";
import Features from "../components/landing-page/Features/Features";
import Footer from "../components/landing-page/Footer/Footer";
import HeroBanner from "../components/landing-page/HeroBanner/HeroBanner";
import Nav from "../components/landing-page/Nav/Nav";
import Pricing from "../components/landing-page/Pricing/Pricing";
import Testimonials from "../components/landing-page/Testimonials/Testimonials";
import "./page.scss";

export default function HomePage() {
  return (
    <div className="wrapper">
      <Nav />
      <main className="main-content">
        <HeroBanner />
        <Concept />
        <Features />
        <Pricing />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}
