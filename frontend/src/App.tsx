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
import CigarCursor from "@/components/CigarCursor";

const queryClient = new QueryClient();

const SmokeTransition = ({ locationKey }: { locationKey: string }) => {
  return (
    <motion.div
      key={`smoke-${locationKey}`}
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 9999 }}
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, rgba(20,20,20,0.95) 0%, rgba(30,30,30,0.85) 100%)"
        }}
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />

      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: `${150 + i * 100}px`,
            height: `${100 + i * 60}px`,
            left: `${10 + i * 20}%`,
            bottom: "-10%",
            background: `radial-gradient(ellipse, rgba(160, 160, 160, ${0.3 - i * 0.05}) 0%, transparent 70%)`,
            filter: `blur(${30 + i * 10}px)`,
          }}
          initial={{ y: 0, opacity: 0.4, scale: 1 }}
          animate={{ y: -400 - i * 80, opacity: 0, scale: 1.8 }}
          transition={{
            duration: 1 + i * 0.1,
            delay: i * 0.05,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        />
      ))}
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
    <CigarCursor />  
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AnimatedRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
