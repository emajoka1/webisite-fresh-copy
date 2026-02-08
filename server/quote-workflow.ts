import { z } from "zod";

export const quoteRequestSchema = z.object({
  service: z.enum(["pea", "pra", "bng", "species"]),
  stage: z.enum(["appraisal", "prePlanning", "validation", "postConsent"]),
  siteContext: z.enum(["urban", "edge", "strategic"]),
  hectares: z.number().min(0.1).max(500),
  isUrgent: z.boolean().default(false),
  requiredBy: z.string().optional().nullable(),
  projectName: z.string().trim().min(2).max(120),
  contactEmail: z.string().trim().email().max(160),
});

export type QuoteRequestInput = z.infer<typeof quoteRequestSchema>;

type ServiceKey = QuoteRequestInput["service"];
type StageKey = QuoteRequestInput["stage"];
type ContextKey = QuoteRequestInput["siteContext"];

type ServiceConfig = {
  label: string;
  baseFee: number;
  baseDays: number;
  weight: number;
  defaultOutputs: string[];
};

type StageConfig = {
  label: string;
  weight: number;
  multiplier: number;
};

type ContextConfig = {
  label: string;
  weight: number;
  multiplier: number;
};

const SERVICE_CONFIG: Record<ServiceKey, ServiceConfig> = {
  pea: {
    label: "PEA Survey",
    baseFee: 950,
    baseDays: 5,
    weight: 0,
    defaultOutputs: [
      "Planning-ready baseline and constraints note",
      "Survey route for follow-on requirements",
    ],
  },
  pra: {
    label: "PRA (Bats)",
    baseFee: 1350,
    baseDays: 7,
    weight: 1,
    defaultOutputs: [
      "Roost risk classification",
      "Targeted survey mobilisation plan",
    ],
  },
  bng: {
    label: "BNG Assessment",
    baseFee: 2200,
    baseDays: 8,
    weight: 2,
    defaultOutputs: [
      "Defra metric workbook",
      "Mitigation and delivery strategy summary",
    ],
  },
  species: {
    label: "Protected Species",
    baseFee: 1850,
    baseDays: 8,
    weight: 1,
    defaultOutputs: [
      "Species survey findings",
      "Licensing and mitigation route note",
    ],
  },
};

const STAGE_CONFIG: Record<StageKey, StageConfig> = {
  appraisal: { label: "Site appraisal", weight: 0, multiplier: 0.94 },
  prePlanning: { label: "Pre-planning", weight: 1, multiplier: 1.0 },
  validation: { label: "Validation stage", weight: 2, multiplier: 1.15 },
  postConsent: { label: "Post-consent", weight: 1, multiplier: 1.08 },
};

const CONTEXT_CONFIG: Record<ContextKey, ContextConfig> = {
  urban: { label: "Urban infill", weight: 0, multiplier: 0.96 },
  edge: { label: "Settlement edge", weight: 1, multiplier: 1.04 },
  strategic: { label: "Strategic land", weight: 2, multiplier: 1.18 },
};

export type QuotePricing = {
  currency: "GBP";
  complexityScore: number;
  baseFee: number;
  calculatedFee: number;
  contingency: number;
  recommendedFee: number;
  feeRangeLow: number;
  feeRangeHigh: number;
  leadDaysMin: number;
  leadDaysMax: number;
  notes: string[];
};

export type QuoteDraftStatus =
  | "pending_review"
  | "review_email_sent"
  | "review_email_failed";

export type QuoteDraft = {
  id: string;
  submittedAtIso: string;
  request: QuoteRequestInput;
  quoteLetter: string;
  pricing: QuotePricing;
  outputs: string[];
  status: QuoteDraftStatus;
  reviewRecipients: string[];
  reviewProviderId?: string;
  reviewError?: string;
};

export type QuoteReviewEmailResult = {
  delivered: boolean;
  providerId?: string;
  error?: string;
};

const roundToNearest = (value: number, nearest: number) =>
  Math.round(value / nearest) * nearest;

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  }).format(value);

const getDaysUntilDeadline = (requiredBy?: string | null) => {
  if (!requiredBy) return null;
  const date = new Date(requiredBy);
  if (Number.isNaN(date.getTime())) return null;
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return Math.ceil((date.getTime() - now.getTime()) / 86_400_000);
};

export const computeQuotePricing = (input: QuoteRequestInput): QuotePricing => {
  const service = SERVICE_CONFIG[input.service];
  const stage = STAGE_CONFIG[input.stage];
  const context = CONTEXT_CONFIG[input.siteContext];

  const hectareWeight = input.hectares >= 5 ? 2 : input.hectares >= 2 ? 1 : 0;
  const urgencyWeight = input.isUrgent ? 2 : 0;
  const complexityScore =
    service.weight + stage.weight + context.weight + hectareWeight + urgencyWeight;

  const deadlineDays = getDaysUntilDeadline(input.requiredBy);
  const deadlineMultiplier =
    deadlineDays === null
      ? 1
      : deadlineDays < 7
        ? 1.32
        : deadlineDays < 14
          ? 1.18
          : deadlineDays < 21
            ? 1.08
            : 1;

  const urgencyMultiplier = input.isUrgent ? 1.22 : 1;
  const sizeMultiplier = 1 + Math.min(input.hectares, 50) * 0.015;
  const complexityMultiplier = 1 + complexityScore * 0.04;

  const rawCalculatedFee =
    service.baseFee *
    stage.multiplier *
    context.multiplier *
    sizeMultiplier *
    complexityMultiplier *
    urgencyMultiplier *
    deadlineMultiplier;

  const calculatedFee = roundToNearest(rawCalculatedFee, 50);
  const contingency = roundToNearest(calculatedFee * (0.08 + complexityScore * 0.008), 50);
  const recommendedFee = calculatedFee + contingency;
  const feeRangeLow = roundToNearest(recommendedFee * 0.92, 50);
  const feeRangeHigh = roundToNearest(recommendedFee * 1.08, 50);

  const leadDaysMin = Math.max(
    3,
    service.baseDays + Math.round(complexityScore * 0.7) - (input.isUrgent ? 2 : 0),
  );
  const leadDaysMax = leadDaysMin + 3;

  const notes: string[] = [];
  if (input.isUrgent) notes.push("Urgency uplift applied for priority mobilisation.");
  if (deadlineDays !== null && deadlineDays < leadDaysMin) {
    notes.push("Deadline is tighter than modelled lead time; sequencing risk is elevated.");
  }
  if (input.hectares >= 5) notes.push("Large-site complexity factor applied.");
  if (input.stage === "validation") notes.push("Validation-stage response premium applied.");

  return {
    currency: "GBP",
    complexityScore,
    baseFee: service.baseFee,
    calculatedFee,
    contingency,
    recommendedFee,
    feeRangeLow,
    feeRangeHigh,
    leadDaysMin,
    leadDaysMax,
    notes,
  };
};

