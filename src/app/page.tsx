"use client";
import "./page.scss";

import HeroBanner from "@/components/landing-page/HeroBanner/HeroBanner";

import Features from "@/components/landing-page/Features/Features";
import Pricing from "@/components/landing-page/Pricing/Pricing";
import Testimonials from "@/components/landing-page/Testimonials/Testimonials";
import Footer from "@/components/landing-page/Footer/Footer";
import Nav from "@/components/landing-page/Nav/Nav";
import Concept from "@/components/landing-page/Concept/Concept";

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
