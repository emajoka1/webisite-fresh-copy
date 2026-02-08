import { motion, useScroll, useTransform } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowUpRight, Layers, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";
import { useRef } from "react";
import { Link } from "wouter";

// Assets
import heroVideo from "@/assets/videos/hero-habitat-premium.mp4";
import meadowImg from "@/assets/images/meadow-dark.jpg";
import architectureImg from "@/assets/images/architecture-dark.jpg";
import pondImg from "@/assets/images/cross-nursery-pond.png";

export default function ProjectCrossNursery() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1.03, 1.14]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0.92]);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground">
      <Navbar />
      
      <main ref={containerRef}>
        {/* Hero Section */}
        <section className="hero-shell h-screen w-full flex flex-col justify-end pb-24 px-6 md:px-12 border-b border-secondary-foreground/12">
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
                <div className="absolute inset-0 hero-overlay-structured opacity-[0.92]" />
                <div className="absolute inset-0 pointer-events-none hero-brand-wash opacity-[0.4]" />
                <div className="absolute inset-y-0 left-0 w-[72%] hero-side-fade" />
                <div className="absolute left-0 right-0 bottom-0 h-[62%] hero-bottom-fade" />
                <div className="absolute inset-0 opacity-[0.09] pointer-events-none hero-noise-soft" />
                <div className="absolute inset-0 ring-1 ring-secondary-foreground/8" aria-hidden="true" />
            </div>

            <div className="hero-content-shell grid grid-cols-1 md:grid-cols-12 gap-12 items-end">
                <div className="md:col-span-8">
                    <div className="flex items-center gap-4 mb-8">
                       <span className="h-[1px] w-12 bg-[var(--color-primary)]" />
                       <span className="kicker text-primary" data-testid="text-cross-nursery-hero-kicker">Case Study: Cross Nursery</span>
                    </div>
                    
                    <h1 className="text-[11vw] md:text-[7vw] leading-[0.82] tracking-[-0.055em] hero-title-light mb-8" data-testid="text-cross-nursery-hero-title">
                      <span className="display-title">Regenerative</span><br />
                      <span className="text-transparent stroke-text-white display-title">Infrastructure.</span>
                    </h1>
                </div>
                <div className="md:col-span-4 flex flex-col justify-end pb-4">
                    <div className="border-l border-primary/70 pl-6 mb-8">
                        <p className="hero-copy-light text-xl font-light leading-relaxed" data-testid="text-cross-nursery-hero-summary">
                            A 30-year ecological framework integrating 14 bespoke residences into a regenerative landscape.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-[10px] font-mono uppercase tracking-[0.22em] tone-on-dark-whisper" data-testid="grid-cross-nursery-hero-metadata">
                        <div data-testid="block-cross-nursery-meta-location">
                            <span className="block text-primary mb-1" data-testid="text-cross-nursery-meta-location-label">Location</span>
                            <span className="block text-sm normal-case tracking-normal font-semibold tone-on-dark-supporting" data-testid="text-cross-nursery-meta-location-value">Goffs Oak, Herts</span>
                        </div>
                        <div data-testid="block-cross-nursery-meta-client">
                            <span className="block text-primary mb-1" data-testid="text-cross-nursery-meta-client-label">Client</span>
                            <span className="block text-sm normal-case tracking-normal font-semibold tone-on-dark-supporting" data-testid="text-cross-nursery-meta-client-value">Custom Build Homes</span>
                        </div>
                        <div data-testid="block-cross-nursery-meta-metric">
                            <span className="block text-primary mb-1" data-testid="text-cross-nursery-meta-metric-label">Metric</span>
                            <span className="block text-sm normal-case tracking-normal font-semibold tone-on-dark-supporting" data-testid="text-cross-nursery-meta-metric-value">Biodiversity 3.1</span>
                        </div>
                        <div data-testid="block-cross-nursery-meta-duration">
                            <span className="block text-primary mb-1" data-testid="text-cross-nursery-meta-duration-label">Duration</span>
                            <span className="block text-sm normal-case tracking-normal font-semibold tone-on-dark-supporting" data-testid="text-cross-nursery-meta-duration-value">30-Year HMMP</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Strategic Overview */}
        <section className="py-32 px-6 md:px-12 border-b border-foreground/10 bg-background text-foreground">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
                    <div className="md:col-span-4 sticky top-32 h-fit">
                        <h2 className="text-4xl md:text-5xl leading-[0.92] mb-8">
                          <span className="editorial-title">The brief,</span> <span className="text-primary editorial-title">strategically framed.</span>
                        </h2>
                        <p className="tone-supporting text-lg leading-relaxed mb-8">
                            Transform a redundant plant nursery and glasshouse site into a thriving residential community without compromising the ecological integrity of the adjacent Wormley Hoddesdonpark Woods SAC.
                        </p>
                        <Magnetic>
                            <Button variant="outline" className="rounded-full border-foreground/20 bg-transparent text-foreground hover:bg-secondary hover:text-secondary-foreground w-full justify-between h-14 px-6 group transition-all duration-300" data-testid="button-cross-nursery-download-hmmp">
                                <span className="micro-eyebrow" data-testid="text-cross-nursery-download-hmmp">Download HMMP Executive Summary</span>
                                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </Button>
                        </Magnetic>
                    </div>
                    <div className="md:col-span-7 md:col-start-6 space-y-24">
                        <div>
                            <h3 className="text-3xl leading-tight mb-6 flex items-center gap-4">
                                <Layers className="text-[var(--color-primary)]" /> Baseline Conditions
                            </h3>
                            <p className="tone-supporting text-lg leading-relaxed font-light mb-6">
                                The 1.94ha site was dominated by sealed surfaces and agricultural infrastructure. Our baseline assessment identified critical retention targets: 0.17km of native hedgerow and a 0.049ha pond requiring immediate restoration. The challenge was to introduce 14 self-build plots while delivering measurable net gain.
                            </p>
                            <div className="card-metal rounded-2xl p-8 border-l-2 border-[var(--color-primary)]">
                                <span className="micro-eyebrow text-[var(--color-primary)] block mb-2">Key Constraint</span>
                                <p className="tone-supporting italic">"Proximity to Wormley Hoddesdonpark Woods SAC required a rigorous Regulation 63 assessment to mitigate recreational pressure and hydrological impacts."</p>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-3xl leading-tight mb-6 flex items-center gap-4">
                                <Leaf className="text-[var(--color-primary)]" /> The Intervention
                            </h3>
                            <p className="tone-supporting text-lg leading-relaxed font-light mb-8">
                                We engineered a phased Habitat Management and Monitoring Plan (HMMP) that treats biodiversity as critical infrastructure. The strategy phases habitat creation over 5 years, ensuring establishment before full occupation.
                            </p>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <li className="group">
                                    <div className="h-[1px] w-full bg-foreground/10 mb-4 group-hover:bg-[var(--color-primary)] transition-colors"></div>
                                    <h4 className="text-xl font-semibold tracking-tight mb-2">Habitat Creation</h4>
                                    <p className="tone-whisper text-sm">0.15ha neutral grassland and 0.19ha mixed scrub mosaic.</p>
                                </li>
                                <li className="group">
                                    <div className="h-[1px] w-full bg-foreground/10 mb-4 group-hover:bg-[var(--color-primary)] transition-colors"></div>
                                    <h4 className="text-xl font-semibold tracking-tight mb-2">Aquatic Strategy</h4>
                                    <p className="tone-whisper text-sm">Restoration of existing ponds and integration of 0.12ha SuDS features.</p>
                                </li>
                                <li className="group">
                                    <div className="h-[1px] w-full bg-foreground/10 mb-4 group-hover:bg-[var(--color-primary)] transition-colors"></div>
                                    <h4 className="text-xl font-semibold tracking-tight mb-2">Linear Connectivity</h4>
                                    <p className="tone-whisper text-sm">0.7km of new native species-rich hedgerow to strengthen corridors.</p>
                                </li>
                                <li className="group">
                                    <div className="h-[1px] w-full bg-foreground/10 mb-4 group-hover:bg-[var(--color-primary)] transition-colors"></div>
                                    <h4 className="text-xl font-semibold tracking-tight mb-2">Urban Forestry</h4>
                                    <p className="tone-whisper text-sm">0.3ha of strategic urban tree planting to mitigate heat island effects.</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Visual Interlude */}
        <section className="relative h-[86vh] w-full overflow-hidden bg-secondary text-secondary-foreground border-y border-secondary-foreground/12" data-testid="section-cross-nursery-interlude">
          <div className="absolute inset-0">
            <div className="absolute inset-0 grid grid-cols-12 gap-0">
              <div className="relative col-span-7 h-[86vh] overflow-hidden" data-testid="panel-cross-nursery-interlude-left">
                <img
                  src={pondImg}
                  alt="Pond restoration and wildflower margin"
                  className="absolute inset-0 w-full h-full object-cover img-grade-soft"
                  data-testid="img-cross-nursery-pond"
                />
                <div className="absolute inset-0 bg-[radial-gradient(900px_520px_at_18%_18%,rgba(198,255,46,0.32),transparent_55%),linear-gradient(to_top,rgba(20,26,43,0.93),rgba(20,26,43,0.4),transparent)]" />

                <div className="absolute left-8 md:left-12 bottom-10 md:bottom-14 max-w-xl" data-testid="block-cross-nursery-interlude-caption">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="micro-eyebrow text-[var(--color-primary)]" data-testid="text-cross-nursery-interlude-index">03</span>
                    <span className="h-[1px] w-10 bg-secondary-foreground/24" aria-hidden="true" />
                    <span className="micro-eyebrow text-secondary-foreground/58" data-testid="text-cross-nursery-interlude-label">Aquatic edge</span>
                  </div>
                  <p className="text-secondary-foreground/88 text-lg md:text-xl leading-relaxed font-light" data-testid="text-cross-nursery-interlude-copy">
                    Pond restoration, reedbed structure, and a species-rich margin—designed as habitat first, and experienced as landscape.
                  </p>
                </div>
              </div>

              <div className="relative col-span-5 h-[86vh] border-l border-secondary-foreground/12" data-testid="panel-cross-nursery-interlude-right">
                <div className="absolute inset-0 grid grid-rows-2">
                  <div className="relative overflow-hidden" data-testid="panel-cross-nursery-interlude-top">
                    <img
                      src={architectureImg}
                      alt="Proposed architecture"
                      className="absolute inset-0 w-full h-full object-cover grayscale opacity-60"
                      data-testid="img-cross-nursery-architecture"
                    />
                    <div className="absolute inset-0 bg-secondary/55 mix-blend-multiply" />
                    <div className="absolute bottom-6 left-6 right-6" data-testid="cap-cross-nursery-architecture">
                      <div className="micro-eyebrow text-secondary-foreground/46" data-testid="text-cross-nursery-architecture-caption">
                        Built form, held quiet.
                      </div>
                    </div>
                  </div>

                  <div className="relative overflow-hidden border-t border-secondary-foreground/12" data-testid="panel-cross-nursery-interlude-bottom">
                    <img
                      src={meadowImg}
                      alt="Habitat creation"
                      className="absolute inset-0 w-full h-full object-cover grayscale opacity-60"
                      data-testid="img-cross-nursery-meadow"
                    />
                    <div className="absolute inset-0 bg-[var(--color-primary)]/10 mix-blend-overlay" />
                    <div className="absolute bottom-6 left-6 right-6" data-testid="cap-cross-nursery-meadow">
                      <div className="micro-eyebrow text-secondary-foreground/46" data-testid="text-cross-nursery-meadow-caption">
                        Establishment years, measured.
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute inset-0 pointer-events-none flex items-center justify-center" data-testid="overlay-cross-nursery-interlude-title">
                  <h2 className="text-[14vw] font-black uppercase tracking-tighter text-secondary-foreground mix-blend-overlay opacity-45">Phased</h2>
                </div>
              </div>
            </div>

            <div className="absolute inset-0 opacity-[0.10] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.06'/%3E%3C/svg%3E")` }} />
          </div>

          <div className="absolute inset-0 border border-secondary-foreground/12 pointer-events-none" aria-hidden="true" />
        </section>

        {/* The 30-Year Plan */}
        <section className="py-32 px-6 md:px-12 bg-secondary/95 text-secondary-foreground border-b border-secondary-foreground/12 relative overflow-hidden">
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="mb-24">
                     <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter mb-8 text-secondary-foreground">
                        Long-Term <br/>
                        <span className="text-[var(--color-primary)]">Stewardship.</span>
                     </h2>
                     <p className="text-secondary-foreground/66 text-xl max-w-2xl font-light">
                        Biodiversity is not a box-ticking exercise. It is a durational commitment. Our 30-year roadmap ensures the landscape matures alongside the community.
                     </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                     {[
                        { title: "Establishment", years: "Years 1-2", desc: "Site preparation, initial planting, and protection of retained habitats. Quarterly monitoring of aquatic features." },
                        { title: "Maturation", years: "Years 3-5", desc: "Targeted management of grassland and scrub to meet BNG condition criteria. Remedial planting where necessary." },
                        { title: "Consolidation", years: "Years 6-10", desc: "Transition to long-term management regimes. Canopy management of urban trees and hedgerow laying." },
                        { title: "Legacy", years: "Years 11-30", desc: "Periodic ecological auditing and adaptive management to respond to climate resilience requirements." }
                     ].map((phase, i) => (
                        <div key={i} className="group border-t border-secondary-foreground/22 pt-8 hover:border-[var(--color-primary)] transition-colors duration-500">
                            <span className="font-mono text-xs text-[var(--color-primary)] uppercase tracking-widest mb-4 block">{phase.years}</span>
                            <h3 className="text-2xl font-bold uppercase tracking-tight mb-4 group-hover:text-secondary-foreground transition-colors">{phase.title}</h3>
                            <p className="text-secondary-foreground/56 text-sm leading-relaxed">{phase.desc}</p>
                        </div>
                     ))}
                </div>
            </div>
        </section>

        {/* Footer Navigation */}
        <section className="py-24 px-6 md:px-12 bg-secondary text-secondary-foreground">
             <div className="flex justify-between items-center border-t border-secondary-foreground/12 pt-12">
                 <div className="text-left">
                     <Link href="/projects/potters-bar" className="group">
                        <span className="font-mono text-xs text-secondary-foreground/42 uppercase tracking-widest block mb-2 group-hover:text-[var(--color-primary)] transition-colors">Previous Case Study</span>
                        <span className="text-xl md:text-3xl font-bold uppercase tracking-tight text-secondary-foreground/66 group-hover:text-secondary-foreground transition-colors">Potters Bar FC</span>
                     </Link>
                 </div>
                 <div className="text-right">
                     <Link href="/projects/st-julians" className="group">
                        <span className="font-mono text-xs text-secondary-foreground/42 uppercase tracking-widest block mb-2 group-hover:text-[var(--color-primary)] transition-colors">Next Case Study</span>
                        <span className="text-xl md:text-3xl font-bold uppercase tracking-tight text-secondary-foreground/66 group-hover:text-secondary-foreground transition-colors">St Julians</span>
                     </Link>
                 </div>
             </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
