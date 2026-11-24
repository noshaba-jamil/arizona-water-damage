"use client";

import { useEffect, useRef, useState, FormEvent } from "react";
import { DAMAGE_TYPES, URGENCY_LEVELS, FieldErrors, validateContact } from "@/lib/contact-validation";

type Status = "idle" | "submitting" | "success" | "error";

const PHONE = "(928) 267-9292";
const PHONE_HREF = "tel:+19282679292";
const FIELD_ORDER = ["name", "phone", "email", "city", "type", "urgency", "message"] as const;

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [serverMessage, setServerMessage] = useState("");
  const startedAt = useRef<number>(0);
  const submitting = useRef(false); // synchronous lock: stops a rapid double-click before React re-renders
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => { startedAt.current = Date.now(); }, []);
  useEffect(() => { if (status === "success") successRef.current?.focus(); }, [status]);

  function focusFirstInvalid(errs: FieldErrors) {
    const first = FIELD_ORDER.find((f) => errs[f]);
    if (first) document.getElementById(first)?.focus();
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting.current) return;

    const form = e.currentTarget;
    const raw = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    const check = validateContact(raw);
    if (!check.ok) {
      setErrors(check.errors);
      setStatus("idle");
      setServerMessage("");
      focusFirstInvalid(check.errors);
      return;
    }

    submitting.current = true;
    setErrors({});
    setServerMessage("");
    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...raw, startedAt: startedAt.current }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data?.ok === true) {
        setStatus("success");
        form.reset();
        return;
      }
      if (data?.fieldErrors) { setErrors(data.fieldErrors); focusFirstInvalid(data.fieldErrors); }
      setServerMessage(typeof data?.message === "string" ? data.message : "");
      setStatus("error");
    } catch {
      setStatus("error");
    } finally {
      submitting.current = false;
    }
  }

  if (status === "success") {
    return (
      <div className="callout" role="status" aria-live="polite" tabIndex={-1} ref={successRef}>
        <p>
          <strong>Thank you. Your request has been received.</strong> Our team will contact you shortly. If this is an
          active emergency, please call <a href={PHONE_HREF}>{PHONE}</a> directly rather than waiting.
        </p>
      </div>
    );
  }

  const busy = status === "submitting";
  const err = (id: keyof FieldErrors) => (errors[id] ? `${id}-error` : undefined);
  const invalid = (id: keyof FieldErrors) => (errors[id] ? true : undefined);

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate aria-busy={busy}>
      {status === "error" && (
        <div className="form-alert" role="alert">
          {serverMessage || (
            <>We couldn&apos;t submit your request. Please try again or call us directly at <a href={PHONE_HREF}>{PHONE}</a>.</>
          )}
        </div>
      )}

      <div className="form-row">
        <div className="form-field">
          <label htmlFor="name">Your Name *</label>
          <input type="text" id="name" name="name" autoComplete="name" required aria-required="true" maxLength={100}
            aria-invalid={invalid("name")} aria-describedby={err("name")} />
          {errors.name && <p className="field-error" id="name-error">{errors.name}</p>}
        </div>
        <div className="form-field">
          <label htmlFor="phone">Phone Number *</label>
          <input type="tel" id="phone" name="phone" autoComplete="tel" inputMode="tel" required aria-required="true"
            placeholder="(928) 000-0000" maxLength={30} aria-invalid={invalid("phone")} aria-describedby={err("phone")} />
          {errors.phone && <p className="field-error" id="phone-error">{errors.phone}</p>}
        </div>
      </div>

      <div className="form-row">
        <div className="form-field">
          <label htmlFor="email">Email (optional)</label>
          <input type="email" id="email" name="email" autoComplete="email" inputMode="email" maxLength={254}
            placeholder="you@example.com" aria-invalid={invalid("email")} aria-describedby={err("email")} />
          {errors.email && <p className="field-error" id="email-error">{errors.email}</p>}
        </div>
        <div className="form-field">
          <label htmlFor="city">City / ZIP Code *</label>
          <input type="text" id="city" name="city" autoComplete="address-level2" required aria-required="true"
            placeholder="e.g. Wickenburg or 85390" maxLength={100} aria-invalid={invalid("city")} aria-describedby={err("city")} />
          {errors.city && <p className="field-error" id="city-error">{errors.city}</p>}
        </div>
      </div>

      <div className="form-row">
        <div className="form-field">
          <label htmlFor="type">Type of Damage *</label>
          <select id="type" name="type" required aria-required="true" defaultValue="" aria-invalid={invalid("type")} aria-describedby={err("type")}>
            <option value="" disabled>Select one</option>
            {DAMAGE_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
          {errors.type && <p className="field-error" id="type-error">{errors.type}</p>}
        </div>
        <div className="form-field">
          <label htmlFor="urgency">Urgency *</label>
          <select id="urgency" name="urgency" required aria-required="true" defaultValue="" aria-invalid={invalid("urgency")} aria-describedby={err("urgency")}>
            <option value="" disabled>Select one</option>
            {URGENCY_LEVELS.map((u) => <option key={u} value={u}>{u}</option>)}
          </select>
          {errors.urgency && <p className="field-error" id="urgency-error">{errors.urgency}</p>}
        </div>
      </div>

      <div className="form-field">
        <label htmlFor="message">Message (optional)</label>
        <textarea id="message" name="message" rows={4} maxLength={2000} placeholder="Tell us briefly what happened..."
          aria-invalid={invalid("message")} aria-describedby={err("message")} />
        {errors.message && <p className="field-error" id="message-error">{errors.message}</p>}
      </div>

      {/* Honeypot: invisible to people and screen readers; bots that fill every field reveal themselves. The server
          silently discards any submission where it is filled. */}
      <div className="hp-field" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input type="text" id="company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <button type="submit" className="btn btn-primary btn-block" disabled={busy}>
        {busy ? "Sending…" : "Request Emergency Help"}
      </button>
      <p className="form-note">
        By submitting, you agree to be contacted about your service request. For active emergencies, please call{" "}
        <a href={PHONE_HREF}>{PHONE}</a> directly rather than waiting for a form response.
      </p>
    </form>
  );
}
