import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import loungeBg from "@/assets/brick-lounge.jpeg";
import humidorBg from "@/assets/humidor-closeup.jpeg";
import whyBg from "@/assets/why-us-bg.jpeg";
import theaterLounge from "@/assets/theater-lounge.jpeg";

const sections = [
  {
    id: "lounge",
    bgImage: loungeBg,
    label: "The Lounge",
    title: "Not just a shop.",
    titleHighlight: "A place to unwind.",
    description:
      "Grab your favourite cigar, take a seat and forget about the time for a while. Whether it's your first time here, or the fiftieth, this is a place for slowing down and savouring the moment.",
    subtext:
      "Comfortable leather chairs, good conversation, and a coffee that is always fresh.",
  },
  {
    id: "humidor",
    bgImage: humidorBg,
    label: "The Humidor",
    title: "Stored right.",
    titleHighlight: "Ready when you are.",
    description:
      "We keep our humidors at 70 degrees and 70% humidity year round. That means every cigar burns clean and tastes the way the maker intended. No dried-out sticks here.",
    subtext:
      "Cuban-seed, Dominicans, Nicaraguans, Hondurans — we have traveled the world so you do not have to.",
  },
  {
    id: "theater",
    bgImage: theaterLounge,
    label: "The Vibe",
    title: "More than smoke.",
    titleHighlight: "A whole experience.",
    description:
      "Catch the game on the big screen. Challenge a friend at pool. Or just sit back with an espresso and watch the world go by. This is the kind of place where an hour turns into three.",
    subtext:
      "Two floors. Plenty of room. No reason to rush out.",
  },
  {
    id: "why",
    bgImage: whyBg,
    label: "Why Us",
    title: "Because it is about",
    titleHighlight: "more than just the cigar.",
    description:
      "We built Smokies around the experience, not just the sale. A good cigar deserves the right setting, the right company, and the time to actually enjoy it.",
    subtext:
      "Stop in for a quick smoke or stay for the evening. Either way, you will feel at home.",
    cta: {
      text: "Hear What Our Guests Say",
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
