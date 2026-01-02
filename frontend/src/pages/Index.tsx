import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroCarousel from "@/components/HeroCarousel";
import LocationSection from "@/components/LocationSection";
import ParallaxExperience from "@/components/ParallaxExperience";
import AgeGate from "@/components/AgeGate";

import BUSINESS_INFO from "@/config/businessInfo";

const Index = () => {
  const [verified, setVerified] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("ageVerified") === "true";
  });

  if (!verified) {
    return <AgeGate onVerified={() => setVerified(true)} />;
  }

  return (
    <>
      <Helmet>
        <title>{BUSINESS_INFO.name} | Premium Cigars in Reading, PA</title>
        <meta
          name="description"
          content={`Relax, unwind, and enjoy premium cigars at ${BUSINESS_INFO.name} in Reading, PA. Climate-controlled humidors and curated selections. Est. ${BUSINESS_INFO.established}.`}
        />
        <link rel="canonical" href="https://smokiescigarlounge.com" />
      </Helmet>

      <Header />

      <main className="overflow-hidden">
        <HeroCarousel />

        <section className="py-24 bg-charcoal">
          <div className="section-container text-center max-w-3xl">
            <h2 className="font-display text-4xl md:text-5xl text-cream mb-6">
              Find Your <span className="text-gold">Next Favorite</span>
            </h2>

            <p className="text-muted-foreground text-lg mb-10">
              From bold Nicaraguans to smooth Dominicans, we have got something for every palate. 
              Walk in, take your time, and let us help you pick one that is just right.
            </p>

            <Link to="/cigar-brands" className="btn-secondary inline-flex">
              See What We Carry
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </section>

        <ParallaxExperience />

        <LocationSection />
      </main>

      <Footer />
    </>
  );
};

export default Index;
