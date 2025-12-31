import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import loungeBg from "@/assets/brick-lounge.jpeg";
import humidorBg from "@/assets/humidor-closeup.jpeg";
import whyBg from "@/assets/friends-lounge.jpeg";
import theaterLounge from "@/assets/theater-lounge.jpeg";

const sections = [
  {
    id: "lounge",
    bgImage: loungeBg,
    label: "The Lounge",
    title: "This isn't a shop.",
    titleHighlight: "It's a place to arrive.",
    description:
      "Walk in. Slow down. Choose a cigar that fits the moment. Whether it's your first visit or your hundredth, Smokies is designed for people who appreciate time, craft, and atmosphere.",
    subtext:
      "Leather seating. Espresso in hand. Conversations that linger longer than the smoke.",
  },
  {
    id: "humidor",
    bgImage: humidorBg,
    label: "The Humidor",
    title: "Perfectly preserved.",
    titleHighlight: "Always ready.",
    description:
      "Our climate-controlled humidors maintain the ideal 70/70 environment - 70 degrees, 70% humidity. Every cigar is stored at its peak, waiting for the right moment.",
    subtext:
      "Cuban-style, Dominican, Nicaraguan, Honduran - curated origins from around the world.",
  },
  {
    id: "theater",
    bgImage: theaterLounge,
    label: "The Experience",
    title: "More than cigars.",
    titleHighlight: "A destination.",
    description:
      "Big screens for the game. Pool tables for competition. A coffee bar for conversation. Smokies is where moments become memories.",
    subtext:
      "Two levels of comfort. Endless reasons to stay.",
  },
  {
    id: "why",
    bgImage: whyBg,
    label: "Why Smokies",
    title: "Because the experience",
    titleHighlight: "matters as much as the cigar.",
    description:
      "Smokies is built around time — not transactions. A place designed to slow the pace, where cigars are stored properly and enjoyed without rush.",
    subtext:
      "Whether you stop in briefly or stay for the evening, Smokies is a place you arrive — and don't hurry to leave.",
    cta: {
      text: "Why Locals Love Smokies",
      link: "/why-us",
    },
  },
];

const ParallaxSection = ({
  section,
  index,
}: {
  section: (typeof sections)[0];
  index: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.5, 1, 1, 0.5]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen overflow-hidden flex items-center"
      style={{ position: "relative" }}
    >
      <motion.div 
        className="absolute inset-0" 
        style={{ y, position: "absolute" }}
      >
        <img
          src={section.bgImage}
          alt={section.label}
          className="w-full h-[120%] object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(212,175,55,0.1),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.05),transparent_60%)]" />
      </motion.div>

      <motion.div
        className="section-container max-w-5xl relative z-10 py-20"
        style={{ y: textY, opacity, position: "relative" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.05 }}
          className="space-y-8"
        >
          <motion.p
            className="text-gold uppercase tracking-[0.35em] text-sm"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {section.label}
          </motion.p>

          <motion.h2
            className="font-display text-4xl md:text-5xl lg:text-6xl text-cream leading-tight"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {section.title}
            <br />
            <motion.span
              className="text-gold"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {section.titleHighlight}
            </motion.span>
          </motion.h2>

          <motion.p
            className="text-cream/80 text-lg md:text-xl max-w-3xl leading-relaxed"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {section.description}
          </motion.p>

          <motion.p
            className="text-cream/60 text-base md:text-lg max-w-2xl"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {section.subtext}
          </motion.p>

          {section.cta && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="pt-6"
            >
              <Link to={section.cta.link} className="btn-secondary inline-flex">
                {section.cta.text}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </section>
  );
};

const ParallaxExperience = () => {
  return (
    <div className="relative" style={{ position: "relative" }}>
      {sections.map((section, index) => (
        <ParallaxSection key={section.id} section={section} index={index} />
      ))}
    </div>
  );
};

export default ParallaxExperience;
