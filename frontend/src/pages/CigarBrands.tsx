import { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { motion, useScroll, useTransform } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ExternalLink, X, ChevronDown } from "lucide-react";

import bellaFortuna from "@/assets/cigar-bella-fortuna.jpeg";
import monogramme from "@/assets/monogramme-bands.jpeg";
import humidorStore from "@/assets/humidor-store.jpeg";
import cigarDisplay from "@/assets/cigar-display.jpeg";

const cigarBrandGallery = [
  {
    name: "Arturo Fuente",
    shortDesc: "Handcrafted Dominican cigars with timeless heritage.",
    website: "https://www.arturofuente.com",
    tileImage: "/brands/arturo-fuente/tile.jpg",
    content: `Arturo Fuente cigars are known for their exceptional balance, smooth delivery, and refined construction. The smoking experience is medium-bodied and approachable, offering layers of cedar, toasted wood, cream, and gentle spice.`,
  },
  {
    name: "Padron",
    shortDesc: "Bold, full-bodied Nicaraguan excellence.",
    website: "https://padron.com",
    tileImage: "/brands/padron/tile.jpg",
    content: `Padron cigars deliver a rich, full-bodied experience with deep, concentrated flavors. Expect bold notes of cocoa, espresso, dark earth, and black pepper.`,
  },
  {
    name: "Romeo y Julieta",
    shortDesc: "Classic smooth cigars with refined balance.",
    website: "https://www.romeoyjulieta.com",
    tileImage: "/brands/romeo-y-julieta/tile.jpg",
    content: `Romeo y Julieta cigars are smooth, aromatic, and easygoing, offering a mild-to-medium-bodied profile with light cedar and toasted nuts.`,
  },
  {
    name: "Partagas",
    shortDesc: "Rich, earthy cigars with bold character.",
    website: "https://www.partagas.com",
    tileImage: "/brands/partagas/tile.jpg",
    content: `Partagas cigars are bold and earthy with a traditional, robust character and rich earth, leather, and black pepper notes.`,
  },
  {
    name: "Perdomo",
    shortDesc: "Family-crafted cigars with exceptional consistency.",
    website: "https://perdomocigars.com",
    tileImage: "/brands/perdomo/tile.jpg",
    content: `Perdomo cigars offer smooth strength with well-integrated flavors including cedar, cocoa, roasted coffee, and mild spice.`,
  },
  {
    name: "Oliva",
    shortDesc: "Award-winning Nicaraguan cigars.",
    website: "https://olivacigar.com",
    tileImage: "/brands/oliva/tile.jpg",
    content: `Oliva cigars are bold, flavorful, and richly textured, featuring earthy spice, cocoa, and hints of pepper.`,
  },
  {
    name: "Drew Estate",
    shortDesc: "Innovative blends with modern flair.",
    website: "https://drewestate.com",
    tileImage: "/brands/Drew Estate/tile.jpg",
    content: `Drew Estate cigars are expressive and unconventional, offering both traditional and infused smoking experiences.`,
  },
  {
    name: "Montecristo",
    shortDesc: "Iconic cigars with smooth sophistication.",
    website: "https://www.montecristocigars.com",
    tileImage: "/brands/montecristo/tile.jpg",
    content: `Montecristo cigars are smooth, refined, and consistently elegant with creamy textures and notes of cedar and almond.`,
  },
  {
    name: "Rocky Patel",
    shortDesc: "Modern blends with bold character.",
    website: "https://rockypatel.com",
    tileImage: "/brands/rocky-patel/tile.jpg",
    content: `Rocky Patel cigars deliver layered complexity with flavors of spice, leather, cocoa, and roasted coffee.`,
  },
  {
    name: "EP Carrillo",
    shortDesc: "Boutique cigars with Cuban-seed roots.",
    website: "https://epcarrillo.com",
    tileImage: "/brands/ep-carrillo/tile.jpg",
    content: `EP Carrillo cigars focus on balance and precision, offering medium-bodied profiles with refined transitions.`,
  },
  {
    name: "La Flor Dominicana",
    shortDesc: "Powerful cigars with bold personality.",
    website: "https://lfdcigars.com",
    tileImage: "/brands/la-flor-dominicana/tile.jpg",
    content: `La Flor Dominicana cigars are powerful and assertive, designed for smokers who enjoy intensity.`,
  },
  {
    name: "Foundation",
    shortDesc: "Tradition-inspired boutique cigars.",
    website: "https://foundationcigarcompany.com",
    tileImage: "/brands/foundation/tile.jpg",
    content: `Foundation cigars emphasize depth and balance with earthy, spicy, and woody characteristics.`,
  },
  {
    name: "AJ Fernandez",
    shortDesc: "Nicaraguan powerhouse blends.",
    website: "https://ajfcigars.com",
    tileImage: "/brands/aj-fernandez/tile.jpg",
    content: `AJ Fernandez cigars are rich, bold, and unapologetically powerful with pronounced spice and espresso notes.`,
  },
  {
    name: "Tatiana",
    shortDesc: "Aromatic flavored cigars for all occasions.",
    website: "https://miamigarfactory.com/tatiana",
    tileImage: "/brands/tatiana/tile.jpg",
    content: `Tatiana cigars offer a smooth, aromatic experience with a variety of infused flavors. Perfect for those who enjoy a lighter, sweeter smoking experience.`,
  },
  {
    name: "My Father",
    shortDesc: "Award-winning full-bodied cigars.",
    website: "https://myfathercigars.com",
    tileImage: "/brands/my-father/tile.jpg",
    content: `My Father cigars deliver full-bodied richness with complex, evolving flavors of cocoa, black pepper, and earth.`,
  },
  {
    name: "H. Upmann",
    shortDesc: "Historic brand with refined elegance.",
    website: "https://www.hupmann.com",
    tileImage: "/brands/h-upmann/tile.jpg",
    content: `H. Upmann cigars are known for their refined, medium-bodied profile with notes of cedar, cream, and subtle spice. A classic choice for discerning smokers.`,
  },
  {
    name: "Macanudo",
    shortDesc: "Smooth, accessible premium cigars.",
    website: "https://www.macanudo.com",
    tileImage: "/brands/macanudo/tile.jpg",
    content: `Macanudo cigars are celebrated for their smooth, mild-to-medium profile with creamy flavors and consistent construction. An excellent choice for all experience levels.`,
  },
  {
    name: "Bolivar",
    shortDesc: "Bold, full-bodied Cuban-seed heritage.",
    website: "https://www.bolivarcigars.com",
    tileImage: "/brands/bolivar/tile.jpg",
    content: `Bolivar cigars are known for their bold, full-bodied character with rich notes of earth, leather, and dark spice. A powerful smoke for experienced enthusiasts.`,
  },
  {
    name: "Baccarat",
    shortDesc: "Sweet, approachable flavored cigars.",
    website: "https://www.baccaratcigars.com",
    tileImage: "/brands/baccarat/tile.jpg",
    content: `Baccarat cigars feature a sweet, mild profile with a honey-tipped cap. Perfect for those seeking a smooth, aromatic smoking experience.`,
  },
  {
    name: "CAO",
    shortDesc: "Creative blends with unique character.",
    website: "https://www.caocigars.com",
    tileImage: "/brands/cao/tile.jpg",
    content: `CAO cigars are known for their innovative blends and bold flavors, ranging from spicy and complex to smooth and creamy across their diverse lineup.`,
  },
  {
    name: "Plasencia",
    shortDesc: "Family tradition, exceptional tobacco.",
    website: "https://plasenciacigars.com",
    tileImage: "/brands/plasencia/tile.jpg",
    content: `Plasencia cigars represent generations of tobacco expertise, delivering rich, complex flavors with impeccable construction and premium aged tobaccos.`,
  },
  {
    name: "Cohiba",
    shortDesc: "Luxury Dominican-made cigars.",
    website: "https://www.cohibacigars.com",
    tileImage: "/brands/cohiba-dr/tile.jpg",
    content: `Cohiba Dominican Republic cigars are smooth, elegant, and luxurious with creamy textures. Made in the Dominican Republic with premium aged tobaccos.`,
  },
  {
    name: "Ashton",
    shortDesc: "Elegant, smooth premium cigars.",
    website: "https://ashtoncigar.com",
    tileImage: "/brands/ashton/tile.jpg",
    content: `Ashton cigars are known for elegance and consistency, delivering creamy, smooth profiles.`,
  },
  {
    name: "Gurkha",
    shortDesc: "Luxury cigars with exotic blends.",
    website: "https://gurkhacigars.com",
    tileImage: "/brands/gurkha/tile.jpg",
    content: `Gurkha cigars are known for their opulent presentation and exotic blends, offering rich, complex flavors with premium aged tobaccos from around the world.`,
  },
  {
    name: "Diesel",
    shortDesc: "Bold, powerful full-bodied cigars.",
    website: "https://dieselcigars.com",
    tileImage: "/brands/diesel/tile.jpg",
    content: `Diesel cigars deliver bold, full-bodied strength with intense flavors of espresso, dark chocolate, and pepper. Made for smokers who crave power.`,
  },
  {
    name: "La Gloria Cubana",
    shortDesc: "Classic Cuban-seed craftsmanship.",
    website: "https://www.lagloriacubana.com",
    tileImage: "/brands/la-gloria-cubana/tile.jpg",
    content: `La Gloria Cubana cigars honor traditional Cuban-seed cigar-making with rich, full-bodied profiles featuring notes of earth, leather, and sweet spice.`,
  },
];

