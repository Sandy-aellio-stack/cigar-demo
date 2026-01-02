import { Helmet } from 'react-helmet-async';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Star } from 'lucide-react';
import BUSINESS_INFO, { getPrimaryLocation } from '@/config/businessInfo';

import brickLounge from '@/assets/brick-lounge.jpeg';
import theaterLounge from '@/assets/theater-lounge.jpeg';
import coffeeAtmosphere from '@/assets/coffee-atmosphere.jpeg';
import patioGroup from '@/assets/patio-group.jpeg';

const reviews = [
  {
    name: 'Mike R.',
    text: 'Walked in not knowing much about cigars. The guy behind the counter spent 20 minutes helping me find something I actually liked. Been coming back every week since.',
    rating: 5,
  },
  {
    name: 'David S.',
    text: 'This is my escape. Good leather chair, good smoke, good people. Time moves differently here.',
    rating: 5,
  },
  {
    name: 'James T.',
    text: 'Stopped looking for another spot after I found Smokies. The cigars are always fresh and the vibe is exactly what you want after a long day.',
    rating: 5,
  },
];

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
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(212,175,55,0.08),transparent_55%)]" />
      </motion.div>
      <div className="section-container relative z-10 py-24" style={{ position: "relative" }}>
        {children}
      </div>
    </section>
  );
};

const WhyUs = () => {
  const primaryLocation = getPrimaryLocation();

  return (
    <>
      <Helmet>
        <title>Why Choose Smokies Cigar Lounge | Best Cigar Shop in Reading PA</title>
        <meta
          name="description"
          content="Discover why Smokies Cigar Lounge is Reading, PA's favorite cigar destination. Premium selection, comfortable lounge, expert staff, and a welcoming atmosphere."
        />
        <link rel="canonical" href="https://smokiescigarlounge.com/why-us" />
      </Helmet>

      <Header />

      <main className="overflow-hidden">
        <ParallaxSection image={brickLounge}>
          <div className="max-w-4xl">
            <motion.p
              className="text-gold font-medium mb-4 tracking-[0.3em] uppercase text-sm"
              initial={{ opacity: 0, x: 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              The Smokies Difference
            </motion.p>
            <motion.h1
              className="font-display text-4xl md:text-5xl lg:text-6xl text-cream mb-6 leading-tight"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.1, ease: "easeIn" }}
            >
              Why Smokies Is
              <br />
              <span className="text-gold">Different</span>
            </motion.h1>
            <motion.p
              className="text-cream/80 text-lg md:text-xl max-w-2xl leading-relaxed"
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeIn" }}
            >
              We are not trying to be everything to everyone. Just a really good cigar lounge for people who appreciate the simple things done right.
            </motion.p>
          </div>
        </ParallaxSection>

        <ParallaxSection image={theaterLounge}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <p className="text-gold font-medium mb-4 tracking-[0.3em] uppercase text-sm">
                Premium Selection
              </p>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-cream mb-6 leading-tight">
                Hand-Picked Cigars
                <br />
                <span className="text-gold">From the World's Finest</span>
              </h2>
              <p className="text-cream/80 text-lg leading-relaxed">
                We only stock what we would smoke ourselves. Every cigar on our shelves has passed the taste test. Hundreds of options from around the world, all kept at the perfect temperature and humidity.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2, ease: "easeIn" }}
            >
              <p className="text-gold font-medium mb-4 tracking-[0.3em] uppercase text-sm">
                Two-Level Lounge
              </p>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-cream mb-6 leading-tight">
                Relax in
                <br />
                <span className="text-gold">Ultimate Comfort</span>
              </h2>
              <p className="text-cream/80 text-lg leading-relaxed">
                Sink into a leather chair that feels like it was made for you. The game is on. The air is clean. Nobody is rushing you out. This is what relaxing is supposed to feel like.
              </p>
            </motion.div>
          </div>
        </ParallaxSection>

        <ParallaxSection image={coffeeAtmosphere}>
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: "easeOut" }}
            >
              <p className="text-gold font-medium mb-4 tracking-[0.3em] uppercase text-sm">
                Beyond Cigars
              </p>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-cream mb-6">
                Full Amenities &
                <br />
                <span className="text-gold">Entertainment</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
              >
                <h3 className="text-2xl text-cream font-display mb-4">Coffee Bar</h3>
                <p className="text-cream/70 text-lg leading-relaxed">
                  Nothing pairs better with a good smoke than a well-made coffee. We pull fresh espresso all day, so you never have to choose between the two.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeIn" }}
              >
                <h3 className="text-2xl text-cream font-display mb-4">BYOB Friendly</h3>
                <p className="text-cream/70 text-lg leading-relaxed">
                  Prefer whiskey? Bring it. Craft beer? Sure. This is your time to unwind however you like.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              >
                <h3 className="text-2xl text-cream font-display mb-4">Entertainment</h3>
                <p className="text-cream/70 text-lg leading-relaxed">
                  Challenge someone to a game of pool. Catch the big game on one of our screens. Or just sit back and people-watch.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeIn" }}
              >
                <h3 className="text-2xl text-cream font-display mb-4">Memberships</h3>
                <p className="text-cream/70 text-lg leading-relaxed">
                  Become a regular and get treated like one. Members enjoy special pricing, exclusive events, and their own locker to store favorites.
                </p>
              </motion.div>
            </div>
          </div>
        </ParallaxSection>

        <ParallaxSection image={patioGroup}>
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: -40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <p className="text-gold font-medium mb-4 tracking-[0.3em] uppercase text-sm">
                What Our Customers Say
              </p>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-cream">
                Google Review
                <br />
                <span className="text-gold">Highlights</span>
              </h2>
            </motion.div>

            <div className="space-y-10">
              {reviews.map((review, index) => (
                <motion.div
                  key={review.name}
                  initial={{ 
                    opacity: 0, 
                    x: index % 2 === 0 ? -80 : 80 
                  }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.15, ease: index % 2 === 0 ? "easeIn" : "easeOut" }}
                  className="text-center"
                >
                  <p className="text-cream text-xl md:text-2xl italic font-display mb-4">
                    "{review.text}"
                  </p>
                  <div className="flex items-center justify-center gap-4">
                    <span className="text-cream/80 font-medium">{review.name}</span>
                    <div className="flex gap-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-gold" fill="currentColor" />
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="text-center mt-16"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
            >
              <h3 className="font-display text-3xl text-cream mb-6">
                Come See for Yourself
              </h3>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={primaryLocation.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  Get Directions
                </a>
                <a href={`tel:${primaryLocation.phone.tel}`} className="btn-secondary">
                  Call {primaryLocation.phone.formatted}
                </a>
              </div>
            </motion.div>
          </div>
        </ParallaxSection>
      </main>

      <Footer />
    </>
  );
};

export default WhyUs;
