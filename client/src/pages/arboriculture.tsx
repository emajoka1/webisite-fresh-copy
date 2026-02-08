import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "wouter";
import { motion, useScroll, useTransform } from "framer-motion";

import miyawaki2 from "@/assets/images/arboriculture-miyawaki-2.jpg";
import miyawaki4 from "@/assets/images/arboriculture-miyawaki-4.jpg";
import miyawaki5 from "@/assets/images/arboriculture-miyawaki-5.jpg";
import treePlanting2 from "@/assets/images/arboriculture-tree-planting-2.jpg";

const Pill = ({ children }: { children: string }) => {
  return (
    <span
      className="inline-flex items-center rounded-full border border-foreground/10 bg-card px-4 py-2 micro-eyebrow tone-whisper"
      data-testid={`pill-${children.toLowerCase().replaceAll(" ", "-")}`}
    >
      {children}
    </span>
  );
};

const Chapter = ({
  index,
  title,
  items,
  note,
  testId,
}: {
  index: string;
  title: string;
  items: string[];
  note?: string;
  testId: string;
}) => {
  return (
    <div
      className="rounded-3xl border border-foreground/10 bg-card overflow-hidden"
      data-testid={testId}
    >
      <div className="p-8 md:p-10">
        <div className="flex items-start justify-between gap-8">
          <div>
            <div className="micro-eyebrow tone-whisper" data-testid={`${testId}-index`}>
              {index}
            </div>
            <h3 className="mt-4 text-2xl md:text-3xl leading-tight" data-testid={`${testId}-title`}>
              <span className="editorial-title">{title}</span>
            </h3>
          </div>
          <div className="hidden md:block text-right">
            <div className="micro-eyebrow tone-whisper" data-testid={`${testId}-tag`}>
              Division
            </div>
            <div className="mt-2 h-[1px] w-16 bg-foreground/10 ml-auto" />
          </div>
        </div>

        <div className="mt-8 border-t border-foreground/10" data-testid={`${testId}-list`}>
          {items.map((it, idx) => (
            <div
              key={it}
              className="flex items-center justify-between gap-6 py-4 border-b border-foreground/10 last:border-b-0"
              data-testid={`${testId}-item-${idx}`}
            >
              <span className="micro-detail text-foreground/72">{it}</span>
              <span className="h-1.5 w-1.5 rounded-full bg-primary/60" aria-hidden="true" />
            </div>
          ))}
        </div>

        {note ? (
          <p className="mt-8 micro-detail tone-whisper" data-testid={`${testId}-note`}>
            {note}
          </p>
        ) : null}
      </div>
    </div>
  );
};

