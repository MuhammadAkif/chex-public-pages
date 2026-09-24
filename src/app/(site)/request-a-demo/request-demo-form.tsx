"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

import { submitDemoRequest } from "@/app/(site)/components/shared/auth-client";

const RECAPTCHA_SITE_KEY =
  process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ||
  "6LfODPgdAAAAAPtuwKuNGKe0muxX4ODEN84Wovth";

const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/i;

// Phone mask mirrors the old site ("+1(999)999 9999"): exactly 10 national
// digits, grouped 3-3-4. Formatting is progressive (a separator appears only
// once the digit it precedes is typed). The caret is preserved across
// reformats by counting the national digits to the left of the cursor and
// mapping that count back to an index in the freshly formatted string.
const PHONE_DIGITS = 10;

// useLayoutEffect on the client so the caret is restored before paint (no
// flicker); fall back to useEffect on the server to avoid the SSR warning.
const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

// Extract just the 10 national digits from whatever the input currently holds,
// dropping the "1" that belongs to the static "+1" prefix.
function nationalDigits(value: string): string {
  let digits = value.replace(/\D/g, "");
  if (value.startsWith("+1")) digits = digits.replace(/^1/, "");
  return digits.slice(0, PHONE_DIGITS);
}

function formatPhone(digits: string): string {
  if (!digits) return "";
  const area = digits.slice(0, 3);
  const prefix = digits.slice(3, 6);
  const line = digits.slice(6, 10);
  if (digits.length <= 3) return `+1(${area}`;
  if (digits.length <= 6) return `+1(${area})${prefix}`;
  return `+1(${area})${prefix} ${line}`;
}

// How many national digits sit to the left of `caret` in a raw input value.
function digitsBeforeCaret(value: string, caret: number): number {
  const upto = value.slice(0, caret);
  let count = (upto.match(/\d/g) ?? []).length;
  // The "1" in the "+1" prefix (string index 1) isn't a national digit.
  if (value.startsWith("+1") && caret >= 2) count -= 1;
  return Math.max(0, Math.min(count, PHONE_DIGITS));
}

// The caret index inside a formatted string that sits right after `n` national
// digits — the inverse of `digitsBeforeCaret` for `formatPhone` output.
function caretIndexForDigits(n: number): number {
  if (n <= 0) return 0;
  if (n <= 3) return n + 3; // "+1(" + area digits
  if (n <= 6) return n + 4; // + ")" before the prefix group
  return n + 5; // + " " before the line group
}

const formValue = (value: FormDataEntryValue | null) =>
  typeof value === "string" ? value.trim() : "";

const inputClass =
  "w-full rounded-[10px] border border-[#d7e1df] bg-white px-3.5 py-2.5 font-ui text-[14px] text-[#1b2f4b] placeholder:text-[#8a9aa7] outline-none transition focus:border-[#ff7a01] focus:ring-2 focus:ring-[#ff7a01]/25";

const labelClass = "mb-1.5 block font-ui text-[13px] font-medium text-[#41546e]";

