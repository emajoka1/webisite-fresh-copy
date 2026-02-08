import { motion, useScroll, useTransform } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowUpRight } from "lucide-react";
import { Magnetic } from "@/components/ui/magnetic";
import { useRef, useState } from "react";

// Assets
import sectorResidential from "@/assets/images/sector-residential-gen.png";
import sectorEnergy from "@/assets/images/sector-energy-gen.png";
import sectorCommercial from "@/assets/images/sector-commercial-gen.png";
import sectorPublic from "@/assets/images/sector-public-gen.png";
import heroVideo from "@/assets/videos/hero-habitat-premium.mp4";

const sectors = [
  {
    title: "Residential Development",
    desc: "From single plots to major garden communities, we align ecology with phasing, viability, and planning strategy.",
    stat: "15k+",
    statLabel: "Units Enabled",
    image: sectorResidential,
    tags: ["Masterplanning", "Urban Extension", "Regeneration"]
  },
  {
    title: "Energy & Infrastructure",
    desc: "Solar, storage, and linear infrastructure delivered within sensitive landscapes and complex consenting environments.",
    stat: "1.2GW",
    statLabel: "Capacity Consented",
    image: sectorEnergy,
    tags: ["Solar NSIP", "Battery Storage", "Grid Support"]
  },
  {
    title: "Commercial & Logistics",
    desc: "Commercial and logistics sites where ecological compliance must be integrated without slowing programme momentum.",
    stat: "2.5m",
    statLabel: "Sq Ft Delivered",
    image: sectorCommercial,
    tags: ["Industrial Hubs", "Business Parks", "Last Mile"]
  },
  {
    title: "Public Sector",
    desc: "Support for local authorities and public bodies on policy evidence, HRA, and strategic land allocation decisions.",
    stat: "15+",
    statLabel: "LPA Partners",
    image: sectorPublic,
    tags: ["Local Plans", "Policy Formation", "HRA"]
  }
];

