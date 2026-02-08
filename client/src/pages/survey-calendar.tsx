import { useMemo, useState } from "react";
import { Link } from "wouter";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, CalendarDays, Filter, ChevronRight, Download } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";

// Import bespoke species icons
import iconBat from "@/assets/icons/species-bat.png";
import iconNewt from "@/assets/icons/species-newt.png";
import iconBird from "@/assets/icons/species-bird.png";
import iconHabitat from "@/assets/icons/species-habitat.png";
import iconAquatic from "@/assets/icons/species-aquatic.png";
import iconDormouse from "@/assets/icons/species-dormouse.png";
import iconReptile from "@/assets/icons/species-reptile.png";
import iconInvertebrate from "@/assets/icons/species-invertebrate.png";
import iconBadger from "@/assets/icons/species-badger.png";
import iconCrayfish from "@/assets/icons/species-crayfish.png";
import heroVideo from "@/assets/videos/hero-habitat-premium.mp4";

type SurveyWindow = {
  id: string;
  title: string;
  group: string;
  keyMonths: number[];
  otherMonths: number[];
  leadTime: string;
  output: string;
  note: string;
  icon?: string;
};

type WindowStatus = "key" | "other" | "off";

const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"] as const;

// Mapping groups to images
const GROUP_ICONS: Record<string, string> = {
  "Bats": iconBat,
  "Birds": iconBird,
  "Great crested newt": iconNewt,
  "Habitats": iconHabitat,
  "Aquatic species": iconAquatic,
  "Dormouse": iconDormouse,
  "Reptiles": iconReptile,
  "Invertebrates": iconInvertebrate,
  "Badger": iconBadger,
};

// Fallback icon logic if group not found
const getIcon = (group: string) => GROUP_ICONS[group] || iconHabitat;

const SURVEY_WINDOWS: SurveyWindow[] = [
  {
    id: "phase1",
    title: "Extended Phase 1 Habitat Survey",
    group: "Habitats",
    keyMonths: [3, 4, 5, 6, 7, 8],
    otherMonths: [0, 1, 2, 9, 10, 11],
    leadTime: "5-7 days",
    output: "Habitat map, target notes, constraints plan.",
    note: "Optimal Apr-Sep. Sub-optimal Oct-Mar (may require follow-up).",
  },
  {
    id: "bat-summer-roost",
    title: "Bat Roost Characterisation (Emergence/Re-entry)",
    group: "Bats",
    keyMonths: [4, 5, 6, 7],
    otherMonths: [8],
    leadTime: "7-10 days",
    output: "Roost status, species, population size, mitigation class.",
    note: "May-Aug is optimal. Sep is sub-optimal.",
  },
  {
    id: "bat-activity",
    title: "Bat Activity (Transect/Static)",
    group: "Bats",
    keyMonths: [3, 4, 5, 6, 7, 8, 9],
    otherMonths: [],
    leadTime: "7-10 days",
    output: "Activity heatmap, species assemblage, landscape usage.",
    note: "Apr-Oct optimal.",
  },
  {
    id: "bat-hibernation-roost",
    title: "Bat Hibernation Roost",
    group: "Bats",
    keyMonths: [11, 0, 1],
    otherMonths: [10, 2],
    leadTime: "7-10 days",
    output: "Winter usage evidence, temperature/humidity logging.",
    note: "Dec-Feb optimal. Nov/Mar sub-optimal.",
  },
  {
    id: "bat-tree-survey",
    title: "Bat Tree Assessment (PRA)",
    group: "Bats",
    keyMonths: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    otherMonths: [],
    leadTime: "5 days",
    output: "Roost potential categorisation (High/Mod/Low).",
    note: "Can be undertaken year-round.",
  },
  {
    id: "breeding-birds",
    title: "Breeding Bird Survey",
    group: "Birds",
    keyMonths: [2, 3, 4, 5],
    otherMonths: [6, 7],
    leadTime: "5-10 days",
    output: "Territory mapping, breeding status index.",
    note: "Mar-Jun optimal. Jul-Aug sub-optimal.",
  },
  {
    id: "winter-birds",
    title: "Wintering Bird Survey",
    group: "Birds",
    keyMonths: [10, 11, 0, 1],
    otherMonths: [9, 2],
    leadTime: "5-10 days",
    output: "Assemblage counts, distribution, high-tide roosts.",
    note: "Nov-Feb optimal. Oct/Mar sub-optimal.",
  },
  {
    id: "gcn-dna",
    title: "GCN eDNA Sampling",
    group: "Great crested newt",
    keyMonths: [3, 4, 5],
    otherMonths: [],
    leadTime: "5-10 days",
    output: "Presence/Absence (100% reliable window).",
    note: "Mid-Apr to Jun.",
  },
  {
    id: "gcn-population",
    title: "GCN Population Estimate",
    group: "Great crested newt",
    keyMonths: [2, 3, 4, 5],
    otherMonths: [],
    leadTime: "10-15 days",
    output: "Population size class (Small/Med/Large).",
    note: "Mid-Mar to Mid-Jun. 3 surveys must be mid-Apr to mid-May.",
  },
  {
    id: "reptiles",
    title: "Reptile Presence/Absence",
    group: "Reptiles",
    keyMonths: [3, 4, 8],
    otherMonths: [2, 5, 6, 7, 9],
    leadTime: "7-14 days",
    output: "Species list, population class estimate.",
    note: "Apr-May & Sep optimal. Mar/Jun-Aug/Oct sub-optimal.",
  },
  {
    id: "badger",
    title: "Badger Activity & Territory",
    group: "Badger",
    keyMonths: [1, 2, 3, 8, 9, 10],
    otherMonths: [0, 4, 5, 6, 7, 11],
    leadTime: "5-7 days",
    output: "Sett classification, bait marking results.",
    note: "Feb-Apr & Sep-Nov optimal. Jan/May-Aug/Dec sub-optimal.",
  },
  {
    id: "dormouse",
    title: "Dormouse Nest Tubes",
    group: "Dormouse",
    keyMonths: [3, 4, 5, 6, 7, 8, 9, 10],
    otherMonths: [],
    leadTime: "Monthly checks",
    output: "Index of probability score (need 20 points).",
    note: "Apr-Nov survey season.",
  },
  {
    id: "water-vole",
    title: "Water Vole Survey",
    group: "Aquatic species",
    keyMonths: [3, 4, 5, 6, 7, 8],
    otherMonths: [2, 9],
    leadTime: "5-8 days",
    output: "Population mapping, latrine counts.",
    note: "Apr-Sep optimal. Mar/Oct sub-optimal.",
  },
  {
    id: "otter",
    title: "Otter Survey",
    group: "Aquatic species",
    keyMonths: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    otherMonths: [],
    leadTime: "5-8 days",
    output: "Holt identification, spraint analysis.",
    note: "Year-round.",
  },
  {
    id: "invertebrates",
    title: "Terrestrial Invertebrates",
    group: "Invertebrates",
    keyMonths: [4, 5, 6, 7, 8],
    otherMonths: [3, 9],
    leadTime: "10-15 days",
    output: "Species list, community conservation index.",
    note: "May-Sep core. Specific timing depends on target taxa.",
  },
  {
    id: "crayfish",
    title: "White-Clawed Crayfish",
    group: "Aquatic species",
    keyMonths: [6, 7, 8],
    otherMonths: [],
    leadTime: "7-10 days",
    output: "Presence/Absence, population estimate.",
    note: "Jul-Sep main survey season.",
    icon: iconCrayfish,
  },
];