export function RequestDemoForm() {
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  // Caret index to restore after the phone value reformats (null = leave as-is).
  const pendingCaret = useRef<number | null>(null);
  const [phoneDigits, setPhoneDigits] = useState("");
  const [specialOffer, setSpecialOffer] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  useIsoLayoutEffect(() => {
    if (pendingCaret.current !== null && phoneRef.current) {
      const pos = pendingCaret.current;
      phoneRef.current.setSelectionRange(pos, pos);
      pendingCaret.current = null;
    }
  }, [phoneDigits]);

  function handlePhoneChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value;
    const caret = e.target.selectionStart ?? raw.length;
    pendingCaret.current = caretIndexForDigits(digitsBeforeCaret(raw, caret));
    setPhoneDigits(nationalDigits(raw));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const data = new FormData(e.currentTarget);
    const firstName = formValue(data.get("firstName"));
    const lastName = formValue(data.get("lastName"));
    const companyName = formValue(data.get("companyName"));
    const jobTitle = formValue(data.get("jobTitle"));
    const email = formValue(data.get("email"));

    if (!firstName || !lastName || !companyName || !jobTitle || !email) {
      setError("Fill all the details first");
      return;
    }
    if (!emailRegex.test(email)) {
      setError("Enter a valid email");
      return;
    }
    if (!phoneDigits) {
      setError("Please enter phone number!");
      return;
    }
    if (phoneDigits.length < PHONE_DIGITS) {
      setError("Please enter a valid number");
      return;
    }
    if (!captchaToken) {
      setError("Check the reCAPTCHA first");
      return;
    }

    setLoading(true);
    try {
      await submitDemoRequest({
        firstName,
        lastName,
        companyName,
        jobTitle,
        email,
        phone: formatPhone(phoneDigits),
        specialOffer,
      });
      setSubmitted(true);
      setPhoneDigits("");
      setSpecialOffer(true);
      setCaptchaToken(null);
      recaptchaRef.current?.reset();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-[18px] border border-[#d6edda] bg-[#f0faf2] px-8 py-12 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#28a745] text-sm font-bold text-white">
          OK
        </div>
        <h2 className="mt-5 font-display text-[24px] font-bold text-[#1b2f4b]">
          Demo requested!
        </h2>
        <p className="mt-2 font-ui text-[15px] text-[#41546e]">
          Thanks for reaching out. Our team will be in touch shortly to schedule
          your demo.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-6 font-ui text-[14px] font-semibold text-[#ff7a01] underline underline-offset-2 hover:brightness-110"
        >
          Request another demo
        </button>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-[18px] border border-[#e4ebf5] bg-white shadow-[0_24px_60px_-30px_rgba(10,27,42,0.35)]">
      <div className="h-1.5 w-full bg-[#ff7a01]" />
      <div className="p-6 sm:p-8">
        <h3 className="font-display text-[20px] font-bold leading-tight text-[#1b2f4b]">
          Get Started
        </h3>
        <p className="mt-1 font-ui text-[13px] leading-5 text-[#63757f]">
          Please provide a few details to help us understand how we can best
          serve your needs.
        </p>

        <form
          className="mt-6 space-y-4"
          onSubmit={(event) => {
            void handleSubmit(event);
          }}
          noValidate
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>First name</label>
              <input
                type="text"
                name="firstName"
                autoComplete="given-name"
                placeholder="First Name"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Last name</label>
              <input
                type="text"
                name="lastName"
                autoComplete="family-name"
                placeholder="Last Name"
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>Company name</label>
            <input
              type="text"
              name="companyName"
              autoComplete="organization"
              placeholder="Company Name"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Job title</label>
            <input
              type="text"
              name="jobTitle"
              autoComplete="organization-title"
              placeholder="Job Title"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Work email</label>
            <input
              type="email"
              name="email"
              autoComplete="email"
              placeholder="Email"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Phone number</label>
            <input
              ref={phoneRef}
              type="tel"
              inputMode="numeric"
              autoComplete="tel"
              placeholder="+1(555)555 5555"
              value={formatPhone(phoneDigits)}
              onChange={handlePhoneChange}
              className={inputClass}
            />
          </div>

          <label className="flex items-start gap-2.5 text-left font-ui text-[12.5px] leading-5 text-[#63757f]">
            <input
              type="checkbox"
              checked={specialOffer}
              onChange={(e) => setSpecialOffer(e.target.checked)}
              className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-[#ff7a01]"
            />
            <span>
              Yes, please keep me updated on news and special offers.
            </span>
          </label>

          <p className="font-ui text-[12px] leading-5 text-[#8a9aa7]">
            By submitting the form, you are agreeing to our{" "}
            <a
              href="/privacy-policy"
              className="font-semibold text-[#1368b9] underline underline-offset-2"
            >
              privacy policy
            </a>
            .
          </p>

          <div className="overflow-x-auto">
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={RECAPTCHA_SITE_KEY}
              onChange={setCaptchaToken}
              onExpired={() => setCaptchaToken(null)}
              onErrored={() => setCaptchaToken(null)}
              size="normal"
            />
          </div>

          {error && (
            <p className="font-ui text-[13px] text-[#e53935]">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full cursor-pointer rounded-[10px] bg-[#ff7a01] py-3 font-ui text-[15px] font-bold text-white shadow-[0_14px_36px_-16px_rgba(255,122,1,0.9)] transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Submitting..." : "Get Started"}
          </button>
        </form>
      </div>
    </div>
  );
}
