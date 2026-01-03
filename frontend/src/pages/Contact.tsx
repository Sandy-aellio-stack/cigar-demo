import { useState, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, useScroll, useTransform } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { MapPin, Phone, Clock, MessageCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BUSINESS_INFO, { getPrimaryLocation } from '@/config/businessInfo';

import storefrontSunset from '@/assets/storefront-sunset.jpeg';
import outdoorSeating from '@/assets/outdoor-seating.jpeg';

const ParallaxHero = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-[60vh] overflow-hidden flex items-center">
      <motion.div className="absolute inset-0" style={{ y }}>
        <img
          src={storefrontSunset}
          alt="Smokies Cigar Lounge storefront"
          className="w-full h-[140%] object-cover"
        />
        <div className="absolute inset-0 bg-black/65" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(212,175,55,0.1),transparent_60%)]" />
      </motion.div>

      <motion.div className="relative section-container text-center py-32" style={{ opacity }}>
        <motion.p
          className="text-gold font-medium mb-4 tracking-wide uppercase text-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Get in Touch
        </motion.p>
        <motion.h1
          className="font-display text-4xl md:text-5xl lg:text-6xl text-cream mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          Contact <span className="text-gold">{BUSINESS_INFO.name}</span>
        </motion.h1>
        <motion.p
          className="text-muted-foreground text-lg max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Stop by, give us a call, or just walk in when you are in the area. The door is always open and there is always a seat with your name on it.
        </motion.p>
      </motion.div>
    </section>
  );
};

