import { motion, useScroll, useTransform } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";
import heroVideo from "@/assets/videos/hero-habitat-premium.mp4";

const articles = [
  {
    title: "10% Biodiversity Net Gain: Planning Requirements for New Homes",
    category: "Policy Update",
    date: "12.02.25",
    author: "Strategy Team",
    excerpt: "A practical briefing on mandatory 10% BNG for housing schemes, including exemptions, small sites metric use, and delivery implications.",
    link: "https://urbanistarchitecture.co.uk/biodiversity-net-gain-planning/"
  },
  {
    title: "Government Proposals Threaten 97,000 Hectares of Habitat",
    category: "Market Analysis",
    date: "06.08.25",
    author: "Research Unit",
    excerpt: "Analysis of proposals to weaken BNG requirements, with implications for habitat protection, planning risk, and delivery certainty.",
    link: "https://insideecology.com/2025/08/06/government-proposals-to-roll-back-biodiversity-net-gain-could-threaten-protection-of-habitat-eight-times-the-size-of-manchester/"
  },
  {
    title: "RTPI Briefing: Biodiversity Net Gain in Practice",
    category: "Regulatory Guidance",
    date: "10.11.25",
    author: "Technical Director",
    excerpt: "A review of BNG implementation across local authorities, highlighting resource pressures and the need for stronger strategic delivery.",
    link: "https://www.rtpi.org.uk/policy-and-research/policy-briefings/biodiversity-net-gain/"
  }
];

export default function Insight() {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 900], [0, 80]);
  const heroScale = useTransform(scrollY, [0, 900], [1, 1.06]);
  const heroOpacity = useTransform(scrollY, [0, 900], [0.32, 0.18]);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground">
      <Navbar />
      
      <main>
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
                    <span className="hero-rail-text">Foresight</span>
                  </div>
                  
                  <h1 className="text-[clamp(3.2rem,8.5vw,6.6rem)] leading-[0.85] tracking-[-0.048em] hero-title-light max-w-[9.4ch]">
                    <span className="display-title">Critical</span><br />
                    <span className="display-title signal-on-light">Thinking.</span>
                  </h1>

                  <div className="mt-10 hero-chip-row">
                    <span className="hero-chip">Policy Shifts</span>
                    <span className="hero-chip">Regulatory Risk</span>
                    <span className="hero-chip">Delivery Signals</span>
                  </div>
                </div>

                <div className="lg:col-span-5 max-w-[34rem] lg:ml-auto lg:pl-4">
                  <p className="hero-supporting hero-copy-light">
                    <span className="hero-supporting-lead">Insight for live programmes.</span>
                    <span className="hero-supporting-body">
                      Strategic commentary on policy change, regulatory risk, and what it means for planning, programme certainty, and delivery sequencing.
                    </span>
                  </p>

                  <div className="mt-9 hero-meta-panel">
                    <div className="hero-meta-grid">
                      <div>
                        <span className="hero-meta-label">Format</span>
                        <span className="hero-meta-value">Briefings + analysis</span>
                      </div>
                      <div>
                        <span className="hero-meta-label">Focus</span>
                        <span className="hero-meta-value">Actionable implications</span>
                      </div>
                      <div>
                        <span className="hero-meta-label">Audience</span>
                        <span className="hero-meta-value">Developers + planners</span>
                      </div>
                      <div>
                        <span className="hero-meta-label">Themes</span>
                        <span className="hero-meta-value">BNG, policy, consent</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </section>

        <div className="flex flex-col">
            {articles.map((article, index) => (
              <a 
                key={article.title}
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block group relative"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 py-24 px-6 md:px-12 border-b border-foreground/10 group-hover:bg-card transition-colors duration-500 relative overflow-hidden">
                  <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="absolute -inset-24 bg-[radial-gradient(ellipse_at_top,rgba(126,180,58,0.2),transparent_55%)]" />
                  </div>
                  
                  <div className="md:col-span-3 pl-6 md:pl-0 border-l-2 border-primary/0 group-hover:border-primary transition-all duration-300 md:border-none">
                    <span className="font-mono text-[10px] text-primary uppercase tracking-widest mb-4 block">{article.category}</span>
                    <div className="font-mono text-xs text-foreground/50 flex flex-col gap-2">
                      <span>Ref: {article.date}</span>
                      <span>By: {article.author}</span>
                    </div>
                  </div>
                  
                  <div className="md:col-span-6">
                    <h2 className="text-3xl md:text-5xl mb-6 leading-[1.02] text-foreground group-hover:text-primary transition-colors duration-300">
                      <span className="editorial-title">{article.title}</span>
                    </h2>
                    <p className="font-sans text-lg font-light leading-relaxed text-foreground/60 max-w-2xl">{article.excerpt}</p>
                  </div>

                  <div className="md:col-span-3 flex justify-end items-start">
                     <div className="w-16 h-16 rounded-full border border-foreground/15 flex items-center justify-center text-foreground group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110 transition-all duration-300 lift-hover">
                        <ArrowUpRight className="w-6 h-6" />
                     </div>
                  </div>
                </div>
              </a>
            ))}
        </div>

        <div className="py-32 flex justify-center bg-background">
            <Magnetic>
            <Button variant="outline" className="rounded-full border-foreground/20 text-foreground hover:bg-secondary hover:text-secondary-foreground h-16 px-10 uppercase tracking-widest text-xs font-bold transition-all duration-300">
                Read More Insight
            </Button>
            </Magnetic>
        </div>
      </main>

      <Footer />
    </div>
  );
}
