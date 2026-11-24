import { NextRequest, NextResponse } from "next/server";
import { SITE } from "@/content/site-config";
import { validateContact } from "@/lib/contact-validation";
import { clientIp, forgetLead, isDuplicate, originAllowed, rateLimited, sendLeadEmail } from "@/lib/contact-server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const CALL = `call us at ${SITE.phone}`;
const MIN_FILL_MS = 1500; // a human cannot read and complete this form faster than this

function fail(status: number, code: string, message: string, extra: Record<string, unknown> = {}) {
  return NextResponse.json({ ok: false, code, message, ...extra }, { status, headers: { "Cache-Control": "no-store" } });
}

export async function POST(req: NextRequest) {
  try {
    if (!originAllowed(req)) return fail(403, "FORBIDDEN", `We couldn't verify this request. Please reload the page and try again, or ${CALL}.`);
    if (!(req.headers.get("content-type") ?? "").toLowerCase().startsWith("application/json")) {
      return fail(415, "BAD_REQUEST", `We couldn't read that request. Please try again or ${CALL}.`);
    }
    const text = await req.text();
    if (text.length > 20_000) return fail(413, "TOO_LARGE", `That request was too large. Please shorten your message or ${CALL}.`);

    let raw: unknown;
    try { raw = JSON.parse(text); } catch { return fail(400, "BAD_REQUEST", `We couldn't read that request. Please try again or ${CALL}.`); }
    if (!raw || typeof raw !== "object" || Array.isArray(raw)) return fail(400, "BAD_REQUEST", `We couldn't read that request. Please try again or ${CALL}.`);
    const body = raw as Record<string, unknown>;

    const ip = clientIp(req);
    if (rateLimited(ip)) return fail(429, "RATE_LIMITED", `Too many requests. Please wait a few minutes, or ${CALL} for immediate help.`);

    // Honeypot: real visitors never see this field. Pretend success so bots learn nothing; send nothing.
    if (typeof body.company === "string" && body.company.trim() !== "") return NextResponse.json({ ok: true });

    // Time trap: submissions faster than a human could fill the form.
    const startedAt = typeof body.startedAt === "number" ? body.startedAt : NaN;
    if (!Number.isFinite(startedAt)) return fail(400, "BAD_REQUEST", `We couldn't read that request. Please try again or ${CALL}.`);
    if (Date.now() - startedAt < MIN_FILL_MS) return fail(429, "TOO_FAST", `Please review your details and press the button again, or ${CALL}.`);

    const result = validateContact(body);
    if (!result.ok) return fail(400, "VALIDATION", "Please correct the highlighted fields.", { fieldErrors: result.errors });
    const lead = result.value;

    // Same request twice in a row (double click / retry): acknowledge, but only email once.
    if (isDuplicate(lead)) return NextResponse.json({ ok: true });

    const referer = req.headers.get("referer") ?? "";
    let source = "";
    try { source = referer ? new URL(referer).pathname.slice(0, 200) : ""; } catch { source = ""; }

    const sent = await sendLeadEmail(lead, { source, ip });
    if (!sent.ok) {
      forgetLead(lead); // let the visitor retry
      if (sent.reason === "NOT_CONFIGURED") {
        console.error("[contact] Email is not configured. Set RESEND_API_KEY, CONTACT_FROM_EMAIL and CONTACT_TO_EMAIL.");
      }
      return fail(503, "DELIVERY_FAILED", `We couldn't submit your request. Please try again or ${CALL}.`);
    }
    return NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return fail(500, "SERVER_ERROR", `We couldn't submit your request. Please try again or ${CALL}.`);
  }
}
