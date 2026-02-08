import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ArrowRight, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useState, useRef, useEffect } from "react";
import { Link } from "wouter";

import serviceAdvisory from "@/assets/images/service-advisory-agency.jpg";
import serviceBng from "@/assets/images/service-bng-gen.png";
import serviceHabitat from "@/assets/images/service-habitat-banking-v2.png";
import serviceSpecies from "@/assets/images/service-species-uk.jpg";
import fluidTexture from "@/assets/images/fluid-texture.jpg";
import lidarTexture from "@/assets/images/lidar-bg-texture.jpg";
import heroVideoBase from "@/assets/videos/hero-habitat-creation.mp4";
import heroVideoAccent from "@/assets/videos/hero-ferns-real.mp4";
import solarFieldDark from "@/assets/images/solar-field-dark.jpg";
import meadowDark from "@/assets/images/meadow-dark.jpg";

import { Magnetic } from "@/components/ui/magnetic";

const rotatingServices = [
  "Biodiversity Net Gain",
  "PEA and PRA surveys",
  "Protected species",
  "Habitat banking",
  "Bat surveys",
];

const revealTransition = {
  duration: 0.72,
  ease: [0.16, 1, 0.3, 1] as const,
};

const sectionReveal = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.18 },
  transition: revealTransition,
};

const kineticLabels = [
  "Planning certainty",
  "Delivery-first ecology",
  "Nature-positive infrastructure",
  "Programme-aligned surveys",
  "Commercially aware mitigation",
  "Decision-ready reporting",
];

const operatingPrinciples = [
  {
    id: "01",
    title: "Brief from risk backward",
    desc: "Start with consent blockers, then reverse-engineer surveys and mitigation into a deliverable sequence.",
    tag: "Programme First",
  },
  {
    id: "02",
    title: "Decisions over documents",
    desc: "Every output should resolve a planning decision, not just add paperwork to the process.",
    tag: "Decision Velocity",
  },
  {
    id: "03",
    title: "Metric-led strategy",
    desc: "BNG and species constraints are modelled early to protect land take, viability, and buildability.",
    tag: "Commercial Control",
  },
  {
    id: "04",
    title: "Clear ownership model",
    desc: "Tight scopes, explicit accountability, and transparent timelines from mobilisation to discharge.",
    tag: "Execution Discipline",
  },
];

const getNextAvailability = () => {
  const nextAvailability = new Date();
  nextAvailability.setDate(nextAvailability.getDate() + 2);

  return `${nextAvailability.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })}, 09:00`;
};

