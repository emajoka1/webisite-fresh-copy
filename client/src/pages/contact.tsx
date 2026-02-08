import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import contactHero from "@/assets/images/contact-hero.png";

const FastTrackModule = () => {
  type ServiceKey = "pea" | "pra" | "bng" | "species";
  type StageKey = "appraisal" | "prePlanning" | "validation" | "postConsent";
  type ContextKey = "urban" | "edge" | "strategic";

  const [service, setService] = useState<ServiceKey>("pea");
  const [stage, setStage] = useState<StageKey>("prePlanning");
  const [siteContext, setSiteContext] = useState<ContextKey>("edge");
  const [hectares, setHectares] = useState(0.5);
  const [isUrgent, setIsUrgent] = useState(false);
  const [requiredBy, setRequiredBy] = useState("");
  const [projectName, setProjectName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [briefCopied, setBriefCopied] = useState(false);
  const [submitState, setSubmitState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [submitMessage, setSubmitMessage] = useState("");

  const serviceData: Record<ServiceKey, { label: string; desc: string; baseDays: number; outputs: string[]; weight: number }> = {
    pea: {
      label: "PEA Survey",
      desc: "Early ecological appraisal and planning risk review",
      baseDays: 5,
      outputs: ["Planning-ready baseline and constraints note", "Survey route for follow-on requirements"],
      weight: 0,
    },
    pra: {
      label: "PRA (Bats)",
      desc: "Roost risk screening and survey route planning",
      baseDays: 7,
      outputs: ["Roost risk classification", "Targeted survey mobilisation plan"],
      weight: 1,
    },
    bng: {
      label: "BNG Assessment",
      desc: "Defra metric modelling and delivery strategy",
      baseDays: 8,
      outputs: ["Defra metric workbook", "Mitigation and delivery strategy summary"],
      weight: 2,
    },
    species: {
      label: "Protected Species",
      desc: "Targeted species surveys and licensing advice",
      baseDays: 8,
      outputs: ["Species survey findings", "Licensing and mitigation route note"],
      weight: 1,
    },
  };

  const stageData: Record<StageKey, { label: string; detail: string; deliverable: string; weight: number }> = {
    appraisal: {
      label: "Site appraisal",
      detail: "Early feasibility and risk framing",
      deliverable: "High-level ecology risk matrix",
      weight: 0,
    },
    prePlanning: {
      label: "Pre-planning",
      detail: "Commissioning before submission",
      deliverable: "Planning submission scope and sequencing note",
      weight: 1,
    },
    validation: {
      label: "Validation stage",
      detail: "Fast response to planning requirements",
      deliverable: "Authority-ready response schedule",
      weight: 2,
    },
    postConsent: {
      label: "Post-consent",
      detail: "Discharge and implementation",
      deliverable: "Condition discharge and implementation tracker",
      weight: 1,
    },
  };

  const contextData: Record<ContextKey, { label: string; detail: string; deliverable: string; weight: number }> = {
    urban: {
      label: "Urban infill",
      detail: "Tight boundaries and interfaces",
      deliverable: "Neighbour interface mitigation note",
      weight: 0,
    },
    edge: {
      label: "Settlement edge",
      detail: "Mixed baseline habitats",
      deliverable: "Habitat transition strategy",
      weight: 1,
    },
    strategic: {
      label: "Strategic land",
      detail: "Multi-phase programme scale",
      deliverable: "Phased ecology governance framework",
      weight: 2,
    },
  };

  const hectareWeight = hectares >= 5 ? 2 : hectares >= 2 ? 1 : 0;
  const urgencyWeight = isUrgent ? 2 : 0;
  const complexityScore =
    serviceData[service].weight + stageData[stage].weight + contextData[siteContext].weight + hectareWeight + urgencyWeight;

  const routeModel =
    complexityScore >= 6 ? "Strategic Programme Route" : complexityScore >= 3 ? "Integrated Planning Route" : "Focused Compliance Route";
  const teamModel =
    complexityScore >= 6
      ? "Senior ecologist + specialist survey cell"
      : complexityScore >= 3
        ? "Lead ecologist + technical support"
        : "Single lead ecologist";

  const leadMin = Math.max(3, serviceData[service].baseDays + Math.round(complexityScore * 0.7) - (isUrgent ? 2 : 0));
  const leadMax = leadMin + 3;
  const mobilisation = isUrgent ? "Priority mobilisation within 48 hours" : "Mobilisation typically within 5 working days";

  const deadlineDate = requiredBy ? new Date(requiredBy) : null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const daysUntilDeadline = deadlineDate ? Math.ceil((deadlineDate.getTime() - today.getTime()) / 86400000) : null;

  const deadlineMessage =
    daysUntilDeadline === null
      ? "Set a required-by date to assess programme fit."
      : daysUntilDeadline < leadMin
        ? "Deadline is tight: accelerated sequencing and focused scope needed."
        : daysUntilDeadline <= leadMax + 2
          ? "Deadline is feasible with a fast-tracked commissioning route."
          : "Deadline allows a standard quality-assured delivery route.";

  const recommendedOutputs = Array.from(
    new Set([...serviceData[service].outputs, stageData[stage].deliverable, contextData[siteContext].deliverable]),
  );

  const requestSummary = [
    `Service: ${serviceData[service].label}`,
    `Planning stage: ${stageData[stage].label}`,
    `Site context: ${contextData[siteContext].label}`,
    `Site size: ${hectares.toFixed(1)} ha`,
    `Route: ${routeModel}`,
    `Team model: ${teamModel}`,
    `Indicative turnaround: ${leadMin} to ${leadMax} working days`,
    `Mobilisation: ${mobilisation}`,
    requiredBy ? `Required by: ${requiredBy}` : "Required by: not provided",
    projectName ? `Project: ${projectName}` : "Project: not provided",
    contactEmail ? `Contact email: ${contactEmail}` : "Contact email: not provided",
    "",
    "Recommended outputs:",
    ...recommendedOutputs.map((item) => `- ${item}`),
  ].join("\n");

  const copyBrief = async () => {
    try {
      await navigator.clipboard.writeText(requestSummary);
      setBriefCopied(true);
      window.setTimeout(() => setBriefCopied(false), 2000);
    } catch {
      setBriefCopied(false);
    }
  };

  const downloadBrief = () => {
    const blob = new Blob([requestSummary], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "ecology-brief-summary.txt";
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const requestFormalProposal = async () => {
    const trimmedProjectName = projectName.trim();
    const trimmedEmail = contactEmail.trim().toLowerCase();

    if (!trimmedProjectName) {
      setSubmitState("error");
      setSubmitMessage("Add a project name before requesting a formal proposal.");
      return;
    }

    if (!trimmedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setSubmitState("error");
      setSubmitMessage("Provide a valid contact email so our team can review and respond.");
      return;
    }

    setSubmitState("submitting");
    setSubmitMessage("Generating internal quote draft and routing for team review...");

    try {
      const response = await fetch("/api/quotes/request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          service,
          stage,
          siteContext,
          hectares,
          isUrgent,
          requiredBy: requiredBy || null,
          projectName: trimmedProjectName,
          contactEmail: trimmedEmail,
        }),
      });

      const payload = (await response.json().catch(() => ({}))) as {
        message?: string;
        reference?: string;
      };

      if (!response.ok) {
        throw new Error(payload.message || "Unable to process quote request right now.");
      }

      setSubmitState("success");
      setSubmitMessage(
        `${payload.reference ? `${payload.reference} created. ` : ""}Your request is queued for internal review before any client-facing quote is sent.`,
      );
    } catch (error) {
      setSubmitState("error");
      setSubmitMessage(error instanceof Error ? error.message : "Unable to process quote request right now.");
    }
  };

  return (
    <motion.div 
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full bg-card border border-foreground/10 p-8 md:p-12 relative overflow-hidden h-full flex flex-col justify-center"
    >
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[80px] rounded-full pointer-events-none"></div>

        {/* Header - Glassy & Techy */}
        <div className="flex justify-between items-center mb-12 border-b border-foreground/10 pb-6">
             <div className="flex items-center gap-3 relative z-10">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_rgba(126,180,58,0.48)]"></div>
                <span className="kicker text-foreground">Quick Quote</span>
             </div>
             <div className="micro-eyebrow text-foreground/55 relative z-10">
                Scope Preview
             </div>
        </div>

        <div className="space-y-10">
            {/* Service Selection */}
            <div className="space-y-4">
                <label className="kicker text-foreground/55 block">Select Service</label>
                <div className="grid grid-cols-2 gap-4">
                    {(Object.entries(serviceData) as [ServiceKey, (typeof serviceData)[ServiceKey]][]).map(([key, data]) => (
                        <button
                            key={key}
                            onClick={() => setService(key)}
                            data-testid={`button-select-service-${key}`}
                            className={`p-4 text-left border transition-all duration-300 relative overflow-hidden group ${service === key ? 'bg-primary border-primary text-primary-foreground' : 'bg-transparent border-foreground/10 text-foreground hover:border-foreground/25'}`}
                        >
                            <span className="relative z-10 block text-xs font-bold uppercase tracking-tight">{data.label}</span>
                            <span className={`relative z-10 block text-[11px] mt-1 leading-[1.35] ${service === key ? 'text-primary-foreground/78 font-medium' : 'text-foreground/60 font-medium'}`}>
                                {data.desc}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            <div className="space-y-4">
                <label className="kicker text-foreground/55 block">Planning Stage</label>
                <div className="grid grid-cols-2 gap-3">
                    {(Object.entries(stageData) as [StageKey, (typeof stageData)[StageKey]][]).map(([key, data]) => (
                        <button
                            key={key}
                            onClick={() => setStage(key)}
                            data-testid={`button-select-stage-${key}`}
                            className={`p-4 text-left border transition-all duration-300 ${stage === key ? "bg-secondary text-secondary-foreground border-secondary" : "bg-transparent border-foreground/10 hover:border-foreground/25"}`}
                        >
                            <span className="micro-eyebrow block">{data.label}</span>
                            <span className={`micro-detail mt-2 block ${stage === key ? "text-secondary-foreground/75" : "text-foreground/60"}`}>{data.detail}</span>
                        </button>
                    ))}
                </div>
            </div>

            <div className="space-y-4">
                <label className="kicker text-foreground/55 block">Site Context</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {(Object.entries(contextData) as [ContextKey, (typeof contextData)[ContextKey]][]).map(([key, data]) => (
                        <button
                            key={key}
                            onClick={() => setSiteContext(key)}
                            data-testid={`button-select-context-${key}`}
                            className={`p-4 text-left border transition-all duration-300 ${siteContext === key ? "bg-accent text-accent-foreground border-accent" : "bg-transparent border-foreground/10 hover:border-foreground/25"}`}
                        >
                            <span className="micro-eyebrow block">{data.label}</span>
                            <span className={`micro-detail mt-2 block ${siteContext === key ? "text-accent-foreground/78" : "text-foreground/60"}`}>{data.detail}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Site Size Slider */}
            <div className="space-y-4">
                <div className="flex justify-between items-end">
                    <label className="kicker text-foreground/55 block">Site Size (Hectares)</label>
                    <span className="text-xl font-bold text-primary">{hectares.toFixed(1)} ha</span>
                </div>
                <div className="relative h-2 bg-foreground/10 rounded-full w-full group cursor-pointer">
                    <input 
                        type="range" 
                        min="0.1" 
                        max="10" 
                        step="0.1"
                        value={hectares}
                        onChange={(e) => setHectares(parseFloat(e.target.value))}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                    />
                    <div className="absolute top-0 left-0 h-full bg-primary rounded-full transition-all duration-100" style={{ width: `${(hectares / 10) * 100}%` }}></div>
                    <div className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-card rounded-full shadow-lg transition-all duration-100 z-10 pointer-events-none" style={{ left: `${(hectares / 10) * 100}%`, marginLeft: '-8px' }}></div>
                </div>
            </div>

            {/* Urgency & Deadline */}
                <div className="flex items-center justify-between p-6 border border-foreground/10 bg-background/60">
                  <div className="flex flex-col">
                      <span className="text-xs font-bold uppercase tracking-wide text-foreground">Priority Mobilisation</span>
                      <span className="micro-detail text-foreground/55 mt-1">Fast-tracked survey scheduling</span>
                  </div>
                  <button 
                      onClick={() => setIsUrgent(!isUrgent)}
                      className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${isUrgent ? 'bg-primary' : 'bg-foreground/10'}`}
                      data-testid="button-toggle-priority-mobilisation"
                  >
                      <div className={`absolute top-1 w-4 h-4 rounded-full bg-card transition-all duration-300 ${isUrgent ? 'left-7' : 'left-1'}`}></div>
                  </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  placeholder="Project name"
                  className="h-12 rounded-xl border border-foreground/12 bg-background/60 px-4 text-sm text-foreground placeholder:text-foreground/45 focus:outline-none focus:ring-2 focus:ring-primary/35"
                  data-testid="input-project-name"
                />
                <input
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder="Contact email"
                  className="h-12 rounded-xl border border-foreground/12 bg-background/60 px-4 text-sm text-foreground placeholder:text-foreground/45 focus:outline-none focus:ring-2 focus:ring-primary/35"
                  data-testid="input-contact-email"
                />
            </div>

            <div className="space-y-3">
              <label className="kicker text-foreground/55 block">Required By</label>
              <input
                type="date"
                value={requiredBy}
                onChange={(e) => setRequiredBy(e.target.value)}
                className="h-12 rounded-xl border border-foreground/12 bg-background/60 px-4 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/35"
                data-testid="input-required-by"
              />
              <p className="micro-detail text-foreground/58" data-testid="text-deadline-feasibility">{deadlineMessage}</p>
            </div>

            {/* Scope Output & CTA */}
            <div className="pt-6 border-t border-foreground/10 space-y-6">
                <div className="flex justify-between items-end">
                    <span className="kicker text-foreground/55 mb-1">Indicative Commissioning View</span>
                    <motion.span
                        key={routeModel}
                        initial={{ filter: "blur(3px)", opacity: 0 }}
                        animate={{ filter: "blur(0px)", opacity: 1 }}
                        className="text-3xl md:text-4xl font-black text-foreground tracking-tight text-right"
                    >
                        {routeModel}
                    </motion.span>
                </div>

                <div className="space-y-3 border border-foreground/10 p-5 bg-background/50" data-testid="card-quote-output-summary">
                    <p className="micro-detail text-foreground/75 flex items-start gap-3">
                      <span className="mt-[0.45em] h-1.5 w-1.5 rounded-full bg-primary/75 shrink-0" />
                      <span>Indicative turnaround: {leadMin} to {leadMax} working days</span>
                    </p>
                    <p className="micro-detail text-foreground/75 flex items-start gap-3">
                      <span className="mt-[0.45em] h-1.5 w-1.5 rounded-full bg-primary/75 shrink-0" />
                      <span>Delivery team: {teamModel}</span>
                    </p>
                    <p className="micro-detail text-foreground/75 flex items-start gap-3">
                      <span className="mt-[0.45em] h-1.5 w-1.5 rounded-full bg-primary/75 shrink-0" />
                      <span>{mobilisation}</span>
                    </p>
                </div>

                <div className="space-y-2 border border-foreground/10 p-5 bg-card/55" data-testid="list-quote-recommended-outputs">
                  <div className="kicker text-foreground/60">Recommended outputs</div>
                  {recommendedOutputs.map((output, index) => (
                    <p key={output} className="micro-detail text-foreground/72 flex items-start gap-3" data-testid={`text-quote-output-${index}`}>
                      <span className="mt-[0.45em] h-1.5 w-1.5 rounded-full bg-accent/80 shrink-0" />
                      <span>{output}</span>
                    </p>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" data-testid="row-quote-actions">
                  <Button
                    type="button"
                    onClick={requestFormalProposal}
                    disabled={submitState === "submitting"}
                    data-testid="button-proceed-quote"
                    className="h-14 bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground font-bold uppercase tracking-[0.14em] text-xs transition-all duration-300 rounded-xl group lift-hover disabled:opacity-65 disabled:cursor-not-allowed"
                  >
                      {submitState === "submitting" ? "Submitting..." : "Request Formal Proposal"}
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={copyBrief}
                    className="h-14 rounded-xl border-foreground/15 bg-transparent text-foreground hover:bg-secondary hover:text-secondary-foreground font-bold uppercase tracking-[0.14em] text-xs transition-all duration-300"
                    data-testid="button-copy-brief"
                  >
                    {briefCopied ? "Brief Copied" : "Copy Brief"}
                  </Button>
                </div>
                {submitState !== "idle" && (
                  <p
                    className={`micro-detail text-center ${
                      submitState === "success" ? "text-primary" : submitState === "error" ? "text-destructive" : "text-foreground/55"
                    }`}
                    data-testid="text-quote-submit-status"
                  >
                    {submitMessage}
                  </p>
                )}
                <Button
                  type="button"
                  variant="ghost"
                  onClick={downloadBrief}
                  className="w-full h-11 text-[11px] uppercase tracking-[0.14em] font-bold text-foreground/70 hover:text-secondary-foreground hover:bg-secondary/80"
                  data-testid="button-download-brief"
                >
                  Download Brief Summary
                </Button>
                <p className="micro-detail text-center text-foreground/45">
                  Final scope confirmed after site review, constraints check, and seasonal survey requirements. Pricing is assessed internally and is not shown here.
                </p>
            </div>
        </div>
    </motion.div>
  )
}

export default function Contact() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground">
      <Navbar />
      
      <main className="hero-shell min-h-screen pt-28 pb-24 px-6 md:px-12 flex flex-col justify-end relative overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
             <img src={contactHero} alt="Office" className="w-full h-full object-cover opacity-[0.78] hero-video-grade" />
             <div className="absolute inset-0 hero-overlay-structured opacity-[0.95]"></div>
             <div className="absolute inset-0 pointer-events-none hero-brand-wash opacity-[0.42]" />
             <div className="absolute inset-y-0 left-0 w-[74%] hero-side-fade" />
             <div className="absolute left-0 right-0 bottom-0 h-[62%] hero-bottom-fade" />
             <div className="absolute inset-0 opacity-[0.08] pointer-events-none hero-noise-soft" />
        </div>

        <div className="hero-content-shell grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-20 items-end">
            
            {/* Left Column: Context & Info */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full">
                <div>
                    <div className="flex items-center gap-4 mb-8">
                       <span className="h-[1px] w-12 bg-primary" />
                       <span className="kicker text-primary">Start Project</span>
                    </div>
                    <h1 className="text-6xl md:text-8xl leading-[0.95] mb-12 hero-title-light">
                        <span className="editorial-title">Start with</span> <br/>
                        <span className="text-transparent stroke-text-white editorial-title">clear ecological</span> <br/>
                        <span className="text-primary editorial-title">direction.</span>
                    </h1>
                    <p className="text-xl hero-copy-light font-light leading-relaxed max-w-md">
                        Share your site details and delivery goals. We will return a practical commissioning route, programme assumptions, and the right survey sequence.
                    </p>
                </div>
            </div>

            {/* Right Column: Conversational Form */}
            <div className="lg:col-span-7 flex items-end">
                <FastTrackModule />
            </div>

         </div>
      </main>
      <Footer />
    </div>
  )
}
