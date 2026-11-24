// Server-only helpers for the lead form: email delivery, abuse controls, origin check.
// Secrets come from environment variables ONLY (see .env.example). Nothing here is sent to the browser.
import type { NextRequest } from "next/server";
import { SITE } from "@/content/site-config";
import { ContactInput, isValidEmail, singleLine } from "./contact-validation";

/* ---------- abuse controls (in-memory: per serverless instance; see README for the Upstash upgrade path) ---------- */
const hits = new Map<string, number[]>();
const RATE_WINDOW_MS = 10 * 60_000;
const RATE_MAX = 5;
export function rateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > RATE_MAX;
}

const recentLeads = new Map<string, number>();
const DUPLICATE_WINDOW_MS = 10 * 60_000;
/** True if an identical request was already accepted recently (double-click / retry protection). */
export function isDuplicate(lead: ContactInput): boolean {
  const key = [lead.phone, lead.city, lead.type, lead.urgency, lead.message].join("|").toLowerCase();
  const now = Date.now();
  for (const [k, t] of recentLeads) if (now - t > DUPLICATE_WINDOW_MS) recentLeads.delete(k);
  if (recentLeads.has(key)) return true;
  recentLeads.set(key, now);
  return false;
}
export function forgetLead(lead: ContactInput) {
  recentLeads.delete([lead.phone, lead.city, lead.type, lead.urgency, lead.message].join("|").toLowerCase());
}

export function clientIp(req: NextRequest): string {
  return (
    req.headers.get("x-real-ip") ||
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown"
  );
}

/** CSRF defence for a JSON POST: the request must come from our own site. */
export function originAllowed(req: NextRequest): boolean {
  const origin = req.headers.get("origin");
  const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host");
  const siteHost = new URL(SITE.url).host;
  if (origin) {
    try {
      const oh = new URL(origin).host;
      return oh === host || oh === siteHost || oh === `www.${siteHost}`;
    } catch {
      return false;
    }
  }
  const sfs = req.headers.get("sec-fetch-site");
  if (sfs) return sfs === "same-origin" || sfs === "none";
  return process.env.NODE_ENV !== "production";
}

/* ---------- email ---------- */
export const escapeHtml = (s: string): string =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

export function buildEmail(lead: ContactInput, meta: { source: string; ip: string }) {
  const subject = singleLine(`New ${lead.urgency.startsWith("Emergency") ? "EMERGENCY " : ""}${lead.type} lead — ${lead.city}`).slice(0, 150);
  const rows: [string, string][] = [
    ["Name", lead.name],
    ["Phone", lead.phone],
    ["Email", lead.email || "(not provided)"],
    ["City / ZIP", lead.city],
    ["Type of damage", lead.type],
    ["Urgency", lead.urgency],
    ["Message", lead.message || "(none)"],
    ["Submitted from", meta.source || "(unknown)"],
  ];
  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n") + `\n\nIP: ${meta.ip}\n`;
  const digits = lead.phone.replace(/\D/g, "");
  const html =
    `<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#111">` +
    `<h2 style="margin:0 0 12px">${escapeHtml(subject)}</h2>` +
    `<table cellpadding="8" cellspacing="0" style="border-collapse:collapse;border:1px solid #ddd">` +
    rows
      .map(([k, v]) => {
        const cell = k === "Phone" ? `<a href="tel:+1${digits}">${escapeHtml(v)}</a>` : escapeHtml(v).replace(/\n/g, "<br>");
        return `<tr><td style="border:1px solid #ddd;background:#f6f6f6;font-weight:bold;vertical-align:top">${escapeHtml(k)}</td><td style="border:1px solid #ddd">${cell}</td></tr>`;
      })
      .join("") +
    `</table><p style="color:#666;font-size:12px;margin-top:14px">Sent from the ${escapeHtml(SITE.name)} website contact form. IP: ${escapeHtml(meta.ip)}</p></div>`;
  return { subject, text, html };
}

export type SendResult = { ok: true } | { ok: false; reason: "NOT_CONFIGURED" | "PROVIDER_ERROR" | "TIMEOUT" };

export async function sendLeadEmail(lead: ContactInput, meta: { source: string; ip: string }): Promise<SendResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = (process.env.CONTACT_TO_EMAIL ?? "").split(",").map((s) => s.trim()).filter(isValidEmail);
  if (!apiKey || !from || to.length === 0) return { ok: false, reason: "NOT_CONFIGURED" };

  const { subject, text, html } = buildEmail(lead, meta);
  const body: Record<string, unknown> = { from, to, subject, text, html };
  if (lead.email) body.reply_to = lead.email; // already validated: single address, no CR/LF/commas

  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 8000);
  try {
    const res = await fetch(process.env.RESEND_API_URL || "https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: ctrl.signal,
    });
    if (!res.ok) {
      console.error(`[contact] email provider rejected the request (HTTP ${res.status})`); // never log the key or lead data
      return { ok: false, reason: "PROVIDER_ERROR" };
    }
    return { ok: true };
  } catch (e) {
    const aborted = e instanceof Error && e.name === "AbortError";
    console.error(`[contact] email delivery ${aborted ? "timed out" : "failed"}`);
    return { ok: false, reason: aborted ? "TIMEOUT" : "PROVIDER_ERROR" };
  } finally {
    clearTimeout(timer);
  }
}