const KineticStrip = ({ performanceMode = false }: { performanceMode?: boolean }) => {
  const tickerItems = [...kineticLabels, ...kineticLabels];

  return (
    <section className="relative overflow-hidden border-y border-border/60 bg-secondary py-5 text-secondary-foreground">
      <div className="pointer-events-none absolute inset-0 premium-grid-mesh opacity-[0.14]" />
      <div className="kinetic-strip relative">
        <div className="kinetic-strip-run" aria-hidden="true" style={performanceMode ? { animation: "none", transform: "translateX(0)" } : undefined}>
          {tickerItems.map((item, index) => (
            <span key={`${item}-${index}`} className="kinetic-strip-item">
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

const OperatingSystem = () => {
  return (
    <motion.section
      {...sectionReveal}
      className="bg-background text-foreground py-28 md:py-36 px-6 md:px-12 relative overflow-hidden border-b border-foreground/10 section-divider-line"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 premium-grid-mesh opacity-[0.08]" />
        <div className="orb-soft h-80 w-80 bg-primary/14 -top-20 right-[-5%]" />
        <div className="orb-soft h-64 w-64 bg-secondary/25 -bottom-10 left-[-4%]" />
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20 relative z-10">
        <div className="lg:col-span-5">
          <span className="label-pill inline-flex text-primary border-primary/35 mb-7">Coyne Operating System</span>
          <h2 className="text-[11vw] md:text-[6.2vw] leading-[0.84] tracking-[-0.05em] mb-8">
            <span className="section-lead block normal-case">Built for</span>
            <span className="display-title block">Complex</span>
            <span className="text-transparent stroke-text display-title block">Programmes</span>
          </h2>
          <p className="tone-supporting text-lg md:text-xl font-light leading-relaxed max-w-md">
            Agency-level thinking, grounded in delivery realities. We align policy, ecology, and project operations so your programme keeps momentum.
          </p>

          <div className="mt-10">
            <Magnetic>
              <Link href="/contact">
                <Button className="rounded-full bg-primary text-primary-foreground hover:bg-secondary hover:text-secondary-foreground h-14 px-8 text-xs uppercase tracking-[0.18em] font-bold transition-all duration-300">
                  Build your roadmap
                </Button>
              </Link>
            </Magnetic>
          </div>
        </div>

        <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {operatingPrinciples.map((item, index) => (
            <motion.article
              key={item.id}
              className="agency-principle-card rounded-3xl p-7 md:p-8"
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ ...revealTransition, delay: index * 0.05 }}
              whileHover={{ y: -4 }}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-primary">{item.id}</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/55">{item.tag}</span>
              </div>
              <h3 className="mt-6 text-2xl leading-[1.05]">
                <span className="editorial-title">{item.title}</span>
              </h3>
              <p className="mt-4 text-sm leading-relaxed tone-supporting">{item.desc}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

const Metrics = () => {
  const metrics = [
    { value: "100", unit: "%", label: "Planning Approvals Supported", sub: "First Submission Focus" },
    { value: "24", unit: "Hrs", label: "Response Speed", sub: "Initial Scope Return" },
    { value: "500", unit: "+", label: "Projects Completed", sub: "Across UK Programmes" },
    { value: "5k", unit: "+", label: "Hectares Assessed", sub: "Across UK Development Sites" },
  ];

  return (
    <motion.section
      {...sectionReveal}
      className="bg-secondary text-secondary-foreground border-b border-border/60 relative overflow-hidden"
    >
      <div className="absolute inset-0 premium-grid-mesh opacity-[0.11] pointer-events-none" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((m, i) => (
          <div
            key={i}
            className="group relative border-b md:border-b-0 md:border-r border-border/60 last:border-r-0 p-12 lg:p-16 flex flex-col justify-between h-[300px] hover:bg-secondary-foreground/5 transition-colors duration-500"
          >
            <div className="flex flex-col">
              <div className="flex items-baseline gap-1 mb-2">
                <span
                  className="text-[4rem] md:text-[5rem] font-black tracking-tighter leading-[0.8] tone-on-dark-primary group-hover:text-primary transition-colors duration-300"
                  data-testid={`text-metric-value-${i}`}
                >
                  {m.value}
                </span>
                <span className="text-2xl md:text-3xl font-bold tone-on-dark-whisper">{m.unit}</span>
              </div>
            </div>

            <div className="flex flex-col gap-2 mt-auto">
              <h4
                className="font-bold text-xs uppercase tracking-[0.2em] tone-on-dark-supporting"
                data-testid={`text-metric-label-${i}`}
              >
                {m.label}
              </h4>
              <div className="flex items-center gap-2">
                <p
                  className="font-mono text-[10px] tone-on-dark-whisper uppercase tracking-widest"
                  data-testid={`text-metric-sub-${i}`}
                >
                  {m.sub}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
};

const WhyUs = () => {
  return (
    <motion.section
      {...sectionReveal}
      className="bg-background text-foreground py-32 px-6 md:px-12 relative overflow-hidden border-b border-foreground/10"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-primary/10 blur-[90px]" />
        <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-secondary/15 blur-[90px]" />
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 relative z-10">
        <div className="lg:col-span-5">
          <span className="kicker text-primary block mb-8">The Bottleneck</span>
          <h2 className="text-5xl md:text-7xl leading-[0.95] mb-8">
            <span className="editorial-title">Ecology should</span> <br />
            <span className="text-transparent stroke-text editorial-title">never delay</span> <br />
            <span className="editorial-title">your programme.</span>
          </h2>
          <p className="tone-supporting text-xl font-light leading-relaxed mb-10" data-testid="text-problem-body">
            Most consultancy teams report risk after key decisions are already made. We work earlier, align ecology with planning strategy, and protect programme certainty from day one.
          </p>
          <div className="p-8 bg-card border border-foreground/10 lift-hover">
            <div className="flex gap-4 items-start">
              <div className="w-9 h-9 rounded-full bg-destructive/10 flex items-center justify-center text-destructive shrink-0">
                <ArrowDown className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm mb-1">
                  <span className="display-title">Standard consultancy</span>
                </h4>
                <p className="tone-whisper text-xs font-mono uppercase tracking-wide" data-testid="text-standard-consultancy-meta">
                  6 to 8 week lead times • unclear scope
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 flex flex-col justify-center">
          <span className="kicker text-primary block mb-8">The Coyne Method</span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {[
              { title: "Rapid mobilisation", desc: "Survey teams deployed quickly, with sequencing aligned to planning windows." },
              { title: "Commercially aware", desc: "Mitigation designed around buildability, value, and delivery constraints." },
              { title: "Metric-led strategy", desc: "BNG modelling that protects programme, land take, and viability." },
              { title: "Clear scope model", desc: "Defined deliverables, accountable timelines, and transparent commissioning." },
            ].map((item, i) => (
              <div key={i} className="group border-t border-foreground/10 pt-7 hover:border-primary/50 transition-colors duration-500">
                <h3 className="text-xl mb-3 group-hover:text-primary transition-colors">
                  <span className="editorial-title">{item.title}</span>
                </h3>
                <p className="tone-supporting text-sm leading-relaxed" data-testid={`text-advantage-desc-${i}`}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-14">
            <Magnetic>
              <Link href="/contact" className="hover-underline">
                <Button
                  data-testid="button-start-project"
                  className="h-16 px-10 rounded-full bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300 uppercase font-bold text-xs tracking-widest w-full md:w-auto"
                >
                  Start your project
                </Button>
              </Link>
            </Magnetic>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

const Hero = ({ performanceMode = false }: { performanceMode?: boolean }) => {
  const [activeService, setActiveService] = useState(0);
  const cycleTimerRef = useRef<number | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const vignette = useTransform(scrollYProgress, [0, 1], [0.44, 0.68]);
  const videoY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);
  const videoOpacity = useTransform(scrollYProgress, [0, 1], [0.74, 0.58]);
  const accentY = useTransform(scrollYProgress, [0, 1], [0, -84]);
  const accentScale = useTransform(scrollYProgress, [0, 1], [1.04, 1.12]);
  const accentOpacity = useTransform(scrollYProgress, [0, 1], [0.48, 0.22]);
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -24]);
  const directorX = useTransform(scrollYProgress, [0, 1], [-34, 20]);
  const directorOpacity = useTransform(scrollYProgress, [0, 1], [0.34, 0.2]);
  const beamX = useTransform(scrollYProgress, [0, 1], [18, -26]);
  const beamOpacity = useTransform(scrollYProgress, [0, 1], [0.26, 0.12]);
  const nextAvailability = getNextAvailability();

  useEffect(() => {
    const clearCycleTimer = () => {
      if (cycleTimerRef.current !== null) {
        window.clearTimeout(cycleTimerRef.current);
        cycleTimerRef.current = null;
      }
    };

    const queueNextCycle = () => {
      clearCycleTimer();
      cycleTimerRef.current = window.setTimeout(() => {
        setActiveService((prev) => (prev + 1) % rotatingServices.length);
        if (document.visibilityState === "visible") {
          queueNextCycle();
        }
      }, 2800);
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        queueNextCycle();
      } else {
        clearCycleTimer();
      }
    };

    queueNextCycle();
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      clearCycleTimer();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="hero-shell min-h-[100svh] w-full bg-background text-foreground selection:bg-primary selection:text-primary-foreground flex flex-col justify-end"
      style={{ position: "relative" }}
      data-testid="section-hero"
    >
      <div className="absolute inset-0 z-0 bg-background">
        <motion.video
          src={heroVideoBase}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover hero-video-ecology-base"
          style={performanceMode ? { opacity: 0.72 } : { y: videoY, scale: videoScale, opacity: videoOpacity }}
        />
        {!performanceMode && (
          <motion.div
            className="absolute right-[4%] top-[12%] hidden lg:block hero-art-window"
            style={{ y: accentY, scale: accentScale, opacity: accentOpacity }}
          >
            <video
              src={heroVideoAccent}
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              className="absolute inset-0 w-full h-full object-cover hero-video-ecology-accent"
            />
          </motion.div>
        )}
        <div className="absolute inset-0 hero-canvas-premium" />
        {!performanceMode && (
          <motion.div className="absolute -top-[22%] -left-[14%] h-[74vh] w-[66vw] hero-canvas-orb-a" style={{ x: directorX, y: parallaxY }} />
        )}
        {!performanceMode && (
          <motion.div className="absolute -right-[14%] top-[-10%] h-[72vh] w-[64vw] hero-canvas-orb-b" style={{ x: beamX }} />
        )}
        <motion.div
          className="absolute inset-0 pointer-events-none hero-canvas-sheen"
          animate={performanceMode ? undefined : { backgroundPosition: ["0% 0%", "100% 100%"] }}
          transition={performanceMode ? undefined : { duration: 18, repeat: Infinity, ease: "linear" }}
        />
        {!performanceMode && (
          <motion.div
            className="absolute inset-0 pointer-events-none opacity-[0.16] mix-blend-soft-light"
            style={{ backgroundImage: `url(${lidarTexture})`, backgroundSize: "cover", y: parallaxY }}
          />
        )}

        <motion.div className="absolute inset-0 hero-ink" style={{ opacity: vignette }} />
        <motion.div className="absolute inset-0 pointer-events-none hero-director-overlay" style={performanceMode ? { opacity: 0.14 } : { x: directorX, opacity: directorOpacity }} />
        {!performanceMode && (
          <motion.div className="absolute inset-[-10%] pointer-events-none hero-director-beam" style={{ x: beamX, opacity: beamOpacity }} />
        )}
        <div className="absolute inset-y-0 left-0 w-[74%] pointer-events-none hero-side-fade" />

        <motion.div
          className="absolute inset-0 hero-grid-brand opacity-[0.12] mix-blend-overlay pointer-events-none"
          animate={performanceMode ? undefined : { backgroundPosition: ["0px 0px", "140px 0px"] }}
          transition={performanceMode ? undefined : { duration: 20, repeat: Infinity, ease: "linear" }}
          style={{
            maskImage: "radial-gradient(ellipse at 30% 20%, black 0%, transparent 65%)",
            WebkitMaskImage: "radial-gradient(ellipse at 30% 20%, black 0%, transparent 65%)",
          }}
        />

        <div className="absolute inset-0 opacity-[0.08] pointer-events-none hero-noise-soft" />

        <div className="absolute left-0 right-0 bottom-0 h-[28vh] hero-bottom-fade" />
      </div>

      <div className="relative z-10 w-full">
        <div className="hero-content-shell px-6 md:px-12 pt-24 md:pt-28 lg:pt-32" />

        <div className="hero-content-shell px-6 md:px-12 pb-12 md:pb-16 lg:pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-end">
            <div className="lg:col-span-8">
              <motion.h1
                className="text-[12.5vw] md:text-[7.2vw] lg:text-[6.1vw] leading-[0.81] font-black tracking-[-0.06em] uppercase hero-title-light"
                data-testid="text-hero-title"
                style={{ y: titleY }}
              >
                <span className="block tone-on-dark-supporting mb-[0.08em]">We deliver</span>

                <span className="block leading-[0.9] mb-[0.01em]">
                  <span className="sr-only">Service:</span>
                  <span className="relative inline-flex items-baseline">
                    <span className="relative inline-block h-[1.02em] w-[20.8ch] overflow-hidden align-baseline">
                      <AnimatePresence mode="wait" initial={false}>
                        <motion.span
                          key={activeService}
                          initial={{ y: 34, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: -30, opacity: 0 }}
                          transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
                            className="absolute inset-0 flex items-center whitespace-nowrap text-[var(--color-signal)] will-change-transform transform-gpu [text-shadow:none]"
                            data-testid="text-hero-rotating-service"
                          >
                          {rotatingServices[activeService]}
                        </motion.span>
                      </AnimatePresence>
                    </span>
                  </span>
                </span>

                <span className="block signature-outline-strong mt-[0.01em]" data-testid="text-hero-signature">
                  Compliance.
                </span>
              </motion.h1>

              <div className="mt-10 max-w-2xl">
                <p className="hero-supporting" data-testid="text-hero-supporting">
                  <span className="hero-supporting-lead">
                    Ecological compliance, <span className="hero-supporting-accent">accelerated</span>
                    <span className="hero-supporting-emdash" aria-hidden="true">
                      —
                    </span>
                  </span>
                  <span className="hero-supporting-body">
                    Keep planning on programme with <span className="hero-supporting-strong">clear scope</span>,{" "}
                    <span className="hero-supporting-strong">rapid mobilisation</span>, and{" "}
                    <span className="hero-supporting-strong">decision-ready reporting</span>.
                  </span>
                </p>

                <div className="mt-10 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
                  <Magnetic>
                    <Link href="/contact">
                      <Button
                        data-testid="button-hero-book"
                        className="h-16 md:h-18 px-10 md:px-12 rounded-full bg-[var(--color-signal)] text-[#10160f] hover:bg-[#d7ff64] hover:text-[#10160f] text-sm font-bold uppercase tracking-widest transition-all duration-300 w-full sm:w-auto shadow-[0_18px_60px_rgba(8,13,8,0.34)] hover:shadow-[0_0_20px_rgba(198,255,46,0.55)]"
                      >
                        Book assessment <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </Link>
                  </Magnetic>

                  <Magnetic>
                    <Link href="/sectors" className="hover-underline" data-testid="link-hero-explore">
                      <Button
                        variant="outline"
                        data-testid="button-hero-explore"
                        className="h-16 md:h-18 px-10 md:px-12 rounded-full border-secondary-foreground/22 bg-secondary/10 text-secondary-foreground hover:bg-secondary-foreground hover:text-secondary uppercase tracking-widest text-xs font-bold transition-all duration-300 w-full sm:w-auto"
                      >
                        Explore expertise <ArrowUpRight className="ml-2 w-4 h-4" />
                      </Button>
                    </Link>
                  </Magnetic>
                </div>

                <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3" data-testid="grid-hero-proof">
                  {[
                    { k: "Next availability", v: nextAvailability },
                    { k: "Mobilisation", v: "48 hours" },
                    { k: "Commission model", v: "Defined scope basis" },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="rounded-2xl border border-secondary-foreground/16 bg-secondary/18 backdrop-blur-md px-5 py-4 lift-hover"
                      data-testid={`card-hero-proof-${i}`}
                    >
                      <div
                        className="text-[10px] font-mono uppercase tracking-[0.22em] tone-on-dark-whisper"
                        data-testid={`text-hero-proof-k-${i}`}
                      >
                        {item.k}
                      </div>
                      <div className="mt-1 text-sm font-bold tone-on-dark-supporting" data-testid={`text-hero-proof-v-${i}`}>
                        {item.v}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="mt-6 flex items-center justify-between lg:justify-end lg:gap-6" data-testid="row-hero-scroll">
                <span className="text-[10px] font-mono uppercase tracking-[0.22em] tone-on-dark-whisper" data-testid="text-hero-scroll-hint">
                  Scroll
                </span>
                <motion.div
                  animate={performanceMode ? undefined : { y: [0, 6, 0] }}
                  transition={performanceMode ? undefined : { duration: 1.6, repeat: Infinity, ease: [0.4, 0, 0.2, 1] }}
                  className="h-10 w-10 rounded-full border border-secondary-foreground/18 bg-secondary/12 backdrop-blur flex items-center justify-center"
                  data-testid="button-hero-scroll"
                >
                  <ArrowDown className="h-4 w-4 text-secondary-foreground" />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ServiceList = ({ items }: { items: any[] }) => {
  const [activeService, setActiveService] = useState(0);

  return (
    <motion.section
      {...sectionReveal}
      className="bg-background text-foreground py-24 md:py-40 relative overflow-hidden border-b border-foreground/10 section-divider-line"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="orb-soft h-64 w-64 bg-primary/10 top-14 right-10" />
      </div>
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex items-center gap-4 mb-16">
          <span className="label-pill inline-flex text-primary border-primary/35">Core Capabilities</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7 relative z-20">
            {items.map((item, index) => (
              <div
                key={index}
                className="group border-t border-foreground/10 py-12 cursor-pointer transition-all duration-500 hover:pl-8 focus-visible:pl-4 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/45"
                onMouseEnter={() => setActiveService(index)}
                onFocus={() => setActiveService(index)}
                onClick={() => setActiveService(index)}
                tabIndex={0}
              >
                <div className="flex items-baseline justify-between mb-4">
                  <h3
                    className={`text-4xl md:text-6xl leading-[0.95] transition-colors duration-300 ${
                      activeService === index ? "text-primary" : "text-foreground"
                    }`}
                  >
                    <span className="editorial-title">{item.title}</span>
                  </h3>
                  <span className="tone-whisper font-mono text-sm" data-testid={`text-capability-index-${index}`}>
                    0{index + 1}
                  </span>
                </div>
                <p
                  className={`tone-supporting text-lg md:text-xl font-light max-w-lg transition-all duration-500 overflow-hidden opacity-100 max-h-48 mt-4 ${
                    activeService === index ? "lg:opacity-100 lg:max-h-48 lg:mt-4" : "lg:opacity-0 lg:max-h-0 lg:mt-0"
                  }`}
                  data-testid={`text-capability-desc-${index}`}
                >
                  {item.desc}
                </p>
              </div>
            ))}
            <div className="border-t border-foreground/10"></div>
          </div>

          <div className="hidden lg:block lg:col-span-5 relative h-[600px]">
            <div className="sticky top-32 w-full h-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeService}
                  initial={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 1.02, filter: "blur(10px)" }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 w-full h-full rounded-3xl overflow-hidden border border-foreground/12 bg-card lift-hover img-frame img-sheen"
                >
                  <img src={items[activeService].image} alt={items[activeService].title} className="w-full h-full object-cover opacity-90 img-grade-soft" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent" />
                  <div
                    className="absolute inset-0 opacity-20 pointer-events-none mix-blend-multiply"
                    style={{ backgroundImage: `url(${lidarTexture})`, backgroundSize: "cover" }}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

const SelectedWorks = () => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const projects = [
    {
      title: "Cross Nursery",
      category: "Regenerative Infrastructure",
      location: "Goffs Oak, Herts",
      year: "2025",
      image: meadowDark,
      link: "/projects/cross-nursery",
    },
    {
      title: "St Julians",
      category: "Carbon Neutral Infrastructure",
      location: "Sevenoaks, Kent",
      year: "2028",
      image: solarFieldDark,
      link: "/projects/st-julians",
    },
    {
      title: "Potters Bar FC",
      category: "Urban Net Gain",
      location: "Potters Bar, Herts",
      year: "2024",
      image: meadowDark,
      link: "/projects/potters-bar",
    },
  ];

  return (
    <motion.section
      {...sectionReveal}
      className="py-32 bg-secondary text-secondary-foreground relative z-10 overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0 premium-grid-mesh opacity-[0.14]" />
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex items-center gap-4 mb-24">
          <span className="label-pill inline-flex text-primary border-primary/35 bg-primary/10">Selected Works</span>
        </div>

        <div className="flex flex-col">
          {projects.map((project, index) => (
            <Link
              href={project.link}
              key={index}
              className="group relative border-t border-secondary-foreground/10 last:border-b py-16 md:py-24 transition-colors duration-500 hover:bg-secondary/95"
              onMouseEnter={() => setHoveredProject(index)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div className="grid grid-cols-1 md:grid-cols-12 items-center relative z-20">
                <div className="md:col-span-6">
                  <h3 className="text-5xl md:text-8xl leading-[0.9] mb-4 text-secondary-foreground group-hover:text-primary transition-colors duration-300">
                    <span className="editorial-title text-secondary-foreground">{project.title}</span>
                  </h3>
                  <div className="tone-on-dark-whisper flex items-center gap-4 group-hover:opacity-100 transition-opacity" data-testid={`text-project-meta-${index}`}>
                    <span className="font-mono text-xs uppercase tracking-widest">{project.category}</span>
                  </div>
                </div>

                <div className="md:col-span-3 md:col-start-8 flex flex-col justify-between h-full">
                  <div className="hidden md:block text-right mb-4">
                    <span
                      className="tone-on-dark-whisper font-mono text-xs uppercase tracking-widest block mb-1"
                      data-testid={`text-project-location-label-${index}`}
                    >
                      Location
                    </span>
                    <span className="tone-on-dark-supporting text-sm font-medium" data-testid={`text-project-location-${index}`}>
                      {project.location}
                    </span>
                  </div>
                </div>

                <div className="md:col-span-2 md:col-start-11 flex justify-end">
                  <div className="w-16 h-16 rounded-full border border-secondary-foreground/20 flex items-center justify-center bg-transparent group-hover:bg-primary group-hover:border-primary group-hover:text-primary-foreground transition-all duration-300 transform group-hover:scale-110 lift-hover">
                    <ArrowUpRight className="w-6 h-6" />
                  </div>
                </div>
              </div>

              <motion.div
                className="fixed pointer-events-none z-10 hidden md:block w-[400px] h-[500px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden bg-secondary border border-secondary-foreground/10 img-frame"
                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                animate={{
                  opacity: hoveredProject === index ? 1 : 0,
                  scale: hoveredProject === index ? 1 : 0.8,
                  rotate: hoveredProject === index ? 0 : -5,
                }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <img src={project.image} alt={project.title} className="w-full h-full object-cover grayscale mix-blend-luminosity opacity-80 img-grade" />
                <div className="absolute inset-0 bg-primary/20 mix-blend-overlay"></div>
              </motion.div>
            </Link>
          ))}
        </div>

        <div className="mt-24 text-center">
          <Magnetic>
            <Link href="/sectors">
              <Button
                variant="outline"
                className="rounded-full border-secondary-foreground/20 text-secondary-foreground hover:bg-secondary-foreground hover:text-secondary h-16 px-10 uppercase tracking-widest text-xs font-bold transition-all duration-300"
              >
                View All Projects
              </Button>
            </Link>
          </Magnetic>
        </div>
      </div>
    </motion.section>
  );
};

export default function Home() {
  const [performanceMode, setPerformanceMode] = useState(false);

  useEffect(() => {
    const computePerformanceMode = () => {
      const nav = navigator as Navigator & { deviceMemory?: number };
      const lowCpu = (nav.hardwareConcurrency ?? 8) <= 4;
      const lowMemory = (nav.deviceMemory ?? 8) <= 4;
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const compactViewport = window.innerWidth < 1024;
      setPerformanceMode(lowCpu || lowMemory || reducedMotion || compactViewport);
    };

    computePerformanceMode();
    window.addEventListener("resize", computePerformanceMode);
    return () => window.removeEventListener("resize", computePerformanceMode);
  }, []);

  const services = [
    { title: "Strategic Advisory", desc: "Planning-led ecological strategy for complex schemes, from site appraisal to consent route.", image: serviceAdvisory },
    { title: "Biodiversity Net Gain", desc: "Policy-compliant BNG strategy, metric modelling, and practical delivery planning.", image: serviceBng },
    { title: "Habitat Banking", desc: "Revenue-ready habitat banking pathways for landowners, developers, and investment partners.", image: serviceHabitat },
    { title: "Protected Species", desc: "Survey, licensing, and mitigation for bats, badgers, and great crested newts.", image: serviceSpecies },
  ];

  return (
    <div className={`bg-background min-h-screen text-foreground overflow-hidden selection:bg-primary selection:text-primary-foreground ${performanceMode ? "performance-mode" : ""}`}>
      <Navbar />

      <main>
        <Hero performanceMode={performanceMode} />
        <KineticStrip performanceMode={performanceMode} />
        <WhyUs />
        <Metrics />
        <ServiceList items={services} />
        <SelectedWorks />

        <motion.section
          {...sectionReveal}
          className="py-32 px-6 md:px-12 bg-background text-center relative overflow-hidden grain border-t border-foreground/10 section-divider-line"
        >
          <div className="absolute inset-0 opacity-5 pointer-events-none mix-blend-multiply" style={{ backgroundImage: `url(${fluidTexture})`, backgroundSize: "cover" }}></div>
          <div className="orb-soft h-72 w-72 bg-primary/10 -top-16 left-1/2 -translate-x-1/2" />

          <div className="relative z-10 max-w-4xl mx-auto">
            <span className="label-pill inline-flex text-primary border-primary/35 mb-7">Begin The Brief</span>
            <h2 className="tone-primary text-[8vw] md:text-[6vw] leading-[0.86] mb-10">
              <span className="section-lead block normal-case">Start your next</span>
              <span className="text-transparent stroke-text display-title">project</span>
            </h2>
            <p className="tone-supporting text-xl md:text-2xl font-light mb-12 max-w-xl mx-auto" data-testid="text-footer-cta-body">
              Ready to move from ecological constraint to planning certainty?
            </p>
            <div className="flex justify-center gap-6">
              <Magnetic>
                <Link href="/contact">
                  <Button
                    data-testid="button-footer-cta"
                    className="bg-primary text-primary-foreground hover:bg-secondary hover:text-secondary-foreground rounded-full h-16 px-12 text-sm font-bold uppercase tracking-widest transition-all duration-300"
                  >
                    Get in Touch
                  </Button>
                </Link>
              </Magnetic>
            </div>
          </div>
        </motion.section>

        <Footer />
      </main>
    </div>
  );
}
