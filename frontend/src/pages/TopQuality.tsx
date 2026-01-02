import { Helmet } from 'react-helmet-async';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BUSINESS_INFO, { getPrimaryLocation } from '@/config/businessInfo';

import humidorCloseup from '@/assets/humidor-closeup.jpeg';
import humidorStore from '@/assets/humidor-store.jpeg';
import cigarDisplay from '@/assets/cigar-display.jpeg';
import counterCigars from '@/assets/counter-cigars.jpeg';
import certificate from '@/assets/businessrate-2025-certificate.jpeg';

const ParallaxSection = ({
  image,
  children,
  className = "",
}: {
  image: string;
  children: React.ReactNode;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  return (
    <section ref={ref} className={`relative min-h-screen overflow-hidden flex items-center ${className}`} style={{ position: "relative" }}>
      <motion.div className="absolute inset-0" style={{ y, position: "absolute" }}>
        <img src={image} alt="" className="w-full h-[130%] object-cover" />
        <div className="absolute inset-0 bg-black/65" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(212,175,55,0.08),transparent_55%)]" />
      </motion.div>
      <div className="section-container relative z-10 py-24" style={{ position: "relative" }}>
        {children}
      </div>
    </section>
  );
};

const TopQuality = () => {
  const primaryLocation = getPrimaryLocation();

  return (
    <>
      <Helmet>
        <title>Top Quality Cigars | Climate-Controlled Storage | Smokies Cigar Lounge Reading PA</title>
        <meta
          name="description"
          content="Discover why Smokies Cigar Lounge offers the finest quality cigars in Reading, PA. Climate-controlled humidors, expert selection, and freshness guaranteed."
        />
        <link rel="canonical" href="https://smokiescigarlounge.com/top-quality" />
      </Helmet>

      <Header />

      <main className="overflow-hidden">
        <ParallaxSection image={humidorCloseup}>
          <div className="max-w-4xl">
            <motion.p
              className="text-gold font-medium mb-4 tracking-[0.3em] uppercase text-sm"
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              Our Commitment to Excellence
            </motion.p>
            <motion.h1
              className="font-display text-4xl md:text-5xl lg:text-6xl text-cream mb-6 leading-tight"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.1, ease: "easeIn" }}
            >
              Top Quality Cigars,
              <br />
              <span className="text-gold">Perfectly Preserved</span>
            </motion.h1>
            <motion.p
              className="text-cream/80 text-lg md:text-xl max-w-2xl leading-relaxed"
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              We are picky so you do not have to be. Every cigar here is stored right, inspected carefully, and ready to light.
            </motion.p>
          </div>
        </ParallaxSection>

        <ParallaxSection image={humidorStore}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <p className="text-gold font-medium mb-4 tracking-[0.3em] uppercase text-sm">
                Selection & Inspection
              </p>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-cream mb-6 leading-tight">
                Hand-Selected,
                <br />
                <span className="text-gold">Carefully Inspected</span>
              </h2>
              <p className="text-cream/80 text-lg leading-relaxed mb-6">
                We work with people who care about their craft as much as we do. Before anything hits our shelves, we check the construction, the wrapper, and the feel. If something is off, it does not make the cut.
              </p>
              <motion.p
                className="text-cream/60 text-base"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Cuban-style, Dominican, Nicaraguan, Honduran — curated origins from around the world.
              </motion.p>
            </motion.div>

            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2, ease: "easeIn" }}
            >
              <div className="text-center">
                <div className="text-5xl md:text-6xl font-display text-gold mb-2">65-70°F</div>
                <div className="text-cream/70 text-lg">Temperature Range</div>
              </div>
              <div className="text-center">
                <div className="text-5xl md:text-6xl font-display text-gold mb-2">68-72%</div>
                <div className="text-cream/70 text-lg">Humidity Level</div>
              </div>
            </motion.div>
          </div>
        </ParallaxSection>

        <ParallaxSection image={cigarDisplay}>
          <div className="max-w-3xl mx-auto text-center">
            <motion.p
              className="text-gold font-medium mb-4 tracking-[0.3em] uppercase text-sm"
              initial={{ opacity: 0, y: -40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              Expert Guidance
            </motion.p>
            <motion.h2
              className="font-display text-3xl md:text-4xl lg:text-5xl text-cream mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.1, ease: "easeIn" }}
            >
              Personalized
              <br />
              <span className="text-gold">Recommendations</span>
            </motion.h2>
            <motion.p
              className="text-cream/80 text-lg md:text-xl leading-relaxed mb-10"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Not sure where to start? That is what we are here for. Tell us what you are in the mood for, and we will point you toward something you will love. No pressure, just honest advice.
            </motion.p>
            <motion.blockquote
              className="text-cream text-xl md:text-2xl italic font-display"
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.3, ease: "easeIn" }}
            >
              "A good cigar is meant to be enjoyed, not rushed. That is why we take the time to get every detail right."
              <footer className="text-gold font-medium mt-4 text-base not-italic">
                — The Smokies Team
              </footer>
            </motion.blockquote>
          </div>
        </ParallaxSection>

        <ParallaxSection image={counterCigars}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              className="order-2 lg:order-1"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: "easeOut" }}
            >
              <p className="text-gold font-medium mb-4 tracking-[0.3em] uppercase text-sm">
                Award Winning
              </p>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-cream mb-6 leading-tight">
                Best Cigar Shop
                <br />
                <span className="text-gold">Reading 2025</span>
              </h2>
              <p className="text-cream/80 text-lg leading-relaxed mb-8">
                We did not set out to win awards. We just focused on doing things right. But we are proud that our guests took the time to share their experiences online. Thank you for that.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={primaryLocation.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  Visit Our Shop
                </a>
                <a href={`tel:${primaryLocation.phone.tel}`} className="btn-secondary">
                  Call for Availability
                </a>
              </div>
            </motion.div>

            <motion.div
              className="order-1 lg:order-2 flex justify-center"
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2, ease: "easeIn" }}
            >
              <div className="relative">
                <img
                  src={certificate}
                  alt="Best of 2025 Reading Awards - Best Cigar Shop"
                  className="max-w-[320px] md:max-w-[380px] rounded-lg shadow-2xl border-4 border-gold/30"
                  style={{
                    clipPath: "inset(12% 5% 18% 5% round 8px)",
                  }}
                />
                <div className="absolute -bottom-4 -right-4 bg-gold text-charcoal-deep px-4 py-2 rounded-full font-bold text-sm shadow-lg">
                  Google Reviews ★★★★★
                </div>
              </div>
            </motion.div>
          </div>
        </ParallaxSection>
      </main>

      <Footer />
    </>
  );
};

export default TopQuality;
