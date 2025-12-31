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
              Discover Our <span className="text-gold">Curated Cigars</span>
            </h2>

            <p className="text-muted-foreground text-lg mb-10">
              Explore premium cigar origins from around the world — each
              carefully selected, properly stored, and ready to enjoy.
            </p>

            <Link to="/cigar-brands" className="btn-secondary inline-flex">
              Explore Cigars
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