const ImageInterlude = () => {
  const images = [
    { src: miyawaki5, alt: "Miyawaki woodland establishment", id: "miyawaki-5" },
    { src: miyawaki4, alt: "Young woodland planting in a protected plot", id: "miyawaki-4" },
    { src: miyawaki2, alt: "Miyawaki plot with protection fencing", id: "miyawaki-2" },
    { src: treePlanting2, alt: "Tree planting and establishment", id: "tree-planting-2" },
  ];

  return (
    <section className="py-24 md:py-32 bg-secondary text-secondary-foreground relative overflow-hidden" data-testid="section-arboriculture-interlude">
      <div className="absolute inset-0 hero-ink opacity-80" />
      <div className="absolute inset-0 opacity-[0.08] pointer-events-none" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="flex items-end justify-between gap-10">
          <div>
            <span className="kicker text-primary" data-testid="text-arboriculture-gallery-kicker">
              Field work
            </span>
            <h2 className="mt-6 text-4xl md:text-6xl leading-[0.95]" data-testid="text-arboriculture-gallery-title">
              <span className="editorial-title">Evidence, in landscape.</span>
            </h2>
          </div>
          <div className="hidden md:flex gap-2" data-testid="row-arboriculture-pills">
            <Pill>BS5837</Pill>
            <Pill>Tree Safety</Pill>
            <Pill>Miyawaki</Pill>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-12 gap-6" data-testid="grid-arboriculture-images">
          <div className="md:col-span-8">
            <div
              className="relative rounded-3xl overflow-hidden border border-secondary-foreground/12 bg-secondary/30 hero-glow img-frame group"
              data-testid="frame-arboriculture-hero-image"
            >
              <div className="absolute inset-0 img-sheen" aria-hidden="true" />
              <img
                src={images[0].src}
                alt={images[0].alt}
                className="w-full h-[380px] md:h-[540px] object-cover img-grade"
                data-testid={`img-arboriculture-${images[0].id}`}
              />
              <div className="absolute left-6 bottom-6 right-6 flex items-end justify-between gap-6" data-testid="row-arboriculture-image-caption-0">
                <div>
                  <div className="micro-eyebrow text-secondary-foreground/72" data-testid="text-arboriculture-image-index-0">01</div>
                  <div className="mt-2 text-xl md:text-2xl leading-tight text-secondary-foreground" data-testid="text-arboriculture-image-title-0">
                    <span className="editorial-title">Woodland establishment</span>
                  </div>
                </div>
                <div className="hidden md:block micro-eyebrow text-secondary-foreground/62" data-testid="text-arboriculture-image-meta-0">
                  Miyawaki · Establishment
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-4 grid grid-cols-1 gap-6" data-testid="col-arboriculture-side-images">
            {images.slice(1).map((img, i) => (
              <div
                key={img.id}
                className="relative rounded-3xl overflow-hidden border border-secondary-foreground/12 bg-secondary/30 hero-glow img-frame group"
                data-testid={`frame-arboriculture-${img.id}`}
              >
                <div className="absolute inset-0 img-sheen" aria-hidden="true" />
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-[240px] md:h-[170px] object-cover img-grade-soft"
                  data-testid={`img-arboriculture-${img.id}`}
                />
                <div className="absolute left-5 right-5 bottom-5 flex items-center justify-between gap-4" data-testid={`row-arboriculture-image-caption-${i + 1}`}
                >
                  <div className="micro-eyebrow text-secondary-foreground/72" data-testid={`text-arboriculture-image-index-${i + 1}`}
                  >
                    0{i + 2}
                  </div>
                  <div className="h-[1px] flex-1 bg-secondary-foreground/10" aria-hidden="true" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default function Arboriculture() {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 900], [0, 70]);
  const heroScale = useTransform(scrollY, [0, 900], [1, 1.05]);
  const heroOpacity = useTransform(scrollY, [0, 900], [1, 0.92]);

  return (
    <div className="bg-background min-h-screen text-foreground overflow-hidden selection:bg-primary selection:text-primary-foreground">
      <Navbar />

      <main>
        {/* HERO (campaign editorial) */}
        <section
          className="hero-shell min-h-[86vh] flex flex-col justify-end pb-24 md:pb-28 px-6 md:px-12"
          data-testid="section-arboriculture-hero"
        >
          <div className="absolute inset-0 z-0">
            <motion.div className="absolute inset-0" style={{ y: heroY, scale: heroScale, opacity: heroOpacity }}>
              <img
                src={miyawaki5}
                alt="Woodland creation"
                className="absolute inset-0 w-full h-full object-cover opacity-[0.82] hero-video-grade"
                data-testid="img-arboriculture-hero"
              />
            </motion.div>

            <div className="absolute inset-0 hero-overlay-structured opacity-[0.93]" />
            <div className="absolute inset-0 pointer-events-none hero-brand-wash opacity-[0.4]" />
            <div className="absolute inset-y-0 left-0 w-[74%] hero-side-fade" />
            <div className="absolute left-0 right-0 bottom-0 h-[64%] hero-bottom-fade" />

            <div
              className="absolute inset-0 opacity-[0.08] pointer-events-none hero-noise-soft"
              aria-hidden="true"
            />
          </div>

          <div className="hero-content-shell">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-end">
              <div className="lg:col-span-7">
                <div className="flex items-center gap-4 mb-10">
                  <span className="h-[1px] w-12 bg-primary" aria-hidden="true" />
                  <span className="kicker text-primary" data-testid="text-arboriculture-hero-kicker">
                    Arboriculture
                  </span>
                </div>

                <h1 className="text-[11vw] md:text-[7vw] leading-[0.82] tracking-[-0.055em] hero-title-light" data-testid="text-arboriculture-hero-title">
                  <span className="display-title">Trees.</span>
                  <br />
                  <span className="text-transparent stroke-text-white display-title">Delivered.</span>
                </h1>
              </div>

              <div className="lg:col-span-5">
                <p className="hero-supporting hero-copy-light" data-testid="text-arboriculture-hero-supporting">
                  <span className="hero-supporting-lead">Planning-grade certainty.</span>
                  <span className="hero-supporting-body">
                    BS5837 reporting, tree risk advice, and implementation support aligned to programme, planning, and long-term landscape performance.
                  </span>
                </p>

                <div className="mt-10 flex flex-wrap gap-2" data-testid="row-arboriculture-hero-pills">
                  <Pill>BS5837</Pill>
                  <Pill>Mortgage & Insurance</Pill>
                  <Pill>Tree Safety</Pill>
                </div>

                <div className="mt-12 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center" data-testid="row-arboriculture-ctas">
                  <Magnetic>
                    <Link href="/contact" data-testid="link-arboriculture-enquire">
                      <Button
                        data-testid="button-arboriculture-enquire"
                        className="h-14 px-8 rounded-full bg-primary text-primary-foreground hover:bg-secondary hover:text-secondary-foreground text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 w-full sm:w-auto"
                      >
                        Enquire now <ArrowUpRight className="ml-2 w-4 h-4" />
                      </Button>
                    </Link>
                  </Magnetic>

                  <Magnetic>
                    <Link href="/expertise" className="hover-underline" data-testid="link-arboriculture-back-to-services">
                      <Button
                        variant="outline"
                        data-testid="button-arboriculture-back"
                        className="h-14 px-8 rounded-full border-secondary-foreground/20 bg-transparent text-secondary-foreground hover:bg-secondary-foreground hover:text-secondary uppercase tracking-[0.2em] text-xs font-bold transition-all duration-300 w-full sm:w-auto"
                      >
                        Back to services <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </Link>
                  </Magnetic>
                </div>

                <div className="mt-10 micro-eyebrow tone-on-dark-whisper" data-testid="text-arboriculture-hero-note">
                  One specialist team from survey to site delivery.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* MANIFESTO */}
        <section className="py-24 md:py-32 px-6 md:px-12 bg-background" data-testid="section-arboriculture-manifesto">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-14 items-start">
            <div className="lg:col-span-6">
              <div className="flex items-center gap-4 mb-10">
                <span className="h-[1px] w-12 bg-primary" aria-hidden="true" />
                <span className="kicker text-primary" data-testid="text-arboriculture-manifesto-kicker">
                  Our approach
                </span>
              </div>

              <h2 className="text-4xl md:text-6xl leading-[0.95]" data-testid="text-arboriculture-manifesto-title">
                <span className="editorial-title">Evidence first. Delivery always.</span>
              </h2>

              <p className="mt-8 tone-supporting text-lg md:text-xl font-light leading-relaxed" data-testid="text-arboriculture-manifesto-body">
                We combine planning-ready arboricultural reporting with practical delivery capability. The result is defensible evidence, clear recommendations, and implementation that stands up in planning and on site.
              </p>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-3xl border border-foreground/10 bg-card p-8 md:p-10" data-testid="card-arboriculture-principles">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8" data-testid="grid-arboriculture-principles">
                  {[
                    { k: "Planning", v: "BS5837 outputs built for validation." },
                    { k: "Risk", v: "Mortgage/insurance reporting with clear conclusions." },
                    { k: "Safety", v: "Pragmatic recommendations, prioritised." },
                    { k: "Implementation", v: "Woodland, meadows, hedgerows, fencing." },
                  ].map((p, idx) => (
                    <div key={p.k} data-testid={`item-arboriculture-principle-${idx}`}>
                      <div className="micro-eyebrow tone-whisper" data-testid={`text-arboriculture-principle-k-${idx}`}>
                        {p.k}
                      </div>
                      <div className="mt-3 text-base md:text-lg leading-snug" data-testid={`text-arboriculture-principle-v-${idx}`}>
                        <span className="editorial-title">{p.v}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-24 px-6 md:px-12 bg-background border-t border-foreground/10" data-testid="section-arboriculture-value">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-4 mb-12">
              <span className="h-[1px] w-12 bg-primary" aria-hidden="true" />
              <span className="kicker text-primary" data-testid="text-arboriculture-value-kicker">
                Where We Add Value
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6" data-testid="grid-arboriculture-value">
              {[
                {
                  title: "Before design freeze",
                  body: "Early tree constraints advice that helps teams protect priority trees while retaining practical developable area.",
                },
                {
                  title: "At planning submission",
                  body: "BS5837-compliant reports, schedules, and protection recommendations drafted for validation and determination.",
                },
                {
                  title: "During delivery",
                  body: "On-site arboricultural input to keep works compliant, safe, and coordinated with the wider construction programme.",
                },
              ].map((item, i) => (
                <div key={item.title} className="card-metal rounded-3xl p-7 md:p-8" data-testid={`card-arboriculture-value-${i}`}>
                  <div className="micro-eyebrow tone-whisper mb-4">0{i + 1}</div>
                  <h3 className="text-2xl leading-tight" data-testid={`text-arboriculture-value-title-${i}`}>
                    <span className="editorial-title">{item.title}</span>
                  </h3>
                  <p className="mt-4 tone-supporting text-sm leading-relaxed" data-testid={`text-arboriculture-value-body-${i}`}>
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* DIVISIONS */}
        <section className="py-24 md:py-32 px-6 md:px-12 bg-background border-t border-foreground/10" data-testid="section-arboriculture-divisions">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-4 mb-14">
              <span className="h-[1px] w-12 bg-primary" aria-hidden="true" />
              <span className="kicker text-primary" data-testid="text-arboriculture-divisions-kicker">
                Divisions
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" data-testid="grid-arboriculture-services">
              <div className="lg:col-span-5">
                <Chapter
                  index="01"
                  title="Arboricultural consultancy"
                  items={["BS5837 planning reports", "Mortgage and insurance reports", "Tree safety surveys", "Trees and woodland advice"]}
                  note="Planning-ready documentation with practical, defensible recommendations."
                  testId="card-arboriculture-consultancy"
                />
              </div>
              <div className="lg:col-span-4">
                <Chapter
                  index="02"
                  title="Tree surgery & forestry"
                  items={["Pruning and crown management", "Felling and dismantling", "Timber processing and clearance"]}
                  note="Competent operational teams focused on safety and programme reliability."
                  testId="card-arboriculture-surgery"
                />
              </div>
              <div className="lg:col-span-3">
                <Chapter
                  index="03"
                  title="Landscape implementation"
                  items={["Wildflower meadow creation", "Woodland creation (Miyawaki)", "Hedgerow management", "Countryside fencing"]}
                  note="Implementation and aftercare support for long-term landscape performance."
                  testId="card-arboriculture-landscape"
                />
              </div>
            </div>
          </div>
        </section>

        <ImageInterlude />

        <Footer />
      </main>
    </div>
  );
}
