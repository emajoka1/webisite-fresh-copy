import { motion, useScroll, useTransform } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowRight, Check, Database, Layers, Scale, TreePine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";
import { Link } from "wouter";
import { cx } from "@/components/ui/cx";

// Images
import serviceAdvisory from "@/assets/images/service-advisory-cinematic.jpg";
import serviceHabitat from "@/assets/images/service-habitat-cinematic.jpg";
import serviceSpecies from "@/assets/images/service-species-cinematic.jpg";
import arboricultureCover from "@/assets/images/arboriculture-miyawaki-5.jpg";
import lidarTexture from "@/assets/images/lidar-bg-texture.jpg";
import heroVideo from "@/assets/videos/hero-habitat-premium.mp4";

const services = [
  {
    category: "Strategic Advisory",
    id: "01",
    image: serviceAdvisory,
    icon: Scale,
    description: "Planning-led ecological strategy for complex development programmes, from land appraisal to determination.",
    items: [
      "Biodiversity Net Gain (BNG) Strategy",
      "Habitats Regulations Assessment (HRA)",
      "EIA Coordination & Scoping",
      "Green Infrastructure Strategy",
      "Planning Policy Compliance"
    ]
  },
  {
    category: "Technical Intelligence",
    id: "02",
    image: serviceSpecies,
    icon: Database,
    description: "Robust survey intelligence that defines ecological risk early and supports defensible planning decisions.",
    items: [
      "UKHab Classification Surveys",
      "Chiroptera (Bat) Modelling",
      "GCN eDNA & Population Analysis",
      "Protected Species Inventories",
      "Invasive Species Mapping"
    ]
  },
  {
    category: "Mitigation Design",
    id: "03",
    image: serviceHabitat,
    icon: Layers,
    description: "Licensing and mitigation design built to secure consent while protecting programme and buildability.",
    items: [
      "EPS Licensing & Mitigation",
      "District Level Licensing (DLL)",
      "CEMP & LEMP Production",
      "Ecological Clerk of Works",
      "Habitat Creation Schemes"
    ]
  },
  {
    category: "Arboriculture & Forestry",
    id: "04",
    image: arboricultureCover,
    icon: TreePine,
    description: "Planning-grade tree strategy, risk assurance, and implementation support from report to on-site delivery.",
    items: [
      "BS5837 Planning Reports",
      "Mortgage & Insurance Tree Reports",
      "Tree Safety Surveys",
      "Woodland Creation (Miyawaki)",
      "Countryside Fencing & Aftercare"
    ]
  }
];

