import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import whyBg from "@/assets/8.jpeg";
import { ArrowRight } from "lucide-react";


const WhyChooseSmokies = () => {
  return (
    <section className="relative py-36 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={whyBg}
          alt="Smokies Cigar Lounge atmosphere"
          className="w-full h-full object-cover"
        />

        {/* Dark cinematic overlay */}
        <div className="absolute inset-0 bg-black/70" />

        {/* Warm gold ambience */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_30%,rgba(212,175,55,0.12),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_70%,rgba(255,255,255,0.05),transparent_60%)]" />
      </div>

      {/* Content */}
      <div className="section-container relative z-10 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <p className="text-gold uppercase tracking-[0.35em] text-sm mb-6">
            Why Smokies
          </p>

          <h2 className="font-display text-5xl md:text-6xl text-cream leading-tight mb-10">
            Because the experience <br />
            matters as much as the cigar.
          </h2>

          <div className="space-y-6 text-cream/80 text-lg leading-relaxed">
            <p>
              Smokies is built around time — not transactions. A place designed
              to slow the pace, where cigars are stored properly and enjoyed
              without rush.
            </p>

            <p>
              Espresso is always on hand. Seating is intentional. Conversations
              linger longer than the smoke itself.
            </p>

            <p>
              Whether you stop in briefly or stay for the evening, Smokies is a
              place you arrive — and don’t hurry to leave.
            </p>
          </div>

          {/* Editorial CTA */}
          <div className="mt-14">
            <Link to="/why-us" className="btn-secondary inline-flex">
              Why Locals Love Smokies
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseSmokies;
