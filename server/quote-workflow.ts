import { z } from "zod";
import PDFDocument from "pdfkit";

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

const COYNE_COMPANY_NAME = "Coyne Environmental";
const COYNE_COMPANY_ADDRESS = "5 Philosophers Gate, Ashwell, SG7 5DL";
const DEFAULT_REVIEW_EMAIL = "emajoka@coyneenvironmental.co.uk";

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

export const resolveQuoteReviewRecipients = (rawRecipients?: string) => {
  const configuredRecipients = (rawRecipients || "")
    .split(",")
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);

  return Array.from(
    new Set([DEFAULT_REVIEW_EMAIL, ...configuredRecipients]),
  );
};

const roundToNearest = (value: number, nearest: number) =>
  Math.round(value / nearest) * nearest;

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  }).format(value);

const formatDate = (value: string | Date) =>
  new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(typeof value === "string" ? new Date(value) : value);

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
    `Prepared: ${formatDate(new Date())}`,
    "",
    "Client Request",
    `Project: ${input.projectName}`,
    `Contact: ${input.contactEmail}`,
    `Service: ${service.label}`,
    `Stage: ${stage.label}`,
    `Site context: ${context.label}`,
    `Site size: ${input.hectares.toFixed(1)} ha`,
    `Urgency: ${input.isUrgent ? "Priority mobilisation requested" : "Standard mobilisation"}`,
    `Required by: ${input.requiredBy ? formatDate(input.requiredBy) : "Not provided"}`,
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

const buildQuoteReference = (id: string) => `Q-${id.slice(0, 8).toUpperCase()}`;

