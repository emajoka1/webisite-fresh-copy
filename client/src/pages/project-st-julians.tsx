import { motion, useScroll, useTransform } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowUpRight, Zap, Leaf, ShieldCheck, TrendingUp, EyeOff, TreeDeciduous } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";
import { useRef } from "react";
import { Link } from "wouter";

// Assets
import heroVideo from "@/assets/videos/hero-habitat-premium.mp4";
import solarField from "@/assets/images/solar-field-dark.jpg";
import kentDowns from "@/assets/images/kent-downs-dark.jpg";
import wildflowerDetail from "@/assets/images/wildflower-detail-dark.jpg";

export default function ProjectStJulians() {
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
                       <span className="kicker text-primary">Case Study: St Julians</span>
                    </div>
                    
                    <h1 className="text-[11vw] md:text-[7vw] leading-[0.82] tracking-[-0.055em] hero-title-light mb-8">
                      <span className="display-title">Invisible</span><br />
                      <span className="text-transparent stroke-text-white display-title">Power.</span>
                    </h1>
                </div>
                <div className="md:col-span-4 flex flex-col justify-end pb-4">
                    <div className="border-l border-primary/70 pl-6 mb-8">
                        <p className="hero-copy-light text-xl font-light leading-relaxed">
                            Delivering carbon neutrality for a historic estate within a protected Area of Outstanding Natural Beauty.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-[10px] font-mono uppercase tracking-[0.22em] tone-on-dark-whisper">
                        <div>
                            <span className="block text-primary mb-1">Location</span>
                            <span className="block text-sm normal-case tracking-normal font-semibold tone-on-dark-supporting">Sevenoaks, Kent</span>
                        </div>
                        <div>
                            <span className="block text-primary mb-1">Constraint</span>
                            <span className="block text-sm normal-case tracking-normal font-semibold tone-on-dark-supporting">Kent Downs AONB</span>
                        </div>
                        <div>
                            <span className="block text-primary mb-1">Gain</span>
                            <span className="block text-sm normal-case tracking-normal font-semibold tone-on-dark-supporting">+11.15% BNG</span>
                        </div>
                        <div>
                            <span className="block text-primary mb-1">Goal</span>
                            <span className="block text-sm normal-case tracking-normal font-semibold tone-on-dark-supporting">Net Zero 2028</span>
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
                        St Julians, a historic country club and business hub, faced a critical energy transition. With a wood-chip boiler facing phase-out and electricity demand set to double by 2030, the estate needed a radical solution.
                    </p>
                    <p className="text-secondary-foreground/66 text-lg leading-relaxed mb-12">
                        The constraint? Locating industrial-scale solar infrastructure within the sensitive landscape of the Kent Downs AONB without compromising its visual character.
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-8">
                        <div className="bg-secondary/95 p-6 border border-secondary-foreground/12">
                            <Zap className="w-6 h-6 text-[var(--color-primary)] mb-4" />
                            <div className="text-3xl font-bold text-secondary-foreground mb-1">890k</div>
                            <div className="text-[10px] font-mono uppercase tracking-widest text-secondary-foreground/42">kWh Target (2035)</div>
                        </div>
                        <div className="bg-secondary/95 p-6 border border-secondary-foreground/12">
                            <EyeOff className="w-6 h-6 text-[var(--color-primary)] mb-4" />
                            <div className="text-3xl font-bold text-secondary-foreground mb-1">0%</div>
                            <div className="text-[10px] font-mono uppercase tracking-widest text-secondary-foreground/42">Visual Impact</div>
                        </div>
                    </div>
                </div>

                <div className="md:col-span-7 space-y-24">
                    <div>
                        <img src={kentDowns} alt="Kent Downs AONB Landscape" className="w-full h-[400px] object-cover grayscale opacity-80 mb-8" />
                        <h3 className="text-2xl font-bold uppercase tracking-tight mb-6 flex items-center gap-4">
                            <ShieldCheck className="text-[var(--color-primary)]" /> Engineering Consent
                        </h3>
                        <p className="text-secondary-foreground/88 text-lg leading-relaxed font-light mb-6">
                            Standard applications fail in AONBs. Our approach wasn't just to hide the array, but to embed it into the topography. We reduced the scheme density by 50% and sited the 356 panels at the lowest field elevation, utilising ancient hedgerows as natural screening.
                        </p>
                        <p className="text-secondary-foreground/88 text-lg leading-relaxed font-light">
                            The result is an "invisible" power plant that preserves the open countryside character while powering the estate's transition to heat pumps and EV infrastructure.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-2xl font-bold uppercase tracking-tight mb-6 flex items-center gap-4">
                            <Leaf className="text-[var(--color-primary)]" /> The Dual-Use Landscape
                        </h3>
                        <p className="text-secondary-foreground/88 text-lg leading-relaxed font-light mb-8">
                            We treated the solar array not as a sterile utility zone, but as a protected habitat. The land beneath the panels is engineered as a shade-tolerant wildflower meadow, turning a monoculture field into a pollinator corridor.
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-secondary-foreground/12 pt-8">
                            <div>
                                <h4 className="font-mono text-xs text-[var(--color-primary)] uppercase tracking-widest mb-4">Under-Panel Ecology</h4>
                                <ul className="space-y-2 text-sm text-secondary-foreground/66">
                                    <li className="flex items-center gap-2"><div className="w-1 h-1 bg-secondary-foreground/58 rounded-full"></div>Wood Meadow-Grass</li>
                                    <li className="flex items-center gap-2"><div className="w-1 h-1 bg-secondary-foreground/58 rounded-full"></div>Creeping Soft Grass</li>
                                    <li className="flex items-center gap-2"><div className="w-1 h-1 bg-secondary-foreground/58 rounded-full"></div>Red Fescue</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-mono text-xs text-[var(--color-primary)] uppercase tracking-widest mb-4">Marginal Enhancement</h4>
                                <ul className="space-y-2 text-sm text-secondary-foreground/66">
                                    <li className="flex items-center gap-2"><div className="w-1 h-1 bg-secondary-foreground/58 rounded-full"></div>Oxeye Daisy</li>
                                    <li className="flex items-center gap-2"><div className="w-1 h-1 bg-secondary-foreground/58 rounded-full"></div>Yellow Rattle</li>
                                    <li className="flex items-center gap-2"><div className="w-1 h-1 bg-secondary-foreground/58 rounded-full"></div>Bird's-foot Trefoil</li>
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
                <img src={solarField} alt="Solar Array Integration" className="w-full h-full object-cover grayscale opacity-50" />
                <div className="absolute inset-0 bg-secondary/60 mix-blend-multiply"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-secondary via-transparent to-secondary"></div>
             </div>
             
             <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                 <span className="font-mono text-xs text-[var(--color-primary)] uppercase tracking-[0.3em] mb-8">Project Outcome</span>
                 <h2 className="text-[8vw] md:text-[6vw] font-black uppercase tracking-tighter text-secondary-foreground leading-none mb-4 mix-blend-overlay">
                     Net Gain
                 </h2>
                 <div className="text-4xl md:text-6xl font-bold text-secondary-foreground tracking-tighter">
                    +11.15%
                 </div>
             </div>
        </section>

        {/* The Strategy Details */}
        <section className="py-32 px-6 md:px-12 bg-secondary/95 text-secondary-foreground">
            <div className="max-w-7xl mx-auto">
                <div className="mb-24">
                     <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter mb-8 text-secondary-foreground">
                        Ecological <br/>
                        <span className="text-[var(--color-primary)]">Compensation.</span>
                     </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                     <div className="group border-t border-secondary-foreground/22 pt-8 hover:border-[var(--color-primary)] transition-colors duration-500">
                        <TrendingUp className="w-8 h-8 text-[var(--color-primary)] mb-6" />
                        <h3 className="text-2xl font-bold uppercase tracking-tight mb-4 text-secondary-foreground">Grassland Upgrade</h3>
                        <p className="text-secondary-foreground/56 text-sm leading-relaxed">
                            Enhancing 5,177 sqm of moderate condition grassland to 'Good' condition through nutrient management and species introduction.
                        </p>
                     </div>
                     
                     <div className="group border-t border-secondary-foreground/22 pt-8 hover:border-[var(--color-primary)] transition-colors duration-500">
                        <TreeDeciduous className="w-8 h-8 text-[var(--color-primary)] mb-6" />
                        <h3 className="text-2xl font-bold uppercase tracking-tight mb-4 text-secondary-foreground">Canopy Mitigation</h3>
                        <p className="text-secondary-foreground/56 text-sm leading-relaxed">
                            Removal of 3 medium trees compensated by planting 32 native indigenous trees, integrated into a reinforced tree shaw.
                        </p>
                     </div>

                     <div className="group border-t border-secondary-foreground/22 pt-8 hover:border-[var(--color-primary)] transition-colors duration-500">
                        <ShieldCheck className="w-8 h-8 text-[var(--color-primary)] mb-6" />
                        <h3 className="text-2xl font-bold uppercase tracking-tight mb-4 text-secondary-foreground">Legacy Assurance</h3>
                        <p className="text-secondary-foreground/56 text-sm leading-relaxed">
                            Secured via condition: full decommissioning plan to revert land to enhanced agricultural state after the solar lifespan.
                        </p>
                     </div>
                </div>
            </div>
        </section>

        {/* Next Project */}
        <section className="py-24 px-6 md:px-12 bg-secondary text-secondary-foreground border-t border-secondary-foreground/12">
             <div className="flex justify-between items-center">
                 <div className="text-left">
                     <Link href="/projects/cross-nursery" className="group">
                        <span className="font-mono text-xs text-secondary-foreground/42 uppercase tracking-widest block mb-2 group-hover:text-[var(--color-primary)] transition-colors">Previous Case Study</span>
                        <span className="text-xl md:text-3xl font-bold uppercase tracking-tight text-secondary-foreground/66 group-hover:text-secondary-foreground transition-colors">Cross Nursery</span>
                     </Link>
                 </div>
                 <div className="text-right">
                     <Link href="/projects/potters-bar" className="group">
                        <span className="font-mono text-xs text-secondary-foreground/42 uppercase tracking-widest block mb-2 group-hover:text-[var(--color-primary)] transition-colors">Next Case Study</span>
                        <span className="text-xl md:text-3xl font-bold uppercase tracking-tight text-secondary-foreground/66 group-hover:text-secondary-foreground transition-colors">Potters Bar FC</span>
                     </Link>
                 </div>
             </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