export default function Expertise() {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 900], [0, 80]);
  const heroScale = useTransform(scrollY, [0, 900], [1, 1.06]);
  const heroOpacity = useTransform(scrollY, [0, 900], [0.32, 0.18]);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground">
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="hero-shell min-h-[86vh] flex flex-col justify-end pb-24 md:pb-28 px-6 md:px-12" data-testid="section-expertise-hero">
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
                <div className="absolute left-0 right-0 bottom-0 h-[62%] hero-bottom-fade" />
                <div className="absolute inset-0 opacity-[0.08] pointer-events-none hero-noise-soft"></div>
            </div>

            <div className="hero-content-shell">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-end">
                <div className="lg:col-span-7">
                  <div className="hero-rail mb-8 md:mb-10">
                    <span className="hero-rail-line" aria-hidden="true" />
                    <span className="hero-rail-text" data-testid="text-expertise-hero-kicker">Capabilities</span>
                  </div>

                  <h1 className="text-[clamp(3.2rem,8.5vw,6.6rem)] leading-[0.85] tracking-[-0.048em] hero-title-light max-w-[9.2ch]" data-testid="text-expertise-hero-title">
                    <span className="display-title">Engineering</span>
                    <br />
                    <span className="display-title signal-on-light">Nature.</span>
                  </h1>

                  <div className="mt-8 hero-chip-row" data-testid="row-expertise-hero-pills">
                    <span className="hero-chip" data-testid="pill-expertise-hero-1">BNG Strategy</span>
                    <span className="hero-chip" data-testid="pill-expertise-hero-2">UKHab</span>
                    <span className="hero-chip" data-testid="pill-expertise-hero-3">EPS Licensing</span>
                  </div>
                </div>

                <div className="lg:col-span-5 max-w-[34rem] lg:ml-auto lg:pl-4">
                  <p className="hero-supporting hero-copy-light" data-testid="text-expertise-hero-supporting">
                    <span className="hero-supporting-lead">Technical certainty.</span>
                    <span className="hero-supporting-body">
                      We align planning intelligence, survey evidence, and mitigation design to keep projects moving from appraisal to delivery.
                    </span>
                  </p>

                  <div className="mt-9 hero-meta-panel" data-testid="panel-expertise-hero-meta">
                    <div className="hero-meta-grid" data-testid="grid-expertise-hero-meta">
                      <div data-testid="block-expertise-hero-meta-1">
                        <span className="hero-meta-label">Delivery</span>
                        <span className="hero-meta-value">Planning-first</span>
                      </div>
                      <div data-testid="block-expertise-hero-meta-2">
                        <span className="hero-meta-label">Response</span>
                        <span className="hero-meta-value">1 working day</span>
                      </div>
                      <div data-testid="block-expertise-hero-meta-3">
                        <span className="hero-meta-label">Outputs</span>
                        <span className="hero-meta-value">Decision-ready</span>
                      </div>
                      <div data-testid="block-expertise-hero-meta-4">
                        <span className="hero-meta-label">Scope</span>
                        <span className="hero-meta-value">Programme aligned</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-10" data-testid="row-expertise-hero-cta">
                    <Magnetic>
                      <Link href="/contact" className="hover-underline" data-testid="link-expertise-hero-enquire">
                        <Button
                          data-testid="button-expertise-hero-enquire"
                          className="h-14 px-8 rounded-full bg-primary text-primary-foreground hover:bg-secondary hover:text-secondary-foreground text-xs uppercase tracking-[0.2em] font-bold transition-all duration-300"
                        >
                          Start a brief <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                      </Link>
                    </Magnetic>
                  </div>

                  <div className="mt-8 font-mono text-[10px] uppercase tracking-[0.22em] tone-on-dark-whisper" data-testid="text-expertise-hero-note">
                    Response usually within one working day.
                  </div>
                </div>
              </div>
            </div>
        </section>

        {/* Services Grid */}
        <div className="flex flex-col" data-testid="section-services">
            {services.map((service, index) => (
              <ServiceSection key={service.category} service={service} index={index} />
            ))}
        </div>

        {/* CTA Section */}
        <div className="bg-background text-foreground py-32 px-6 md:px-12 relative overflow-hidden border-t border-foreground/10">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-primary/10 blur-[100px]" />
              <div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-secondary/10 blur-[100px]" />
            </div>

             <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center relative z-10">
               <div>
                 <span className="kicker text-primary block mb-8" data-testid="text-expertise-cta-kicker">Next step</span>
                 <h3 className="text-5xl md:text-8xl leading-[0.9] mb-8" data-testid="text-expertise-cta-title">
                    <span className="editorial-title">Project</span> <br/>
                    <span className="text-transparent stroke-text editorial-title">critical?</span>
                 </h3>
                 <p className="text-foreground/65 text-lg max-w-md mb-12 font-light leading-relaxed" data-testid="text-expertise-cta-desc">
                   Discuss your project requirements and receive a commissioning route with clear outputs, timeline assumptions, and delivery priorities.
                 </p>
                 <Magnetic>
                    <Button data-testid="button-expertise-initiate" className="bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground rounded-full h-16 px-12 text-xs uppercase tracking-[0.2em] font-bold border-none transition-all duration-300 lift-hover">
                      Start Commission
                    </Button>
                 </Magnetic>
               </div>
               
               <div className="md:border-l border-foreground/10 md:pl-12 py-4">
                <div className="card-metal rounded-3xl p-8 md:p-10 lift-hover" data-testid="card-delivery-standards">
                  <div className="micro-eyebrow tone-whisper" data-testid="text-delivery-standards-kicker">
                    Delivery standards
                  </div>
                  <h4 className="mt-4 text-2xl md:text-3xl leading-tight" data-testid="text-delivery-standards-title">
                    <span className="editorial-title">How we protect programme certainty.</span>
                  </h4>

                  <div className="mt-8 grid grid-cols-1 gap-3" data-testid="list-delivery-standards">
                    {[
                      "Scope-first commissioning with no ambiguity",
                      "Single accountable lead for every package",
                      "Survey sequencing aligned to planning deadlines",
                      "Decision-ready outputs for planning teams",
                    ].map((t, i) => (
                      <div key={t} className="flex items-start gap-3 border-t border-foreground/10 pt-3" data-testid={`row-delivery-standard-${i}`}>
                        <span className="mt-[0.5em] h-1.5 w-1.5 rounded-full bg-primary/70 shrink-0" aria-hidden="true" />
                        <span className="micro-detail text-foreground/75" data-testid={`text-delivery-standard-${i}`}>
                          {t}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 rounded-3xl border border-foreground/10 bg-card p-7 md:p-8 lift-hover" data-testid="card-arboriculture-division">
                  <div className="micro-eyebrow tone-whisper" data-testid="text-arboriculture-division-kicker">
                    Specialist division
                  </div>
                  <h5 className="mt-3 text-2xl leading-tight" data-testid="text-arboriculture-division-title">
                    <span className="editorial-title">Arboriculture &amp; Forestry.</span>
                  </h5>
                  <p className="mt-4 tone-supporting text-sm leading-relaxed" data-testid="text-arboriculture-division-body">
                    Tree strategy, risk reporting, and landscape implementation delivered under one coordinated workstream.
                  </p>
                  <div className="mt-6" data-testid="row-arboriculture-division-cta">
                    <Magnetic>
                      <Link href="/arboriculture-and-forestry" className="hover-underline" data-testid="link-arboriculture-division">
                        <Button
                          variant="outline"
                          data-testid="button-arboriculture-division"
                          className="h-11 px-6 rounded-full border-foreground/15 bg-transparent text-foreground hover:bg-secondary hover:text-secondary-foreground text-[11px] uppercase font-bold tracking-[0.15em] transition-all duration-300"
                        >
                          View division <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                      </Link>
                    </Magnetic>
                  </div>
                </div>

                <div className="mt-8 space-y-5" data-testid="list-expertise-proof">
                   <p className="flex items-center gap-4 micro-eyebrow text-foreground/65" data-testid="text-expertise-proof-0"><Check className="w-5 h-5 text-primary" /> BS 42020:2013 compliant</p>
                   <p className="flex items-center gap-4 micro-eyebrow text-foreground/65" data-testid="text-expertise-proof-1"><Check className="w-5 h-5 text-primary" /> CIEEM registered practice</p>
                   <p className="flex items-center gap-4 micro-eyebrow text-foreground/65" data-testid="text-expertise-proof-2"><Check className="w-5 h-5 text-primary" /> ISO 9001 / 14001 certified</p>
                   <p className="flex items-center gap-4 micro-eyebrow text-foreground/65" data-testid="text-expertise-proof-3"><Check className="w-5 h-5 text-primary" /> Professional indemnity cover in place</p>
                </div>
              </div>
             </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

const ServiceSection = ({ service, index }: { service: any; index: number }) => {
  return (
    <section
      className={cx(
        "group border-b border-foreground/10 bg-background",
        "[--inset:24px] md:[--inset:48px]",
        "py-24 md:py-36"
      )}
      data-testid={`section-service-${index}`}
    >
      <div className="relative">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -inset-24 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
            <div className="absolute -inset-24 bg-[radial-gradient(ellipse_at_top,rgba(126,180,58,0.2),transparent_58%)]" />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-14 relative z-10">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-4 mb-10">
              <span className="h-[1px] w-12 bg-primary" aria-hidden="true" />
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] tone-whisper" data-testid={`text-service-id-${index}`}>
                {service.id}
              </div>
            </div>

            <h2
              className="text-5xl md:text-7xl lg:text-8xl leading-[0.9] tracking-[-0.04em]"
              data-testid={`text-service-title-${index}`}
            >
              <span className="editorial-title">{service.category}</span>
            </h2>

            <p
              className="mt-8 max-w-xl text-lg md:text-xl font-light leading-relaxed tone-supporting"
              data-testid={`text-service-desc-${index}`}
            >
              {service.description}
            </p>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-foreground/10 bg-card overflow-hidden" data-testid={`card-service-${index}`}>
              <div className="grid grid-cols-1 lg:grid-cols-12">
                <div className="lg:col-span-5 border-b lg:border-b-0 lg:border-r border-foreground/10">
                  <div className="p-6 md:p-8">
                    <img
                      src={service.image}
                      alt={service.category}
                      className="w-full h-[220px] md:h-[260px] object-cover rounded-2xl"
                      data-testid={`img-service-${index}`}
                    />
                    <div className="mt-6 flex items-center gap-3">
                      <service.icon className="w-4 h-4 text-primary" aria-hidden="true" />
                      <div
                        className="font-mono text-[10px] uppercase tracking-[0.22em] tone-whisper"
                        data-testid={`text-service-label-${index}`}
                      >
                        Deliverables
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-7">
                  <div className="border-t border-foreground/10 lg:border-t-0" data-testid={`list-service-items-${index}`}>
                    {service.items.map((item: string, i: number) => (
                      <div
                        key={i}
                        className={cx(
                          "flex items-center justify-between gap-6",
                          "px-6 md:px-8 py-5",
                          "border-b border-foreground/10 last:border-b-0",
                          "hover:bg-background/60 transition-colors duration-500"
                        )}
                        data-testid={`row-service-item-${index}-${i}`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="h-1.5 w-1.5 rounded-full bg-primary/60" aria-hidden="true" />
                          <span
                            className="font-mono text-[11px] uppercase tracking-widest text-foreground/70"
                            data-testid={`text-service-item-${index}-${i}`}
                          >
                            {item}
                          </span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-primary/80 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {index === 0 ? (
              <div className="mt-10 flex flex-wrap items-center gap-4" data-testid="row-services-secondary-cta">
                <Magnetic>
                  <Link href="/contact" className="hover-underline" data-testid="link-services-cta-enquire">
                    <Button
                      data-testid="button-services-cta-enquire"
                      className="h-14 px-8 rounded-full bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground text-xs uppercase tracking-[0.2em] font-bold transition-all duration-300"
                    >
                      Start a brief <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </Magnetic>

                <div className="font-mono text-[10px] uppercase tracking-[0.22em] tone-whisper" data-testid="text-services-cta-note">
                  Typical response within 24 hours.
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
};