const buildQuoteReviewPdf = async (draft: QuoteDraft): Promise<Buffer> => {
  const reference = buildQuoteReference(draft.id);
  const service = SERVICE_CONFIG[draft.request.service];
  const stage = STAGE_CONFIG[draft.request.stage];
  const context = CONTEXT_CONFIG[draft.request.siteContext];

  const theme = {
    brand: "#13231B",
    signal: "#B7DF63",
    ink: "#162219",
    muted: "#55695C",
    panel: "#EEF3ED",
    stroke: "#D8E0D8",
    white: "#FFFFFF",
  } as const;

  const doc = new PDFDocument({
    size: "A4",
    margins: { top: 56, right: 56, bottom: 56, left: 56 },
    info: {
      Title: `${COYNE_COMPANY_NAME} Internal Quote Review ${reference}`,
      Author: COYNE_COMPANY_NAME,
      Subject: "Internal quote review letter",
    },
  });

  const chunks: Buffer[] = [];
  doc.on("data", (chunk: Buffer | Uint8Array) => {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  });

  const pdfComplete = new Promise<Buffer>((resolve, reject) => {
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);
  });

  const left = doc.page.margins.left;
  const contentWidth = doc.page.width - doc.page.margins.left - doc.page.margins.right;
  const pageBottom = () => doc.page.height - doc.page.margins.bottom;
  let y = doc.page.margins.top;

  const drawHeader = (continuation = false) => {
    doc.rect(0, 0, doc.page.width, 108).fill(theme.brand);

    doc
      .fillColor(theme.signal)
      .font("Helvetica-Bold")
      .fontSize(12)
      .text(COYNE_COMPANY_NAME.toUpperCase(), left, 28, { characterSpacing: 1.8 });

    doc
      .fillColor(theme.white)
      .font("Helvetica")
      .fontSize(9)
      .text("Internal Quote Review Letter", left, 47);

    doc
      .fillColor("#D7E2DC")
      .font("Helvetica")
      .fontSize(9)
      .text(COYNE_COMPANY_ADDRESS, left, 61);

    doc
      .fillColor(theme.white)
      .font("Helvetica-Bold")
      .fontSize(9)
      .text(reference, left + contentWidth - 170, 28, { width: 170, align: "right" });

    doc
      .fillColor("#D7E2DC")
      .font("Helvetica")
      .fontSize(9)
      .text(formatDate(draft.submittedAtIso), left + contentWidth - 170, 44, {
        width: 170,
        align: "right",
      });

    if (continuation) {
      doc
        .fillColor("#D7E2DC")
        .font("Helvetica")
        .fontSize(8)
        .text("Continuation", left + contentWidth - 170, 60, {
          width: 170,
          align: "right",
        });
    }

    doc
      .strokeColor("#335141")
      .lineWidth(1)
      .moveTo(left, 94)
      .lineTo(left + contentWidth, 94)
      .stroke();

    y = 114;
  };

  const ensureSpace = (height: number) => {
    if (y + height <= pageBottom()) return;
    doc.addPage();
    drawHeader(true);
  };

  const drawSectionHeading = (title: string, subtitle?: string) => {
    ensureSpace(subtitle ? 48 : 34);

    doc.fillColor(theme.brand).font("Helvetica-Bold").fontSize(12).text(title, left, y);
    y += 16;

    if (subtitle) {
      doc
        .fillColor(theme.muted)
        .font("Helvetica")
        .fontSize(9)
        .text(subtitle, left, y, { width: contentWidth });
      y += 15;
    }

    doc
      .strokeColor(theme.stroke)
      .lineWidth(0.8)
      .moveTo(left, y)
      .lineTo(left + contentWidth, y)
      .stroke();
    y += 8;
  };

  const drawDetailRow = (label: string, value: string) => {
    const labelWidth = 170;
    const columnGap = 14;
    const valueWidth = contentWidth - labelWidth - columnGap;

    doc.font("Helvetica-Bold").fontSize(9);
    const labelHeight = doc.heightOfString(label, { width: labelWidth });
    doc.font("Helvetica").fontSize(10);
    const valueHeight = doc.heightOfString(value, { width: valueWidth });

    const rowHeight = Math.max(labelHeight, valueHeight);
    ensureSpace(rowHeight + 12);

    doc
      .fillColor(theme.muted)
      .font("Helvetica-Bold")
      .fontSize(9)
      .text(label, left, y, { width: labelWidth });

    doc
      .fillColor(theme.ink)
      .font("Helvetica")
      .fontSize(10)
      .text(value, left + labelWidth + columnGap, y, { width: valueWidth });

    y += rowHeight + 4;
    doc
      .strokeColor(theme.stroke)
      .lineWidth(0.8)
      .moveTo(left, y)
      .lineTo(left + contentWidth, y)
      .stroke();
    y += 6;
  };

  const drawBulletList = (items: string[]) => {
    for (const item of items) {
      const line = `- ${item}`;
      doc.font("Helvetica").fontSize(10);
      const lineHeight = doc.heightOfString(line, { width: contentWidth });
      ensureSpace(lineHeight + 4);
      doc.fillColor(theme.ink).text(line, left, y, { width: contentWidth });
      y += lineHeight + 4;
    }
    y += 4;
  };

  drawHeader(false);

  ensureSpace(92);
  doc.roundedRect(left, y, contentWidth, 84, 8).fillAndStroke(theme.panel, theme.stroke);
  doc
    .fillColor(theme.brand)
    .font("Helvetica-Bold")
    .fontSize(11)
    .text("Internal review draft", left + 14, y + 12);
  doc
    .fillColor(theme.muted)
    .font("Helvetica")
    .fontSize(9)
    .text(
      "Prepared for Coyne internal review before any client-facing quotation is released.",
      left + 14,
      y + 31,
      { width: contentWidth - 28 },
    );
  doc
    .fillColor(theme.ink)
    .font("Helvetica-Bold")
    .fontSize(10)
    .text(
      draft.request.isUrgent
        ? "Priority mobilisation requested"
        : "Standard mobilisation route",
      left + 14,
      y + 58,
    );
  y += 100;

  drawSectionHeading("Project brief");
  drawDetailRow("Project", draft.request.projectName);
  drawDetailRow("Contact email", draft.request.contactEmail);
  drawDetailRow("Service", service.label);
  drawDetailRow("Planning stage", stage.label);
  drawDetailRow("Site context", context.label);
  drawDetailRow("Site area", `${draft.request.hectares.toFixed(1)} ha`);
  drawDetailRow(
    "Required by",
    draft.request.requiredBy ? formatDate(draft.request.requiredBy) : "Not provided",
  );

  drawSectionHeading(
    "Proposed scope outputs",
    "Output set positioned for planning certainty and decision velocity.",
  );
  drawBulletList(draft.outputs);

  drawSectionHeading(
    "Commercial model (internal)",
    "For internal sign-off only. Do not forward externally.",
  );
  drawDetailRow("Base fee", formatCurrency(draft.pricing.baseFee));
  drawDetailRow("Calculated fee", formatCurrency(draft.pricing.calculatedFee));
  drawDetailRow("Contingency", formatCurrency(draft.pricing.contingency));
  drawDetailRow("Recommended fee", formatCurrency(draft.pricing.recommendedFee));
  drawDetailRow(
    "Commercial range",
    `${formatCurrency(draft.pricing.feeRangeLow)} - ${formatCurrency(draft.pricing.feeRangeHigh)}`,
  );
  drawDetailRow(
    "Lead time",
    `${draft.pricing.leadDaysMin}-${draft.pricing.leadDaysMax} working days`,
  );
  drawDetailRow("Complexity score", String(draft.pricing.complexityScore));

  if (draft.pricing.notes.length > 0) {
    drawSectionHeading("Commercial notes");
    drawBulletList(draft.pricing.notes);
  }

  drawSectionHeading("Review actions");
  drawBulletList([
    "Validate assumptions and scope coverage.",
    "Confirm final fee position and margin.",
    "Approve release of client-facing quote letter.",
  ]);

  ensureSpace(34);
  doc
    .strokeColor(theme.stroke)
    .lineWidth(0.8)
    .moveTo(left, y + 6)
    .lineTo(left + contentWidth, y + 6)
    .stroke();
  doc
    .fillColor(theme.muted)
    .font("Helvetica")
    .fontSize(8)
    .text(COYNE_COMPANY_ADDRESS, left, y + 14, { width: contentWidth / 2 });
  doc
    .text(`Reference ${reference} | Prepared ${formatDate(draft.submittedAtIso)}`, left + contentWidth / 2, y + 14, {
      width: contentWidth / 2,
      align: "right",
    });

  doc.end();
  return pdfComplete;
};

