import { randomUUID } from "crypto";
import {
  buildQuoteLetter,
  buildRecommendedOutputs,
  computeQuotePricing,
  quoteRequestSchema,
  resolveQuoteReviewRecipients,
  sendQuoteForInternalReview,
  type QuoteDraft,
} from "../../server/quote-workflow";

type RequestLike = {
  method?: string;
  body?: unknown;
};

type ResponseLike = {
  setHeader: (name: string, value: string) => void;
  status: (code: number) => ResponseLike;
  json: (body: unknown) => void;
  end: (body?: string) => void;
};

const parseBody = (body: unknown) => {
  if (typeof body === "string") {
    try {
      return JSON.parse(body) as Record<string, unknown>;
    } catch {
      return {};
    }
  }

  if (body && typeof body === "object") {
    return body as Record<string, unknown>;
  }

  return {};
};

export default async function handler(req: RequestLike, res: ResponseLike) {
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).json({ message: "Method not allowed." });
    return;
  }

  const body = parseBody(req.body);
  const parsed = quoteRequestSchema.safeParse({
    ...body,
    hectares:
      typeof body.hectares === "string"
        ? Number.parseFloat(body.hectares)
        : body.hectares,
  });

  if (!parsed.success) {
    res.status(400).json({
      message: "Invalid quote request payload.",
      issues: parsed.error.issues.map((issue) => ({
        path: issue.path.join("."),
        message: issue.message,
      })),
    });
    return;
  }

  const input = parsed.data;
  const pricing = computeQuotePricing(input);
  const outputs = buildRecommendedOutputs(input);
  const id = randomUUID();
  const submittedAtIso = new Date().toISOString();
  const quoteLetter = buildQuoteLetter(id, input, pricing, outputs);
  const reviewRecipients = resolveQuoteReviewRecipients(
    process.env.QUOTE_REVIEW_EMAILS,
  );

  const draft: QuoteDraft = {
    id,
    submittedAtIso,
    request: input,
    pricing,
    outputs,
    quoteLetter,
    status: "pending_review",
    reviewRecipients,
  };

  const emailResult = await sendQuoteForInternalReview(draft);
  const reviewDispatch = emailResult.delivered ? "email_sent" : "email_failed";

  res.status(202).json({
    requestId: id,
    reference: `Q-${id.slice(0, 8).toUpperCase()}`,
    status: "pending_internal_review",
    reviewDispatch,
    message: emailResult.delivered
      ? "Request received. An internal quote draft has been generated and sent for team review."
      : "Request received. An internal quote draft has been generated and queued for manual review.",
    ...(emailResult.delivered ? {} : { error: emailResult.error }),
  });
}
