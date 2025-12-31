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
import AdminLogin from "./pages/AdminLogin";
import AdminInstagram from "./pages/AdminInstagram";
import CigarCursor from "@/components/CigarCursor";

const queryClient = new QueryClient();

const SmokeOverlay = ({ locationKey }: { locationKey: string }) => {
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
          background: "linear-gradient(180deg, rgba(20,20,20,0.95) 0%, rgba(30,30,30,0.9) 50%, rgba(40,40,40,0.85) 100%)"
        }}
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />

      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: `${120 + i * 80}px`,
            height: `${80 + i * 50}px`,
            left: `${5 + i * 10}%`,
            bottom: "-15%",
            background: `radial-gradient(ellipse, rgba(180, 180, 180, ${0.4 - i * 0.04}) 0%, rgba(120, 120, 120, ${0.2 - i * 0.02}) 40%, transparent 70%)`,
            filter: `blur(${25 + i * 8}px)`,
          }}
          initial={{ 
            y: 0, 
            opacity: 0.5 + Math.random() * 0.2, 
            scale: 1,
            x: 0,
          }}
          animate={{
            y: -600 - i * 100,
            opacity: 0,
            scale: 2 + i * 0.3,
            x: (i % 2 === 0 ? 1 : -1) * (30 + i * 15),
          }}
          transition={{
            duration: 1.5 + i * 0.15,
            delay: i * 0.08,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        />
      ))}

      {[...Array(12)].map((_, i) => (
        <motion.div
          key={`wisp-${i}`}
          className="absolute"
          style={{
            width: `${60 + Math.random() * 80}px`,
            height: `${40 + Math.random() * 60}px`,
            left: `${Math.random() * 90}%`,
            bottom: `${-10 + Math.random() * 20}%`,
            background: `radial-gradient(ellipse, rgba(200, 200, 200, ${0.25 + Math.random() * 0.15}) 0%, transparent 70%)`,
            filter: `blur(${20 + Math.random() * 15}px)`,
            borderRadius: "50%",
          }}
          initial={{ 
            y: 0, 
            opacity: 0.4 + Math.random() * 0.3,
            scale: 0.8,
            rotate: Math.random() * 360,
          }}
          animate={{
            y: -400 - Math.random() * 300,
            opacity: 0,
            scale: 1.5 + Math.random() * 0.5,
            rotate: Math.random() * 180,
            x: (Math.random() - 0.5) * 100,
          }}
          transition={{
            duration: 1.2 + Math.random() * 0.6,
            delay: Math.random() * 0.3,
            ease: [0.4, 0, 0.2, 1],
          }}
        />
      ))}

      <motion.div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(0deg, rgba(100,100,100,0.15) 0%, transparent 30%)",
        }}
        initial={{ opacity: 0.8, y: 0 }}
        animate={{ opacity: 0, y: -200 }}
        transition={{ duration: 1.4, ease: "easeOut" }}
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
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/instagram" element={<AdminInstagram />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
      <SmokeOverlay locationKey={location.pathname} />
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