export default function Sectors() {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 900], [0, 80]);
  const heroScale = useTransform(scrollY, [0, 900], [1, 1.06]);
  const heroOpacity = useTransform(scrollY, [0, 900], [0.32, 0.18]);
  const [hoveredSector, setHoveredSector] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground">
      <Navbar />
      
      <main ref={containerRef}>
        {/* Hero */}
        <section className="hero-shell min-h-[86vh] flex flex-col justify-end pb-24 md:pb-28 px-6 md:px-12">
            <div className="absolute inset-0 z-0">
                <motion.video 
                    src={heroVideo} 
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                    style={{ y: heroY, scale: heroScale, opacity: heroOpacity }}
                    className="absolute inset-0 w-full h-full object-cover opacity-[0.74] hero-video-grade will-change-transform"
                />
                <div className="absolute inset-0 hero-overlay-structured opacity-[0.95]" />
                <div className="absolute inset-0 pointer-events-none hero-brand-wash opacity-[0.44]" />
                <div className="absolute inset-y-0 left-0 w-[74%] hero-side-fade" />
                <div className="absolute left-0 right-0 bottom-0 h-[62%] hero-bottom-fade"></div>
                <div className="absolute inset-0 opacity-[0.08] pointer-events-none hero-noise-soft"></div>
            </div>

            <div className="hero-content-shell">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-end">
                <div className="lg:col-span-7">
                  <div className="hero-rail mb-8 md:mb-10">
                     <span className="hero-rail-line" />
                     <span className="hero-rail-text">Sector Focus</span>
                  </div>
                  
                  <h1 className="text-[clamp(3.2rem,8.5vw,6.6rem)] leading-[0.85] tracking-[-0.048em] hero-title-light max-w-[9.4ch] mb-8">
                    <span className="display-title">Sector</span><br />
                    <span className="display-title signal-on-light">Integration.</span>
                  </h1>

                  <div className="hero-chip-row">
                    <span className="hero-chip">Residential</span>
                    <span className="hero-chip">Infrastructure</span>
                    <span className="hero-chip">Public Sector</span>
                  </div>
                </div>

                <div className="lg:col-span-5 max-w-[34rem] lg:ml-auto lg:pl-4">
                  <p className="hero-supporting hero-copy-light">
                    <span className="hero-supporting-lead">Strategy shaped by sector dynamics.</span>
                    <span className="hero-supporting-body">
                      Each sector carries a different planning cadence, land constraint profile, and ecological risk model. We adapt delivery accordingly.
                    </span>
                  </p>

                  <div className="mt-9 hero-meta-panel">
                    <div className="hero-meta-grid">
                      <div>
                        <span className="hero-meta-label">Programmes</span>
                        <span className="hero-meta-value">Complex + phased</span>
                      </div>
                      <div>
                        <span className="hero-meta-label">Focus</span>
                        <span className="hero-meta-value">Consent velocity</span>
                      </div>
                      <div>
                        <span className="hero-meta-label">Evidence</span>
                        <span className="hero-meta-value">Defensible outputs</span>
                      </div>
                      <div>
                        <span className="hero-meta-label">Model</span>
                        <span className="hero-meta-value">Sector-specific scope</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </section>

        {/* Sectors List */}
        <div className="flex flex-col border-t border-foreground/10">
            {sectors.map((sector, index) => (
              <div 
                key={sector.title} 
                className="bg-card group relative overflow-hidden border-b border-foreground/10 hover:bg-background/60 transition-colors duration-500 cursor-default"
                onMouseEnter={() => setHoveredSector(index)}
                onMouseLeave={() => setHoveredSector(null)}
              >
                <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="absolute -inset-24 bg-[radial-gradient(ellipse_at_top,rgba(126,180,58,0.2),transparent_55%)]" />
                </div>
                
                <div className="container mx-auto px-6 md:px-12 relative z-10 py-24 md:py-32 grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
                   {/* Index & Title */}
                   <div className="md:col-span-6 relative">
                      <div className="flex items-center gap-4 mb-8 opacity-60 group-hover:opacity-100 transition-opacity">
                        <span className="font-mono text-xs text-primary uppercase tracking-widest">0{index + 1}</span>
                        <div className="h-[1px] w-12 bg-primary/80" />
                      </div>
                      <h2 className="text-5xl md:text-7xl leading-[0.95] mb-8 text-foreground group-hover:text-primary transition-colors duration-500">
                        <span className="editorial-title">{sector.title}</span>
                      </h2>
                      
                      <div className="flex flex-wrap gap-3 mt-8">
                        {sector.tags.map(tag => (
                            <span key={tag} className="px-3 py-1 border border-foreground/15 rounded-full text-[10px] uppercase tracking-widest text-foreground/60 group-hover:border-primary/40 group-hover:text-foreground transition-all">
                                {tag}
                            </span>
                        ))}
                      </div>
                   </div>

                   {/* Description & Stats */}
                   <div className="md:col-span-5 md:col-start-8 flex flex-col justify-between h-full pt-12 md:pt-0">
                      <p className="text-foreground/65 text-xl font-light leading-relaxed mb-12 max-w-lg group-hover:text-foreground transition-colors duration-500">
                        {sector.desc}
                      </p>

                      <div className="flex flex-wrap gap-x-6 gap-y-2 mb-10">
                        <span className="kicker text-foreground/45">Best for</span>
                        <span className="text-sm text-foreground/70">Programmes with complex constraints, phased delivery, and high planning scrutiny.</span>
                      </div>
                      
                      <div className="flex items-end justify-between border-t border-foreground/10 pt-8 group-hover:border-primary/30 transition-colors">
                          <div>
                            <span className="text-xs font-mono uppercase tracking-widest text-primary block mb-2">{sector.statLabel}</span>
                            <span className="text-6xl font-bold tracking-tighter text-foreground block">{sector.stat}</span>
                          </div>
                          <Magnetic>
                            <div className="w-16 h-16 rounded-full border border-foreground/15 flex items-center justify-center group-hover:bg-primary group-hover:border-primary group-hover:text-primary-foreground transition-all duration-300 lift-hover">
                                <ArrowUpRight className="w-6 h-6" />
                            </div>
                          </Magnetic>
                      </div>
                   </div>
                </div>

                {/* Hover Image Reveal - Fixed Position or Absolute to Item */}
                <motion.div 
                    className="absolute top-0 right-0 w-[40%] h-full hidden lg:block opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none mix-blend-lighten"
                    initial={{ x: 100 }}
                    whileHover={{ x: 0 }}
                >
                    <div className="absolute inset-0 bg-gradient-to-l from-background via-background/60 to-transparent z-10"></div>
                    <img src={sector.image} alt={sector.title} className="w-full h-full object-cover grayscale opacity-40" />
                </motion.div>
              </div>
            ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
