import { motion } from "framer-motion";
import loungeBg from "@/assets/6.jpeg";

const LoungeInterlude = () => {
  return (
    <section className="relative py-40 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={loungeBg}
          alt="Smokies Cigar Lounge interior"
          className="w-full h-full object-cover"
        />

        {/* Dark cinematic overlay */}
        <div className="absolute inset-0 bg-black/65" />

        {/* Gold ambient glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(212,175,55,0.12),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.06),transparent_60%)]" />
      </div>

      {/* Content */}
      <div className="section-container max-w-5xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="space-y-10"
        >
          <p className="text-gold uppercase tracking-[0.35em] text-sm">
            The Lounge
          </p>

          <h2 className="font-display text-5xl md:text-6xl text-cream leading-tight">
            This isn’t a shop.<br />
            <span className="text-gold">It’s a place to arrive.</span>
          </h2>

          <p className="text-cream/80 text-xl max-w-3xl leading-relaxed">
            Walk in. Slow down. Choose a cigar that fits the moment.
            Whether it’s your first visit or your hundredth, Smokies is designed
            for people who appreciate time, craft, and atmosphere.
          </p>

          <p className="text-cream/70 text-lg max-w-2xl">
            Leather seating. Espresso in hand. Conversations that linger longer
            than the smoke.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default LoungeInterlude;
