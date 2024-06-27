"use client";
import "./page.scss";
import Header from "@/components/Header/Header";
import HeroBanner from "@/components/HeroBanner/HeroBanner";
import Concept from "@/components/Concept/Concept";
import Features from "@/components/Features/Features";
import Pricing from "@/components/Pricing/Pricing";
import Testimonials from "@/components/Testimonials/Testimonials";
import Footer from "@/components/Footer/Footer";

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
