import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AnimatePresence, motion } from "framer-motion";
import Index from "./pages/Index";
import CigarBrands from "./pages/CigarBrands";
import TopQuality from "./pages/TopQuality";
import WhyUs from "./pages/WhyUs";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import FloatingCallButton from "./components/FloatingCallButton";

const queryClient = new QueryClient();

const SmokeTransition = ({ locationKey }: { locationKey: string }) => {
  const smokeElements = [
    { width: 200, height: 120, left: 5, delay: 0, duration: 1.4, xDrift: 40 },
    { width: 280, height: 160, left: 20, delay: 0.05, duration: 1.5, xDrift: -30 },
    { width: 320, height: 180, left: 40, delay: 0.1, duration: 1.6, xDrift: 50 },
    { width: 260, height: 150, left: 60, delay: 0.08, duration: 1.45, xDrift: -45 },
    { width: 220, height: 130, left: 75, delay: 0.12, duration: 1.55, xDrift: 35 },
    { width: 180, height: 100, left: 88, delay: 0.15, duration: 1.35, xDrift: -25 },
  ];

  return (
    <motion.div
      key={`smoke-${locationKey}`}
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 9999 }}
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
    >
      <motion.div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, rgba(15,15,15,0.97) 0%, rgba(25,25,25,0.92) 50%, rgba(35,35,35,0.85) 100%)"
        }}
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      />

      {smokeElements.map((smoke, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            width: `${smoke.width}px`,
            height: `${smoke.height}px`,
            left: `${smoke.left}%`,
            bottom: "-12%",
            background: `radial-gradient(ellipse, rgba(180, 175, 170, 0.35) 0%, rgba(140, 135, 130, 0.2) 35%, transparent 70%)`,
            filter: "blur(25px)",
            borderRadius: "50%",
          }}
          initial={{ 
            y: 0, 
            opacity: 0.5, 
            scale: 1,
            x: 0,
          }}
          animate={{
            y: -550,
            opacity: 0,
            scale: 2.2,
            x: smoke.xDrift,
          }}
          transition={{
            duration: smoke.duration,
            delay: smoke.delay,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        />
      ))}

      <motion.div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(0deg, rgba(120,115,110,0.12) 0%, transparent 25%)",
        }}
        initial={{ opacity: 0.7, y: 0 }}
        animate={{ opacity: 0, y: -150 }}
        transition={{ duration: 1.1, ease: "easeOut" }}
      />
    </motion.div>
  );
};

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <Routes location={location}>
            <Route path="/" element={<Index />} />
            <Route path="/cigar-brands" element={<CigarBrands />} />
            <Route path="/top-quality" element={<TopQuality />} />
            <Route path="/why-us" element={<WhyUs />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
      <SmokeTransition locationKey={location.pathname} />
    </>
  );
};

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AnimatedRoutes />
          <FloatingCallButton />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
