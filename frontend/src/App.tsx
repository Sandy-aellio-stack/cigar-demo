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

const PageTransition = ({ locationKey }: { locationKey: string }) => {
  return (
    <motion.div
      key={`transition-${locationKey}`}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 9999, background: "rgba(20,20,20,0.9)" }}
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    />
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
      <PageTransition locationKey={location.pathname} />
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
