"use client";
import "./page.scss";
import Header from "@/components/LandingPage/Nav/Nav";
import HeroBanner from "@/components/LandingPage/HeroBanner/HeroBanner";
import Concept from "@/components/LandingPage/Concept/Concept";
import Features from "@/components/LandingPage/Features/Features";
import Pricing from "@/components/LandingPage/Pricing/Pricing";
import Testimonials from "@/components/LandingPage/Testimonials/Testimonials";
import Footer from "@/components/LandingPage/Footer/Footer";

export default function HomePage() {
  return (
    <section className="wrapper">
      <Header />
      <main className="main-content">
        <HeroBanner />
        <Concept />
        <Features />
        <Pricing />
        <Testimonials />
      </main>
      <Footer />
    </section>
  );
}
