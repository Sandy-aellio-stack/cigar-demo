import { motion } from "framer-motion";
import { useState } from "react";

const origins = [
  {
    name: "Cuban-Style",
    origin: "Various",
    description: "Rich, complex profiles with deep earthy undertones",
    intensity: 8,
    notes: ["Earth", "Leather", "Coffee"],
  },
  {
    name: "Dominican",
    origin: "Dominican Republic",
    description: "Smooth, creamy cigars with subtle sweetness",
    intensity: 5,
    notes: ["Cedar", "Cream", "Nuts"],
  },
  {
    name: "Nicaraguan",
    origin: "Nicaragua",
    description: "Bold, spicy blends with full-bodied character",
    intensity: 9,
    notes: ["Pepper", "Cocoa", "Spice"],
  },
  {
    name: "Honduran",
    origin: "Honduras",
    description: "Medium-full cigars with natural tobacco sweetness",
    intensity: 6,
    notes: ["Cedar", "Coffee", "Honey"],
  },
];

const HumidorNodes = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="relative py-28 bg-charcoal overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute -top-48 -left-48 w-[500px] h-[500px] bg-gold/5 rounded-full blur-3xl" />

      <div className="container mx-auto max-w-7xl px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-gold text-sm uppercase tracking-[0.25em]">
            Inside the Humidor
          </span>

          <h2 className="font-display text-4xl md:text-5xl text-cream mt-5">
            Curated Origins
          </h2>

          <p className="text-muted-foreground mt-5 max-w-2xl mx-auto text-lg">
            Each region offers a unique smoking experience — carefully selected,
            properly stored, and always ready.
          </p>
        </motion.div>

        {/* Nodes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {origins.map((origin, index) => (
            <motion.div
              key={origin.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.12, duration: 0.6 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`
                relative p-7 rounded-2xl cursor-pointer
                backdrop-blur-xl bg-white/5 border
                transition-all duration-500
                ${
                  hoveredIndex === index
                    ? "border-gold/50 shadow-[0_0_40px_rgba(212,175,55,0.15)]"
                    : "border-white/10"
                }
              `}
            >
              {/* Header */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-cream">
                  {origin.name}
                </h3>
                <p className="text-xs uppercase tracking-widest text-gold mt-1">
                  {origin.origin}
                </p>
              </div>

              {/* Description */}
              <p className="text-sm text-muted-foreground mb-6 min-h-[48px]">
                {origin.description}
              </p>

              {/* Intensity */}
              <div className="mb-5">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs tracking-wider text-muted-foreground">
                    INTENSITY
                  </span>
                  <span className="text-gold text-sm font-semibold">
                    {origin.intensity}/10
                  </span>
                </div>

                <div className="h-[3px] bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${origin.intensity * 10}%` }}
                    viewport={{ once: true }}
                    transition={{
                      delay: 0.3 + index * 0.1,
                      duration: 0.9,
                      ease: "easeOut",
                    }}
                    className="h-full bg-gradient-to-r from-gold/60 to-gold"
                  />
                </div>
              </div>

              {/* Notes */}
              <div className="flex flex-wrap gap-2">
                {origin.notes.map((note) => (
                  <span
                    key={note}
                    className="text-[11px] px-3 py-1 rounded-full
                               bg-black/40 border border-white/10
                               text-muted-foreground tracking-wide"
                  >
                    {note}
                  </span>
                ))}
              </div>

              {/* Corner Accent */}
              <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden rounded-tr-2xl">
                <div
                  className={`absolute -top-8 -right-8 w-16 h-16 rotate-45 transition-colors
                    ${
                      hoveredIndex === index
                        ? "bg-gold/20"
                        : "bg-transparent"
                    }`}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HumidorNodes;