const statusForMonth = (item: SurveyWindow, monthIndex: number): WindowStatus => {
  if (item.keyMonths.includes(monthIndex)) return "key";
  if (item.otherMonths.includes(monthIndex)) return "other";
  return "off";
};

// --- Radial Wheel Component ---
const SurveyWheel = ({ item, activeMonth }: { item: SurveyWindow; activeMonth: number }) => {
  // 12 segments
  const radius = 50;
  const innerRadius = 25;
  const strokeWidth = 1;
  const center = 60; // 120x120 SVG

  // Generate SVG paths for segments
  const segments = MONTHS.map((_, i) => {
    // 360 / 12 = 30 degrees per segment
    // We start at -90deg (12 o'clock)
    const startAngle = (i * 30 - 90) * (Math.PI / 180);
    const endAngle = ((i + 1) * 30 - 90) * (Math.PI / 180);

    const x1 = center + radius * Math.cos(startAngle);
    const y1 = center + radius * Math.sin(startAngle);
    const x2 = center + radius * Math.cos(endAngle);
    const y2 = center + radius * Math.sin(endAngle);

    const x3 = center + innerRadius * Math.cos(endAngle);
    const y3 = center + innerRadius * Math.sin(endAngle);
    const x4 = center + innerRadius * Math.cos(startAngle);
    const y4 = center + innerRadius * Math.sin(startAngle);

    // SVG Path command for an arc segment
    const d = `
      M ${x1} ${y1}
      A ${radius} ${radius} 0 0 1 ${x2} ${y2}
      L ${x3} ${y3}
      A ${innerRadius} ${innerRadius} 0 0 0 ${x4} ${y4}
      Z
    `;

    const status = statusForMonth(item, i);
    const isActive = i === activeMonth;

    let fill = "transparent";
    let stroke = "rgba(20,34,27,0.16)";

    if (status === "key") {
      fill = "var(--color-primary)";
      stroke = "var(--color-primary)";
    } else if (status === "other") {
      fill = "rgba(20,34,27,0.08)";
      stroke = "rgba(20,34,27,0.22)";
    }

    if (isActive) {
      stroke = "#14221B";
    }

    // Calculate text position for month labels
    const textRadius = radius + 14;
    const textAngle = (i * 30 - 75) * (Math.PI / 180); // Adjusted angle for better alignment
    const tx = center + textRadius * Math.cos(textAngle);
    const ty = center + textRadius * Math.sin(textAngle);

    return (
      <g key={i}>
        <path
          d={d}
          fill={fill}
          stroke={stroke}
          strokeWidth={isActive ? 1.5 : 0.5}
          className="transition-all duration-300"
        />
        <text
          x={tx}
          y={ty}
          textAnchor="middle"
          dominantBaseline="middle"
          className={`text-[5px] font-mono font-bold tracking-widest ${isActive ? 'fill-primary' : 'fill-foreground/35'}`}
          transform={`rotate(${i * 30}, ${tx}, ${ty})`}
        >
          {MONTHS[i].substring(0, 3)}
        </text>
      </g>
    );
  });

  return (
    <div className="relative w-40 h-40 md:w-48 md:h-48 shrink-0 flex items-center justify-center">
      <svg viewBox="0 0 160 160" className="w-full h-full rotate-0 overflow-visible">
        <g transform="translate(20, 20)"> {/* Center the 120x120 content in 160x160 viewport */}
            {segments}
            {/* Inner circle text for current status */}
            <foreignObject x="35" y="35" width="50" height="50">
               <div className="w-full h-full flex items-center justify-center rounded-full">
                  <span className={`text-[10px] font-bold uppercase tracking-tighter ${statusForMonth(item, activeMonth) === 'key' ? 'text-primary' : 'text-foreground/45'}`}>
                    {statusForMonth(item, activeMonth) === 'key' ? 'OPEN' : 'PLAN'}
                  </span>
               </div>
            </foreignObject>
        </g>
      </svg>
    </div>
  );
};

