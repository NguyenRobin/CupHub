import Concept from '../components/landing-page/ui/Concept/Concept';
import Features from '../components/landing-page/ui/Features/Features';
import Footer from '../components/landing-page/ui/Footer/Footer';
import HeroBanner from '../components/landing-page/ui/HeroBanner/HeroBanner';
import Nav from '../components/landing-page/ui/NavBar/NavBar';
import Pricing from '../components/landing-page/ui/Pricing/Pricing';
import Testimonials from '../components/landing-page/ui/Testimonials/Testimonials';

import './page.scss';

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