export async function sendQuoteForInternalReview(
  draft: QuoteDraft,
): Promise<QuoteReviewEmailResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.QUOTE_FROM_EMAIL || "quotes@coyneenvironmental.co.uk";
  const recipients = resolveQuoteReviewRecipients(process.env.QUOTE_REVIEW_EMAILS);

  if (!apiKey) {
    return {
      delivered: false,
      error: "RESEND_API_KEY is not configured.",
    };
  }

  try {
    const reference = buildQuoteReference(draft.id);
    const service = SERVICE_CONFIG[draft.request.service];
    const stage = STAGE_CONFIG[draft.request.stage];
    const context = CONTEXT_CONFIG[draft.request.siteContext];

    const pdfBuffer = await buildQuoteReviewPdf(draft);
    const subject = `Quote Review Required: ${draft.request.projectName} (${reference})`;

    const html = `
      <div style="font-family:Arial,sans-serif;line-height:1.55;color:#162219;max-width:760px;margin:0 auto;padding:20px;background:#f5f7f2;border:1px solid #dae2d9">
        <div style="background:#13231B;padding:18px 20px 16px;color:#ffffff">
          <div style="font-size:12px;letter-spacing:0.18em;color:#B7DF63;font-weight:700;margin-bottom:8px">${COYNE_COMPANY_NAME.toUpperCase()}</div>
          <div style="font-size:11px;margin-bottom:4px">Internal Quote Review Required</div>
          <div style="font-size:11px;color:#D7E2DC">${escapeHtml(COYNE_COMPANY_ADDRESS)}</div>
        </div>
        <div style="padding:18px 20px;background:#ffffff;border-left:1px solid #dae2d9;border-right:1px solid #dae2d9;border-bottom:1px solid #dae2d9">
          <p style="margin:0 0 14px">A quote request has been drafted and is ready for internal sign-off. The branded PDF review letter is attached.</p>
          <p style="margin:0 0 6px"><strong>Reference:</strong> ${escapeHtml(reference)}</p>
          <p style="margin:0 0 6px"><strong>Project:</strong> ${escapeHtml(draft.request.projectName)}</p>
          <p style="margin:0 0 6px"><strong>Contact:</strong> ${escapeHtml(draft.request.contactEmail)}</p>
          <p style="margin:0 0 6px"><strong>Service:</strong> ${escapeHtml(service.label)}</p>
          <p style="margin:0 0 6px"><strong>Planning stage:</strong> ${escapeHtml(stage.label)}</p>
          <p style="margin:0 0 16px"><strong>Context:</strong> ${escapeHtml(context.label)}</p>
          <p style="margin:0;padding:12px 14px;background:#EEF3ED;border:1px solid #D8E0D8">
            <strong>Review flow:</strong> validate scope, confirm final fee/margin, then approve client-facing release.
          </p>
        </div>
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
        attachments: [
          {
            filename: `Coyne-Quote-Review-${reference}.pdf`,
            content: pdfBuffer.toString("base64"),
          },
        ],
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
  } catch (error) {
    return {
      delivered: false,
      error:
        error instanceof Error
          ? error.message
          : "Unknown error while preparing review email.",
    };
  }
}
