import { useState, useEffect, useCallback } from "react";
import { MapPin, Phone, Star, ThermometerSnowflake, Coffee } from "lucide-react";
import { motion } from "framer-motion";
import BUSINESS_INFO, { getPrimaryLocation } from "@/config/businessInfo";

import lounge1 from "@/assets/lounge-1.jpeg";
import lounge2 from "@/assets/lounge-2.jpeg";
import storefront from "@/assets/storefront-sunset.jpeg";
import brickLounge from "@/assets/brick-lounge.jpeg";
import mezzanineView from "@/assets/mezzanine-view.jpeg";
import bigScreenLounge from "@/assets/big-screen-lounge.jpeg";
import coffeeBar from "@/assets/coffee-bar.jpeg";

const images = [
  { src: storefront, alt: "Smokies Cigar Lounge storefront at sunset" },
  { src: lounge1, alt: "Smokies Cigar Lounge seating" },
  { src: brickLounge, alt: "Brick wall lounge area" },
  { src: mezzanineView, alt: "Mezzanine view of the lounge" },
  { src: bigScreenLounge, alt: "Big screen lounge area" },
  { src: coffeeBar, alt: "Coffee bar area" },
  { src: lounge2, alt: "Espresso bar at Smokies Cigar Lounge" },
];

const locations = [
  {
    label: "Lancaster Ave",
    est: 2020,
  },
  {
    label: "Reading City",
    est: 2025,
  },
];

const HeroCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [locationIndex, setLocationIndex] = useState(0);
  const primaryLocation = getPrimaryLocation();

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <section className="relative min-h-screen overflow-hidden">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={image.src}
            alt={image.alt}
            className="w-full h-full object-cover"
            loading={index === 0 ? "eager" : "lazy"}
          />
        </div>
      ))}

      <div className="absolute inset-0 bg-gradient-to-t from-charcoal-deep/90 via-charcoal-deep/40 to-transparent" />

      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="section-container text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="px-4"
          >
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6">
              {locations.map((loc, i) => (
                <button
                  key={loc.label}
                  onClick={() => setLocationIndex(i)}
                  className={`px-3 sm:px-4 py-1.5 text-xs sm:text-sm rounded-full border transition ${
                    i === locationIndex
                      ? "bg-gold text-charcoal border-gold"
                      : "border-cream/30 text-cream/80 hover:border-gold"
                  }`}
                >
                  {loc.label} · EST {loc.est}
                </button>
              ))}
            </div>

            <h1 className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-cream mb-4">
              Smokies Cigar Lounge
            </h1>

            <p className="text-cream-dark text-base sm:text-lg md:text-xl mb-6 sm:mb-8 max-w-2xl mx-auto px-2">
              Where good cigars meet great company. Pull up a chair, grab a coffee, and stay awhile.
            </p>

            <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8 sm:mb-10 px-2">
              <div className="trust-badge text-xs sm:text-sm">
                <Star className="w-3 h-3 sm:w-4 sm:h-4 text-gold" fill="currentColor" />
                <span>Rated #1 in Reading</span>
              </div>
              <div className="trust-badge text-xs sm:text-sm">
                <ThermometerSnowflake className="w-3 h-3 sm:w-4 sm:h-4 text-gold" />
                <span>Perfect Humidity</span>
              </div>
              <div className="trust-badge text-xs sm:text-sm">
                <Coffee className="w-3 h-3 sm:w-4 sm:h-4 text-gold" />
                <span>Fresh Espresso</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-4">
              <a
                href={primaryLocation.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary px-6 sm:px-8 py-3 text-sm sm:text-base"
              >
                <MapPin className="w-4 h-4" />
                Get Directions
              </a>
              <a
                href={`tel:${primaryLocation.phone.tel}`}
                className="btn-secondary px-6 sm:px-8 py-3 text-sm sm:text-base"
              >
                <Phone className="w-4 h-4" />
                Call Lounge
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentIndex ? "w-8 bg-gold" : "w-2 bg-cream/30"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroCarousel;