const ParallaxSection = ({
  image,
  children,
  className = "",
}: {
  image: string;
  children: React.ReactNode;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  return (
    <section ref={ref} className={`relative min-h-screen overflow-hidden flex items-center ${className}`} style={{ position: "relative" }}>
      <motion.div className="absolute inset-0" style={{ y, position: "absolute" }}>
        <img src={image} alt="" className="w-full h-[130%] object-cover" />
        <div className="absolute inset-0 bg-black/70" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(212,175,55,0.1),transparent_55%)]" />
      </motion.div>
      <div className="section-container relative z-10 py-24" style={{ position: "relative" }}>
        {children}
      </div>
    </section>
  );
};

const CigarBrands = () => {
  const [activeBrand, setActiveBrand] = useState<typeof cigarBrandGallery[0] | null>(null);

  useEffect(() => {
    document.body.style.overflow = activeBrand ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [activeBrand]);

  return (
    <>
      <Helmet>
        <title>Premium Cigar Brands in Reading, PA | Smokies Cigar Lounge</title>
        <meta
          name="description"
          content="Explore our extensive collection of premium cigar brands at Smokies Cigar Lounge in Reading, PA. From Arturo Fuente to Padron, find your perfect smoke."
        />
      </Helmet>

      <Header />

      <main className="overflow-hidden">
        <ParallaxSection image={humidorStore}>
          <div className="max-w-4xl mx-auto text-center">
            <motion.p
              className="text-gold font-medium mb-4 tracking-[0.3em] uppercase text-sm"
              initial={{ opacity: 0, y: -50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              Reading, Pennsylvania
            </motion.p>
            <motion.h1
              className="font-display text-4xl md:text-5xl lg:text-6xl text-cream mb-6 leading-tight"
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.1, ease: "easeOut" }}
            >
              Our Cigar
              <br />
              <span className="text-gold">Collection</span>
            </motion.h1>
            <motion.p
              className="text-cream/80 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-8"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeIn" }}
            >
              Explore our wide selection of hand-rolled cigars from around the world, kept in perfect condition and waiting for you.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
              className="flex justify-center"
            >
              <ChevronDown className="w-8 h-8 text-gold animate-bounce" />
            </motion.div>
          </div>
        </ParallaxSection>

        <ParallaxSection image={bellaFortuna}>
          <div className="max-w-5xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, x: -80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: "easeOut" }}
            >
              <p className="text-gold font-medium mb-4 tracking-[0.3em] uppercase text-sm">
                Our Products
              </p>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-cream">
                Signature
                <br />
                <span className="text-gold">In-House Selections</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <motion.div
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="text-center"
              >
                <img 
                  src={bellaFortuna} 
                  alt="Bella Fortuna Cigars"
                  className="w-full h-64 object-cover rounded-lg mb-6"
                />
                <h3 className="text-3xl text-cream font-display mb-4">Bella Fortuna</h3>
                <p className="text-cream/70 text-lg leading-relaxed">
                  Crafted for smokers who value balance, smoothness, and a composed smoking experience. Our signature blend delivers refined flavors with every draw.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.15, ease: "easeIn" }}
                className="text-center"
              >
                <img 
                  src={monogramme} 
                  alt="Monogram Cigars"
                  className="w-full h-64 object-cover rounded-lg mb-6"
                />
                <h3 className="text-3xl text-cream font-display mb-4">Monogramme</h3>
                <p className="text-cream/70 text-lg leading-relaxed">
                  Understated luxury crafted for everyday enjoyment. A smooth, approachable cigar that never compromises on quality.
                </p>
              </motion.div>
            </div>
          </div>
        </ParallaxSection>

        <ParallaxSection image={cigarDisplay}>
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: -60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: "easeOut" }}
            >
              <p className="text-gold font-medium mb-4 tracking-[0.3em] uppercase text-sm">
                Premium Brands
              </p>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-cream mb-4">
                World-Class
                <br />
                <span className="text-gold">Selection</span>
              </h2>
              <p className="text-cream/70 text-lg max-w-2xl mx-auto">
                Click any brand to learn more about their unique flavor profiles and heritage.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {cigarBrandGallery.map((brand, index) => {
                const directions = [
                  { x: -40, y: 0 },
                  { x: 40, y: 0 },
                  { x: 0, y: -40 },
                  { x: 0, y: 40 },
                ];
                const dir = directions[index % 4];
                const easing = index % 2 === 0 ? "easeIn" : "easeOut";
                return (
                <motion.button
                  key={brand.name}
                  onClick={() => setActiveBrand(brand)}
                  initial={{ 
                    opacity: 0, 
                    x: dir.x,
                    y: dir.y
                  }}
                  whileInView={{ opacity: 1, y: 0, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.04, ease: easing }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="group text-left focus:outline-none"
                >
                  <div className="relative overflow-hidden rounded-lg mb-3">
                    <img
                      src={brand.tileImage}
                      alt={brand.name}
                      className="w-full h-32 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <h3 className="text-cream font-display text-sm group-hover:text-gold transition-colors">
                        {brand.name}
                      </h3>
                    </div>
                  </div>
                  <p className="text-cream/50 text-xs leading-relaxed group-hover:text-cream/70 transition-colors">
                    {brand.shortDesc}
                  </p>
                </motion.button>
                );
              })}
            </div>
          </div>
        </ParallaxSection>
      </main>

      {activeBrand && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4"
          onClick={() => setActiveBrand(null)}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="bg-charcoal rounded-2xl w-full max-w-2xl max-h-[80vh] flex flex-col overflow-hidden border border-gold/20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-border bg-charcoal-deep">
              <h2 className="text-2xl text-cream font-display">
                {activeBrand.name}
              </h2>
              <button
                onClick={() => setActiveBrand(null)}
                className="text-cream/60 hover:text-cream transition-colors focus:outline-none"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <p className="text-cream/80 text-lg leading-relaxed">
                {activeBrand.content}
              </p>

              <a
                href={activeBrand.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-gold hover:text-gold/80 transition-colors font-medium"
              >
                Visit Official Website <ExternalLink size={18} />
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}

      <Footer />
    </>
  );
};

export default CigarBrands;
