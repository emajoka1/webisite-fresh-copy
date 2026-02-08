import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import {
  buildQuoteLetter,
  buildRecommendedOutputs,
  computeQuotePricing,
  quoteRequestSchema,
  resolveQuoteReviewRecipients,
  sendQuoteForInternalReview,
} from "./quote-workflow";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.post("/api/quotes/request", async (req, res) => {
    const parsed = quoteRequestSchema.safeParse({
      ...req.body,
      hectares:
        typeof req.body?.hectares === "string"
          ? Number.parseFloat(req.body.hectares)
          : req.body?.hectares,
    });

    if (!parsed.success) {
      return res.status(400).json({
        message: "Invalid quote request payload.",
        issues: parsed.error.issues.map((issue) => ({
          path: issue.path.join("."),
          message: issue.message,
        })),
      });
    }

    const input = parsed.data;
    const pricing = computeQuotePricing(input);
    const outputs = buildRecommendedOutputs(input);

    const draft = await storage.createQuoteDraft({
      submittedAtIso: new Date().toISOString(),
      request: input,
      pricing,
      outputs,
      quoteLetter: "",
      status: "pending_review",
      reviewRecipients: resolveQuoteReviewRecipients(
        process.env.QUOTE_REVIEW_EMAILS,
      ),
    });

    const quoteLetter = buildQuoteLetter(draft.id, input, pricing, outputs);
    const hydratedDraft = await storage.updateQuoteDraftStatus(draft.id, "pending_review", {
      quoteLetter,
      reviewError: undefined,
      reviewProviderId: undefined,
    });

    const emailResult = await sendQuoteForInternalReview({
      ...(hydratedDraft || draft),
      quoteLetter,
    });

    if (emailResult.delivered) {
      await storage.updateQuoteDraftStatus(draft.id, "review_email_sent", {
        reviewProviderId: emailResult.providerId,
        reviewError: undefined,
      });
    } else {
      await storage.updateQuoteDraftStatus(draft.id, "review_email_failed", {
        reviewError: emailResult.error || "Unknown email dispatch error.",
      });
    }

    const reviewDispatch =
      emailResult.delivered ? "email_sent" : "email_failed";

    return res.status(202).json({
      requestId: draft.id,
      reference: `Q-${draft.id.slice(0, 8).toUpperCase()}`,
      status: "pending_internal_review",
      reviewDispatch,
      message: emailResult.delivered
        ? "Request received. An internal quote draft has been generated and sent for team review."
        : "Request received. An internal quote draft has been generated and queued for manual review.",
    });
  });

  return httpServer;
}