const Contact = () => {
  const [selectedLocation, setSelectedLocation] = useState(BUSINESS_INFO.locations[0].id);
  const currentLocation = BUSINESS_INFO.locations.find(loc => loc.id === selectedLocation) || getPrimaryLocation();
  const primaryLocation = getPrimaryLocation();

  return (
    <>
      <Helmet>
        <title>Contact {BUSINESS_INFO.name} | Directions & Hours | Reading PA</title>
        <meta
          name="description"
          content={`Visit ${BUSINESS_INFO.name} at ${primaryLocation.address.full}. Call ${primaryLocation.phone.formatted} for hours and availability. Your premium cigar destination in Pennsylvania.`}
        />
        <link rel="canonical" href="https://smokiescigarlounge.com/contact" />
      </Helmet>

      <Header />

      <main className="overflow-hidden">
        <ParallaxHero />

        <section className="py-20 bg-charcoal">
          <div className="section-container">
            <Tabs value={selectedLocation} onValueChange={setSelectedLocation} className="w-full">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12">
                {BUSINESS_INFO.locations.map((location) => (
                  <TabsTrigger key={location.id} value={location.id} className="text-sm">
                    {location.isPrimary ? 'Lancaster Ave (Main)' : 'Downtown'}
                  </TabsTrigger>
                ))}
              </TabsList>

              {BUSINESS_INFO.locations.map((location) => (
                <TabsContent key={location.id} value={location.id}>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <motion.div
                      className="space-y-8"
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6 }}
                    >
                      <h2 className="font-display text-3xl text-cream">
                        {location.isPrimary ? 'Main Location' : 'Downtown Location'}
                      </h2>

                      <motion.div
                        className="bg-card rounded-xl p-6 border border-border flex items-start gap-4 hover:border-gold/30 transition-colors"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                      >
                        <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                          <MapPin className="w-6 h-6 text-gold" />
                        </div>
                        <div>
                          <h3 className="font-medium text-cream mb-2">Address</h3>
                          <address className="text-muted-foreground not-italic mb-3">
                            {BUSINESS_INFO.name}<br />
                            {location.address.street}<br />
                            {location.address.city}, {location.address.state} {location.address.zip}
                          </address>
                          <a
                            href={location.directionsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gold hover:text-gold-light transition-colors text-sm font-medium"
                          >
                            Get Directions →
                          </a>
                        </div>
                      </motion.div>

                      <motion.div
                        className="bg-card rounded-xl p-6 border border-border flex items-start gap-4 hover:border-gold/30 transition-colors"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      >
                        <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                          <Phone className="w-6 h-6 text-gold" />
                        </div>
                        <div>
                          <h3 className="font-medium text-cream mb-2">Phone</h3>
                          <a
                            href={`tel:${location.phone.tel}`}
                            className="text-muted-foreground hover:text-gold transition-colors text-lg"
                          >
                            {location.phone.formatted}
                          </a>
                          <p className="text-muted-foreground text-sm mt-1">
                            Call for availability and special requests
                          </p>
                        </div>
                      </motion.div>

                      <motion.div
                        className="bg-card rounded-xl p-6 border border-border flex items-start gap-4 hover:border-gold/30 transition-colors"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                      >
                        <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                          <Clock className="w-6 h-6 text-gold" />
                        </div>
                        <div>
                          <h3 className="font-medium text-cream mb-2">Business Hours</h3>
                          <ul className="text-muted-foreground space-y-1 text-sm">
                            {location.hours.saturday === 'Closed' && location.hours.sunday === 'Closed' ? (
                              <>
                                <li className="flex justify-between gap-4">
                                  <span>Mon - Fri</span>
                                  <span>{location.hours.monday}</span>
                                </li>
                                <li className="flex justify-between gap-4">
                                  <span>Sat - Sun</span>
                                  <span>Closed</span>
                                </li>
                              </>
                            ) : (
                              <>
                                <li className="flex justify-between gap-4">
                                  <span>Mon - Thu</span>
                                  <span>{location.hours.monday}</span>
                                </li>
                                <li className="flex justify-between gap-4">
                                  <span>Fri - Sat</span>
                                  <span>{location.hours.friday}</span>
                                </li>
                                <li className="flex justify-between gap-4">
                                  <span>Sunday</span>
                                  <span>{location.hours.sunday}</span>
                                </li>
                              </>
                            )}
                          </ul>
                        </div>
                      </motion.div>

                      <motion.div
                        className="bg-card rounded-xl p-6 border border-border flex items-start gap-4 hover:border-gold/30 transition-colors"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                      >
                        <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                          <MessageCircle className="w-6 h-6 text-gold" />
                        </div>
                        <div>
                          <h3 className="font-medium text-cream mb-2">Follow Us</h3>
                          <p className="text-muted-foreground text-sm mb-3">
                            Stay updated on events and new arrivals
                          </p>
                          <div className="flex gap-4">
                            <a
                              href={BUSINESS_INFO.social.instagram}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gold hover:text-gold-light transition-colors text-sm font-medium"
                            >
                              Instagram
                            </a>
                            <a
                              href={BUSINESS_INFO.social.facebook}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gold hover:text-gold-light transition-colors text-sm font-medium"
                            >
                              Facebook
                            </a>
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>

                    <motion.div
                      className="h-full min-h-[500px] rounded-xl overflow-hidden shadow-card border border-border"
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                    >
                      <iframe
                        src={location.mapEmbedUrl}
                        width="100%"
                        height="100%"
                        style={{ border: 0, filter: 'grayscale(30%) contrast(1.05)' }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title={`${BUSINESS_INFO.name} location at ${location.address.full}`}
                      />
                    </motion.div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>

        <section className="relative py-20 overflow-hidden">
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1.1 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
          >
            <img
              src={outdoorSeating}
              alt="Outdoor seating at Smokies"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/70" />
          </motion.div>

          <div className="section-container relative z-10">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <a
                href={`tel:${currentLocation.phone.tel}`}
                className="btn-primary text-center py-5 text-lg"
              >
                <Phone className="w-5 h-5" />
                Call Now
              </a>
              <a
                href={currentLocation.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-center py-5 text-lg"
              >
                <MapPin className="w-5 h-5" />
                Get Directions
              </a>
            </motion.div>
          </div>
        </section>

        <section className="py-16 bg-charcoal">
          <div className="section-container">
            <motion.div
              className="max-w-3xl mx-auto text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-display text-2xl text-cream mb-4">
                Proudly Serving the Reading Area
              </h2>
              <p className="text-muted-foreground">
                We have welcomed folks from Reading, Wyomissing, West Reading, Shillington, and all across Berks County. Easy to find, even easier to stay awhile. Whether you are a longtime local or just passing through, we are glad you found us.
              </p>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Contact;