export default function SurveyCalendar() {
  const [activeMonth, setActiveMonth] = useState(new Date().getMonth());
  const [activeGroup, setActiveGroup] = useState("All");
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 900], [0, 80]);
  const heroScale = useTransform(scrollY, [0, 900], [1, 1.06]);
  const heroOpacity = useTransform(scrollY, [0, 900], [0.32, 0.18]);

  const groups = useMemo(() => {
    const set = new Set<string>(SURVEY_WINDOWS.map((item) => item.group));
    return ["All", ...Array.from(set)];
  }, []);

  const visibleItems = useMemo(() => {
    return SURVEY_WINDOWS.filter((item) => activeGroup === "All" || item.group === activeGroup);
  }, [activeGroup]);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground overflow-x-hidden">
      <Navbar />

      <main className="pb-24">
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
            <div className="absolute left-0 right-0 bottom-0 h-[62%] hero-bottom-fade" />
            <div className="absolute inset-0 opacity-[0.08] pointer-events-none hero-noise-soft"></div>
          </div>

          <div className="hero-content-shell">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-end">
              <div className="lg:col-span-7">
                <div className="hero-rail mb-8 md:mb-10">
                  <span className="hero-rail-line" />
                  <span className="hero-rail-text">Programme Control</span>
                </div>

                <h1 className="text-[clamp(3.2rem,8.5vw,6.6rem)] leading-[0.85] tracking-[-0.048em] hero-title-light max-w-[9.4ch]">
                  <span className="display-title">Survey</span><br />
                  <span className="display-title signal-on-light">Calendar.</span>
                </h1>

                <div className="mt-10 hero-chip-row">
                  <span className="hero-chip">Planning windows</span>
                  <span className="hero-chip">Species surveys</span>
                  <span className="hero-chip">Consent readiness</span>
                </div>
              </div>

              <div className="lg:col-span-5 max-w-[34rem] lg:ml-auto lg:pl-4">
                <p className="hero-supporting hero-copy-light">
                  <span className="hero-supporting-lead">Strategic ecological programming.</span>
                  <span className="hero-supporting-body">
                    Identify critical survey windows, mitigate programme risk, and keep compliance moving with decision-ready timing.
                  </span>
                </p>

                <div className="mt-9 hero-meta-panel">
                  <div className="mb-5 flex items-center justify-between gap-4">
                    <span className="hero-meta-label mb-0">Current Period</span>
                    <span className="hero-meta-value text-xl tracking-[0.04em]">{MONTHS[activeMonth]}</span>
                  </div>

                  <div className="grid grid-cols-6 gap-1.5">
                    {MONTHS.map((m, i) => (
                      <button
                        key={m}
                        onClick={() => setActiveMonth(i)}
                        aria-label={`Set active month to ${m}`}
                        aria-pressed={activeMonth === i}
                        className={`h-9 rounded-[10px] border text-[10px] font-mono font-semibold uppercase tracking-[0.16em] transition-all duration-300 ${
                          activeMonth === i
                            ? "bg-primary text-primary-foreground border-primary shadow-[0_10px_24px_color-mix(in_srgb,var(--color-primary)_38%,transparent)]"
                            : "border-white/20 text-white/70 hover:border-primary/70 hover:text-primary"
                        }`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Controls + Grid */}
        <section className="px-6 md:px-12 py-14 md:py-16">
          <div className="max-w-[1600px] mx-auto">
            {/* Filter Controls */}
            <div className="flex flex-wrap gap-3 mb-14">
              {groups.map((group) => (
                <button
                  key={group}
                  onClick={() => setActiveGroup(group)}
                  className={`h-10 px-6 rounded-full border text-xs font-bold uppercase tracking-[0.15em] transition-all duration-300 flex items-center gap-2 ${
                    activeGroup === group
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-transparent border-foreground/20 text-foreground/60 hover:border-primary hover:text-primary"
                  }`}
                >
                  {group}
                </button>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6">
              {visibleItems.map((item) => (
                <div 
                  key={item.id} 
                  className="group relative bg-card border border-foreground/10 rounded-sm p-8 hover:border-primary/50 transition-colors duration-500 overflow-hidden"
                >
                  {/* Background Tech Mesh */}
                  <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
                  
                  <div className="relative z-10 flex flex-col md:flex-row gap-6 items-start">
                    {/* The Wheel */}
                    <SurveyWheel item={item} activeMonth={activeMonth} />

                    <div className="flex-1 min-w-0">
                      {/* Logo + Title */}
                      <div className="flex flex-col gap-6 mb-8">
                         <div className="w-20 h-20 md:w-24 md:h-24 bg-background/70 rounded-sm border border-foreground/12 p-4 shrink-0 group-hover:bg-primary group-hover:border-primary transition-colors duration-500 self-start">
                            <img 
                              src={item.icon || getIcon(item.group)} 
                              alt={item.group} 
                              className="w-full h-full object-contain transition-all duration-500 opacity-90 group-hover:opacity-100" 
                            />
                         </div>
                         <div className="max-w-[26ch]">
                            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary/80 mb-3 block">{item.group}</span>
                            <h3 className="text-[1.45rem] md:text-[1.7rem] font-bold text-foreground leading-[1.08] tracking-tight [overflow-wrap:anywhere] text-balance">{item.title}</h3>
                         </div>
                      </div>

                      {/* Details */}
                      <div className="space-y-4 border-t border-foreground/10 pt-6">
                         <div className="grid grid-cols-2 gap-4">
                            <div>
                               <span className="block text-[10px] uppercase tracking-widest text-foreground/45 mb-1">Turnaround</span>
                               <span className="text-sm text-foreground font-mono">{item.leadTime}</span>
                            </div>
                            <div>
                               <span className="block text-[10px] uppercase tracking-widest text-foreground/45 mb-1">Commission</span>
                               <span className={`text-sm font-mono ${statusForMonth(item, activeMonth) === 'key' ? 'text-primary' : 'text-foreground/55'}`}>
                                  {statusForMonth(item, activeMonth) === 'key' ? 'NOW' : 'ADVANCE'}
                               </span>
                            </div>
                         </div>
                         
                         <div>
                            <span className="block text-[10px] uppercase tracking-widest text-foreground/45 mb-1">Output</span>
                            <p className="text-sm text-foreground/78 leading-relaxed">{item.output}</p>
                         </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Hover visual cue */}
                  <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-primary group-hover:w-full transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]" />
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* Call to Action Footer Strip */}
        <section className="border-y border-secondary-foreground/14 bg-secondary text-secondary-foreground">
           <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-16 flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                 <h3 className="text-3xl font-bold text-secondary-foreground mb-2">Programme Risk Assessment</h3>
                 <p className="text-secondary-foreground/72 max-w-xl">
                    Share your project timeline. We'll cross-reference critical survey windows against your submission targets.
                 </p>
              </div>
              <Magnetic>
                <Link href="/contact">
                  <Button className="h-14 px-8 rounded-full bg-[var(--color-signal)] text-[#10160f] hover:bg-[#d7ff64] hover:text-[#10160f] text-sm uppercase tracking-[0.2em] font-bold transition-all duration-300 hover:shadow-[0_0_20px_rgba(198,255,46,0.55)]">
                    Book Assessment <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </Magnetic>
           </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