export const buildRecommendedOutputs = (input: QuoteRequestInput) => {
  const service = SERVICE_CONFIG[input.service];
  const context = CONTEXT_CONFIG[input.siteContext];
  const stage = STAGE_CONFIG[input.stage];

  return [
    ...service.defaultOutputs,
    `${stage.label} delivery sequencing note`,
    `${context.label} constraints integration summary`,
  ];
};

export const buildQuoteLetter = (
  id: string,
  input: QuoteRequestInput,
  pricing: QuotePricing,
  outputs: string[],
) => {
  const service = SERVICE_CONFIG[input.service];
  const stage = STAGE_CONFIG[input.stage];
  const context = CONTEXT_CONFIG[input.siteContext];

  const lines = [
    `Quote Draft Reference: Q-${id.slice(0, 8).toUpperCase()}`,
    `Prepared: ${new Date().toISOString()}`,
    "",
    "Client Request",
    `Project: ${input.projectName}`,
    `Contact: ${input.contactEmail}`,
    `Service: ${service.label}`,
    `Stage: ${stage.label}`,
    `Site context: ${context.label}`,
    `Site size: ${input.hectares.toFixed(1)} ha`,
    `Urgency: ${input.isUrgent ? "Priority mobilisation requested" : "Standard mobilisation"}`,
    `Required by: ${input.requiredBy || "Not provided"}`,
    "",
    "Proposed Scope Outputs",
    ...outputs.map((output) => `- ${output}`),
    "",
    "Internal Pricing Model (Not client-facing)",
    `Base fee: ${formatCurrency(pricing.baseFee)}`,
    `Calculated fee: ${formatCurrency(pricing.calculatedFee)}`,
    `Contingency: ${formatCurrency(pricing.contingency)}`,
    `Recommended fee: ${formatCurrency(pricing.recommendedFee)}`,
    `Commercial range: ${formatCurrency(pricing.feeRangeLow)} - ${formatCurrency(pricing.feeRangeHigh)}`,
    `Lead time: ${pricing.leadDaysMin}-${pricing.leadDaysMax} working days`,
    `Complexity score: ${pricing.complexityScore}`,
    ...pricing.notes.map((note) => `- ${note}`),
    "",
    "Review Action",
    "1. Validate assumptions and scope.",
    "2. Confirm final fee position and margin.",
    "3. Approve release of client-facing quote letter.",
  ];

  return lines.join("\n");
};

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

export async function sendQuoteForInternalReview(
  draft: QuoteDraft,
): Promise<QuoteReviewEmailResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.QUOTE_FROM_EMAIL || "quotes@coyne.co.uk";
  const toRaw = process.env.QUOTE_REVIEW_EMAILS || "";
  const recipients = toRaw
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);

  if (!apiKey) {
    return {
      delivered: false,
      error: "RESEND_API_KEY is not configured.",
    };
  }

  if (recipients.length === 0) {
    return {
      delivered: false,
      error: "QUOTE_REVIEW_EMAILS is not configured.",
    };
  }

  const subject = `Quote Review Required: ${draft.request.projectName} (Q-${draft.id
    .slice(0, 8)
    .toUpperCase()})`;

  const html = `
    <div style="font-family:Arial,sans-serif;line-height:1.5;color:#121826">
      <h2 style="margin:0 0 8px">Quote Review Required</h2>
      <p style="margin:0 0 16px">A new quote request has been drafted and is awaiting internal review.</p>
      <p style="margin:0 0 4px"><strong>Project:</strong> ${escapeHtml(
        draft.request.projectName,
      )}</p>
      <p style="margin:0 0 4px"><strong>Contact:</strong> ${escapeHtml(
        draft.request.contactEmail,
      )}</p>
      <p style="margin:0 0 16px"><strong>Reference:</strong> Q-${draft.id
        .slice(0, 8)
        .toUpperCase()}</p>
      <pre style="white-space:pre-wrap;background:#f6f8ff;padding:16px;border-radius:8px;border:1px solid #d8e0f7">${escapeHtml(
        draft.quoteLetter,
      )}</pre>
    </div>
  `;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: recipients,
      subject,
      html,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    return {
      delivered: false,
      error: `Email provider error (${response.status}): ${body}`,
    };
  }

  const payload = (await response.json()) as { id?: string };
  return {
    delivered: true,
    providerId: payload.id,
  };
}
