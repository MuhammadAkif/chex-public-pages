"use client";

import { useCallback, useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

import { signupThenLogin } from "@/app/(site)/components/shared/auth-client";

const RECAPTCHA_SITE_KEY =
  process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ||
  "6LfODPgdAAAAAPtuwKuNGKe0muxX4ODEN84Wovth";

const formValue = (value: FormDataEntryValue | null) =>
  typeof value === "string" ? value.trim() : "";

const inputClass =
  "w-full rounded-[10px] border border-[#d7e1df] bg-white px-3.5 py-2.5 font-ui text-[14px] text-[#1b2f4b] placeholder:text-[#8a9aa7] outline-none transition focus:border-[#ff7a01] focus:ring-2 focus:ring-[#ff7a01]/25";

export type InspectionSignupFormProps = {
  title?: string;
  subtitle?: string;
};

/**
 * Inline version of the register popup — a compact signup form used as the
 * sticky sidebar on the inspection-form page. Same submit flow as the modal
 * (signupThenLogin → redirect into the rideshare app).
 */
export function InspectionSignupForm({
  title = "Start My Inspection",
  subtitle = "Create your free account — get certified the same day.",
}: InspectionSignupFormProps) {
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  // SMS consent is optional and pre-checked (user may opt out).
  const [acceptedTerms, setAcceptedTerms] = useState(true);
  const [acceptedTos, setAcceptedTos] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const onSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!acceptedTos || isSubmitting) return;

      const formData = new FormData(e.currentTarget);
      const firstName = formValue(formData.get("firstName"));
      const lastName = formValue(formData.get("lastName"));
      const email = formValue(formData.get("email"));
      const phone = formValue(formData.get("phone"));
      const password = formValue(formData.get("password"));

      if (!firstName || !lastName || !email || !phone || !password) {
        setSubmitError("Please fill all required fields.");
        return;
      }
      if (!captchaToken) {
        setSubmitError("Check the reCAPTCHA first.");
        return;
      }

      setSubmitError(null);
      setIsSubmitting(true);
      try {
        await signupThenLogin({ firstName, lastName, email, phone, password });
        setCaptchaToken(null);
        recaptchaRef.current?.reset();
      } catch (error) {
        setSubmitError(
          error instanceof Error
            ? error.message
            : "Registration failed. Please try again.",
        );
      } finally {
        setIsSubmitting(false);
      }
    },
    [acceptedTos, captchaToken, isSubmitting],
  );

  return (
    <div className="overflow-hidden rounded-[18px] border border-[#e4ebf5] bg-white shadow-[0_24px_60px_-30px_rgba(10,27,42,0.35)]">
      <div className="h-1.5 w-full bg-[#ff7a01]" />
      <div className="p-6">
        <h3 className="font-display text-[20px] font-bold leading-tight text-[#1b2f4b]">
          {title}
        </h3>
        <p className="mt-1 font-ui text-[13px] leading-5 text-[#63757f]">
          {subtitle}
        </p>

        <form
          className="mt-5 space-y-3"
          onSubmit={(event) => {
            void onSubmit(event);
          }}
          noValidate
        >
          <div className="grid grid-cols-2 gap-3">
            <label className="block">
              <span className="sr-only">First name</span>
              <input
                type="text"
                name="firstName"
                autoComplete="given-name"
                placeholder="First Name"
                className={inputClass}
              />
            </label>
            <label className="block">
              <span className="sr-only">Last name</span>
              <input
                type="text"
                name="lastName"
                autoComplete="family-name"
                placeholder="Last Name"
                className={inputClass}
              />
            </label>
          </div>
          <label className="block">
            <span className="sr-only">Email address</span>
            <input
              type="email"
              name="email"
              autoComplete="email"
              placeholder="Email Address"
              className={inputClass}
            />
          </label>
          <label className="block">
            <span className="sr-only">Phone number</span>
            <input
              type="tel"
              name="phone"
              autoComplete="tel"
              placeholder="Phone Number"
              className={inputClass}
            />
          </label>
          <label className="block">
            <span className="sr-only">Password</span>
            <input
              type="password"
              name="password"
              autoComplete="new-password"
              placeholder="Password"
              className={inputClass}
            />
          </label>

          <div className="flex items-start gap-2.5 text-left font-ui text-[12.5px] leading-5 text-[#63757f]">
            <input
              type="checkbox"
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
              className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-[#ff7a01]"
            />
            <span>
              I agree to receive SMS notifications from{" "}
              <a
                href="/home"
                className="font-semibold text-[#1368b9] underline underline-offset-2"
              >
                Chex.ai
              </a>{" "}
              regarding my account sign-up, inspection status, and support
              communications. Msg frequency varies. Msg &amp; data rates may
              apply. Reply STOP to opt out.
            </span>
          </div>

          <div className="flex items-start gap-2.5 text-left font-ui text-[12.5px] leading-5 text-[#63757f]">
            <input
              type="checkbox"
              checked={acceptedTos}
              onChange={(e) => setAcceptedTos(e.target.checked)}
              className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-[#ff7a01]"
            />
            <span>
              I Accept the{" "}
              <a
                href="/terms-of-use"
                className="font-semibold text-[#1368b9] underline underline-offset-2"
              >
                terms of use
              </a>
              .
            </span>
          </div>

          <div className="overflow-hidden">
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={RECAPTCHA_SITE_KEY}
              onChange={setCaptchaToken}
              onExpired={() => setCaptchaToken(null)}
              onErrored={() => setCaptchaToken(null)}
            />
          </div>

          <button
            type="submit"
            disabled={!acceptedTos || isSubmitting}
            className="w-full cursor-pointer rounded-[10px] bg-[#ff7a01] py-3 font-ui text-[15px] font-bold text-white shadow-[0_14px_36px_-16px_rgba(255,122,1,0.9)] transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Creating account..." : "Start My Inspection"}
          </button>
          {submitError ? (
            <p className="font-ui text-[12.5px] text-[#d64545]">{submitError}</p>
          ) : null}
        </form>
      </div>
    </div>
  );
}
