import { motion, AnimatePresence } from "framer-motion";
import { useLocation, Routes } from "react-router-dom";
import { ReactNode, cloneElement, isValidElement } from "react";

interface SmokeTransitionProps {
  children: ReactNode;
}

const SmokeOverlay = () => {
  return (
    <motion.div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 9999 }}
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.div
        className="absolute inset-0 bg-charcoal-deep"
        initial={{ opacity: 0.85 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />

      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: `${180 + i * 70}px`,
            height: `${110 + i * 35}px`,
            left: `${8 + i * 14}%`,
            bottom: "-8%",
            background: `radial-gradient(ellipse, rgba(150, 150, 150, ${0.35 - i * 0.05}) 0%, transparent 70%)`,
            filter: "blur(35px)",
          }}
          initial={{ y: 0, opacity: 0.5, scale: 1 }}
          animate={{
            y: -500 - i * 120,
            opacity: 0,
            scale: 1.8 + i * 0.25,
          }}
          transition={{
            duration: 1.2 + i * 0.15,
            delay: i * 0.08,
            ease: [0.4, 0, 0.2, 1],
          }}
        />
      ))}
    </motion.div>
  );
};

const SmokeTransition = ({ children }: SmokeTransitionProps) => {
  const location = useLocation();

  return (
    <>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
        >
          {isValidElement(children) && children.type === Routes
            ? cloneElement(children as React.ReactElement<{ location?: typeof location }>, { location })
            : children}
        </motion.div>
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <SmokeOverlay key={`smoke-overlay-${location.pathname}`} />
      </AnimatePresence>
    </>
  );
};

export default SmokeTransition;
