// Shared by the browser form AND the API route, so client and server rules can never drift apart.
// Nothing in here is trusted on its own: the server re-validates every submission.

export const DAMAGE_TYPES = ["Water Damage", "Monsoon Flood", "Mold", "Sewage Backup", "Burst Pipe", "Storm Damage", "Other"] as const;
export const URGENCY_LEVELS = ["Emergency — Right Now", "Within 24 Hours", "Scheduling Ahead", "Not Sure Yet"] as const;

export type ContactInput = {
  name: string;
  phone: string;
  email: string;
  city: string;
  type: string;
  urgency: string;
  message: string;
};
export type FieldErrors = Partial<Record<keyof ContactInput, string>>;
export type ValidationResult = { ok: true; value: ContactInput } | { ok: false; errors: FieldErrors };

// Control characters (except tab/newline/CR, handled separately) and Unicode line separators.
const CONTROL = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F\u2028\u2029]/g;

/** For single-line fields: removes control chars and collapses ALL whitespace, including CR/LF, so a value can never inject a header or a new line. */
export const singleLine = (v: unknown): string =>
  (typeof v === "string" ? v : "").replace(CONTROL, " ").replace(/\s+/g, " ").trim();

/** For the message: keeps line breaks, removes control chars, caps blank-line runs. */
export const multiLine = (v: unknown): string =>
  (typeof v === "string" ? v : "").replace(/\r\n?/g, "\n").replace(CONTROL, "").replace(/\n{3,}/g, "\n\n").trim();

const NAME_RE = /^[\p{L}\p{M}][\p{L}\p{M} '’.\-]{1,99}$/u;
const CITY_RE = /^[\p{L}\p{M}\d][\p{L}\p{M}\d ,.'’\-]{1,99}$/u;
const EMAIL_RE = /^[^\s@<>"'()\\,;:]+@[^\s@<>"'()\\,;:]+\.[^\s@<>"'()\\,;:]{2,}$/;
const PHONE_CHARS_RE = /^[\d\s().+\-]{7,30}$/;
const MAX_RAW = 5000; // refuse to even run regexes on absurdly long values

export const isValidEmail = (e: string): boolean => e.length <= 254 && EMAIL_RE.test(e);

export function validateContact(raw: Record<string, unknown>): ValidationResult {
  const errors: FieldErrors = {};
  const tooLong = (k: string) => typeof raw[k] === "string" && (raw[k] as string).length > MAX_RAW;

  const name = singleLine(raw.name);
  if (tooLong("name") || !NAME_RE.test(name)) errors.name = "Please enter your name (letters only, at least 2 characters).";

  const phoneRaw = singleLine(raw.phone);
  const digits = phoneRaw.replace(/\D/g, "");
  const tenDigits = digits.length === 11 && digits[0] === "1" ? digits.slice(1) : digits;
  let phone = "";
  if (tooLong("phone") || !PHONE_CHARS_RE.test(phoneRaw) || tenDigits.length !== 10) {
    errors.phone = "Please enter a valid 10-digit phone number.";
  } else {
    phone = `(${tenDigits.slice(0, 3)}) ${tenDigits.slice(3, 6)}-${tenDigits.slice(6)}`;
  }

  const email = singleLine(raw.email);
  if (email && (tooLong("email") || !isValidEmail(email))) errors.email = "Please enter a valid email address, or leave it blank.";

  const city = singleLine(raw.city);
  if (tooLong("city") || !CITY_RE.test(city)) errors.city = "Please enter your city or ZIP code.";

  const type = singleLine(raw.type);
  if (!(DAMAGE_TYPES as readonly string[]).includes(type)) errors.type = "Please choose the type of damage.";

  const urgency = singleLine(raw.urgency);
  if (!(URGENCY_LEVELS as readonly string[]).includes(urgency)) errors.urgency = "Please choose how urgent this is.";

  const message = multiLine(raw.message);
  if (tooLong("message") || message.length > 2000) errors.message = "Please keep your message under 2,000 characters.";

  if (Object.keys(errors).length > 0) return { ok: false, errors };
  return { ok: true, value: { name, phone, email, city, type, urgency, message } };
}
