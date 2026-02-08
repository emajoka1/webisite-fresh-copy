import { motion, useScroll, useTransform } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowUpRight, Zap, Leaf, ShieldCheck, TrendingUp, EyeOff, TreeDeciduous, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";
import { useRef } from "react";
import { Link } from "wouter";

// Assets
import heroVideo from "@/assets/videos/hero-habitat-premium.mp4";
import solarField from "@/assets/images/solar-field-dark.jpg";
import meadowDark from "@/assets/images/meadow-dark.jpg"; // Using meadow image for grassland context

export default function ProjectPottersBar() {
  const containerRef = useRef(null);
  
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
                    className="absolute inset-0 w-full h-full object-cover opacity-[0.72] hero-video-grade"
                />
                <div className="absolute inset-0 hero-overlay-structured opacity-[0.92]"></div>
                <div className="absolute inset-0 pointer-events-none hero-brand-wash opacity-[0.4]" />
                <div className="absolute inset-y-0 left-0 w-[72%] hero-side-fade"></div>
                <div className="absolute inset-0 hero-bottom-fade"></div>
                <div className="absolute inset-0 opacity-[0.1] pointer-events-none hero-noise-soft"></div>
            </div>

            <div className="hero-content-shell grid grid-cols-1 md:grid-cols-12 gap-12 items-end">
                <div className="md:col-span-8">
                    <div className="flex items-center gap-4 mb-8">
                       <span className="h-[1px] w-12 bg-[var(--color-primary)]" />
                       <span className="kicker text-primary">Case Study: Potters Bar FC</span>
                    </div>
                    
                    <h1 className="text-[11vw] md:text-[7vw] leading-[0.82] tracking-[-0.055em] hero-title-light mb-8">
                      <span className="display-title">Urban</span><br />
                      <span className="text-transparent stroke-text-white display-title">Net Gain.</span>
                    </h1>
                </div>
                <div className="md:col-span-4 flex flex-col justify-end pb-4">
                    <div className="border-l border-primary/70 pl-6 mb-8">
                        <p className="hero-copy-light text-xl font-light leading-relaxed">
                            Delivering 24% Biodiversity Net Gain on a constrained urban sports site without off-site credits.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-[10px] font-mono uppercase tracking-[0.22em] tone-on-dark-whisper">
                        <div>
                            <span className="block text-primary mb-1">Location</span>
                            <span className="block text-sm normal-case tracking-normal font-semibold tone-on-dark-supporting">Potters Bar, Herts</span>
                        </div>
                        <div>
                            <span className="block text-primary mb-1">Constraint</span>
                            <span className="block text-sm normal-case tracking-normal font-semibold tone-on-dark-supporting">Urban Residential</span>
                        </div>
                        <div>
                            <span className="block text-primary mb-1">Gain</span>
                            <span className="block text-sm normal-case tracking-normal font-semibold tone-on-dark-supporting">+24.33% BNG</span>
                        </div>
                        <div>
                            <span className="block text-primary mb-1">Goal</span>
                            <span className="block text-sm normal-case tracking-normal font-semibold tone-on-dark-supporting">Planning Approval</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* The Narrative */}
        <section className="py-32 px-6 md:px-12 bg-secondary text-secondary-foreground border-b border-secondary-foreground/12">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-16">
                <div className="md:col-span-5 sticky top-32 h-fit">
                    <h2 className="text-4xl font-bold uppercase tracking-tight mb-8">The <span className="text-[var(--color-primary)]">Challenge</span></h2>
                    <p className="text-secondary-foreground/66 text-lg leading-relaxed mb-8">
                        Potters Bar Football Club required a new 3G pitch to secure their future. Located in a dense residential area and bounded by private gardens, the site offered minimal scope for ecological expansion.
                    </p>
                    <p className="text-secondary-foreground/66 text-lg leading-relaxed mb-12">
                        The strict statutory requirement for 10% Biodiversity Net Gain presented a significant hurdle. Standard calculations suggested off-site mitigation would be inevitable—adding cost and complexity to the scheme.
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-8">
                        <div className="bg-secondary/95 p-6 border border-secondary-foreground/12">
                            <TrendingUp className="w-6 h-6 text-[var(--color-primary)] mb-4" />
                            <div className="text-3xl font-bold text-secondary-foreground mb-1">24.33%</div>
                            <div className="text-[10px] font-mono uppercase tracking-widest text-secondary-foreground/42">Net Gain Achieved</div>
                        </div>
                        <div className="bg-secondary/95 p-6 border border-secondary-foreground/12">
                            <Activity className="w-6 h-6 text-[var(--color-primary)] mb-4" />
                            <div className="text-3xl font-bold text-secondary-foreground mb-1">100%</div>
                            <div className="text-[10px] font-mono uppercase tracking-widest text-secondary-foreground/42">On-Site Delivery</div>
                        </div>
                    </div>
                </div>

                <div className="md:col-span-7 space-y-24">
                    <div>
                        <img src={meadowDark} alt="Enhanced Grassland Habitat" className="w-full h-[400px] object-cover grayscale opacity-80 mb-8" />
                        <h3 className="text-2xl font-bold uppercase tracking-tight mb-6 flex items-center gap-4">
                            <ShieldCheck className="text-[var(--color-primary)]" /> Strategic Intervention
                        </h3>
                        <p className="text-secondary-foreground/88 text-lg leading-relaxed font-light mb-6">
                            Our Preliminary Ecological Appraisal (PEA) identified the baseline value as low-grade amenity grass. Rather than viewing the 3G pitch as a loss, we re-engineered the remaining 4,100sqm of soft landscape.
                        </p>
                        <p className="text-secondary-foreground/88 text-lg leading-relaxed font-light">
                            By transitioning from standard turf to modified species-rich grassland, we unlocked significant ecological credits within the red line boundary. This approach negated the need for expensive off-site solutions.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-2xl font-bold uppercase tracking-tight mb-6 flex items-center gap-4">
                            <Leaf className="text-[var(--color-primary)]" /> The Species Mix
                        </h3>
                        <p className="text-secondary-foreground/88 text-lg leading-relaxed font-light mb-8">
                             We specified a robust wildflower and grass mix designed to thrive in the site's specific soil conditions, transforming a monoculture into a functional pollinator habitat.
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-secondary-foreground/12 pt-8">
                            <div>
                                <h4 className="font-mono text-xs text-[var(--color-primary)] uppercase tracking-widest mb-4">Grass Species</h4>
                                <ul className="space-y-2 text-sm text-secondary-foreground/66">
                                    <li className="flex items-center gap-2"><div className="w-1 h-1 bg-secondary-foreground/58 rounded-full"></div>Red Fescue (Festuca rubra)</li>
                                    <li className="flex items-center gap-2"><div className="w-1 h-1 bg-secondary-foreground/58 rounded-full"></div>Common Bent (Agrostis capillaris)</li>
                                    <li className="flex items-center gap-2"><div className="w-1 h-1 bg-secondary-foreground/58 rounded-full"></div>Sweet Vernal Grass</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-mono text-xs text-[var(--color-primary)] uppercase tracking-widest mb-4">Wildflower Introduction</h4>
                                <ul className="space-y-2 text-sm text-secondary-foreground/66">
                                    <li className="flex items-center gap-2"><div className="w-1 h-1 bg-secondary-foreground/58 rounded-full"></div>Bird's-foot Trefoil</li>
                                    <li className="flex items-center gap-2"><div className="w-1 h-1 bg-secondary-foreground/58 rounded-full"></div>Common Knapweed</li>
                                    <li className="flex items-center gap-2"><div className="w-1 h-1 bg-secondary-foreground/58 rounded-full"></div>Oxeye Daisy</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Visual Break */}
        <section className="relative h-[70vh] w-full overflow-hidden">
             <div className="absolute inset-0">
                <img src={solarField} alt="Abstract Landscape" className="w-full h-full object-cover grayscale opacity-50" />
                <div className="absolute inset-0 bg-secondary/60 mix-blend-multiply"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-secondary via-transparent to-secondary"></div>
             </div>
             
             <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                 <span className="font-mono text-xs text-[var(--color-primary)] uppercase tracking-[0.3em] mb-8">Project Outcome</span>
                 <h2 className="text-[8vw] md:text-[6vw] font-black uppercase tracking-tighter text-secondary-foreground leading-none mb-4 mix-blend-overlay">
                     Metric 4.0
                 </h2>
                 <div className="text-4xl md:text-6xl font-bold text-secondary-foreground tracking-tighter">
                    +24.33%
                 </div>
             </div>
        </section>

        {/* The Strategy Details */}
        <section className="py-32 px-6 md:px-12 bg-secondary/95 text-secondary-foreground">
            <div className="max-w-7xl mx-auto">
                <div className="mb-24">
                     <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter mb-8 text-secondary-foreground">
                        Delivery <br/>
                        <span className="text-[var(--color-primary)]">Strategy.</span>
                     </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                     <div className="group border-t border-secondary-foreground/22 pt-8 hover:border-[var(--color-primary)] transition-colors duration-500">
                        <TrendingUp className="w-8 h-8 text-[var(--color-primary)] mb-6" />
                        <h3 className="text-2xl font-bold uppercase tracking-tight mb-4 text-secondary-foreground">Baseline Assessment</h3>
                        <p className="text-secondary-foreground/56 text-sm leading-relaxed">
                            Established low ecological value of existing amenity turf (2.21 units), providing a clear baseline for improvement.
                        </p>
                     </div>
                     
                     <div className="group border-t border-secondary-foreground/22 pt-8 hover:border-[var(--color-primary)] transition-colors duration-500">
                        <Leaf className="w-8 h-8 text-[var(--color-primary)] mb-6" />
                        <h3 className="text-2xl font-bold uppercase tracking-tight mb-4 text-secondary-foreground">Habitat Creation</h3>
                        <p className="text-secondary-foreground/56 text-sm leading-relaxed">
                            Conversion of 4,100sqm to modified grassland increased unit value to 2.74, securing the net gain surplus.
                        </p>
                     </div>

                     <div className="group border-t border-secondary-foreground/22 pt-8 hover:border-[var(--color-primary)] transition-colors duration-500">
                        <ShieldCheck className="w-8 h-8 text-[var(--color-primary)] mb-6" />
                        <h3 className="text-2xl font-bold uppercase tracking-tight mb-4 text-secondary-foreground">Compliance</h3>
                        <p className="text-secondary-foreground/56 text-sm leading-relaxed">
                            Full satisfaction of Environment Act 2021 mandatory requirements, enabling smooth planning validation for Hertsmere BC.
                        </p>
                     </div>
                </div>
            </div>
        </section>

        {/* Next Project */}
        <section className="py-24 px-6 md:px-12 bg-secondary text-secondary-foreground border-t border-secondary-foreground/12">
             <div className="flex justify-between items-center">
                 <div className="text-left">
                     <Link href="/projects/st-julians" className="group">
                        <span className="font-mono text-xs text-secondary-foreground/42 uppercase tracking-widest block mb-2 group-hover:text-[var(--color-primary)] transition-colors">Previous Case Study</span>
                        <span className="text-xl md:text-3xl font-bold uppercase tracking-tight text-secondary-foreground/66 group-hover:text-secondary-foreground transition-colors">St Julians</span>
                     </Link>
                 </div>
                 <div className="text-right">
                     <Link href="/projects/cross-nursery" className="group">
                        <span className="font-mono text-xs text-secondary-foreground/42 uppercase tracking-widest block mb-2 group-hover:text-[var(--color-primary)] transition-colors">Next Case Study</span>
                        <span className="text-xl md:text-3xl font-bold uppercase tracking-tight text-secondary-foreground/66 group-hover:text-secondary-foreground transition-colors">Cross Nursery</span>
                     </Link>
                 </div>
             </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
