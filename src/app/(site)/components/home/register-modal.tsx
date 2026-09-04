"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { signupThenLogin } from "@/app/(site)/components/shared/auth-client";

const inputClass =
  "w-full rounded-[10px] border border-white/30 bg-white/8 px-4 py-3 font-ui text-[15px] text-white placeholder:text-white/50 outline-none transition-[border-color,box-shadow] focus:border-[#1468ba] focus:ring-2 focus:ring-[#1468ba]/35";
const appSideLoginHref = `${process.env.NEXT_PUBLIC_RIDESHAIR_APP_BASE_LINK ?? ""}/login`;
const RECAPTCHA_SITE_KEY =
  process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ||
  "6LfODPgdAAAAAPtuwKuNGKe0muxX4ODEN84Wovth";
const formValue = (value: FormDataEntryValue | null) =>
  typeof value === "string" ? value.trim() : "";

// ─── Context ────────────────────────────────────────────────────────────────

type RegisterModalCtx = { openModal: () => void };
const RegisterModalContext = createContext<RegisterModalCtx>({
  openModal: () => {},
});

export function useRegisterModal() {
  return useContext(RegisterModalContext);
}

// ─── Modal UI ───────────────────────────────────────────────────────────────

function RegisterModalPanel({ onClose }: { onClose: () => void }) {
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [acceptedTos, setAcceptedTos] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  // Close on ESC
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const onSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!acceptedTerms || !acceptedTos || isSubmitting) return;

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
    [acceptedTerms, acceptedTos, captchaToken, isSubmitting],
  );

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop — intentionally no onClick; modal closes only via X or ESC */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        aria-hidden
      />

      {/* Card */}
      <div className="relative w-full max-w-[520px] rounded-[20px] border border-white/12 bg-[linear-gradient(145deg,rgba(13,26,52,0.97)_0%,rgba(8,16,34,0.98)_100%)] p-7 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)] sm:p-9">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white/70 transition-colors hover:bg-white/20 hover:text-white"
          aria-label="Close"
        >
          ✕
        </button>

        {/* Heading */}
        <p className="font-display text-[26px] font-bold leading-snug sm:text-[30px]">
          <span className="text-[#ff7a01]">Start</span>{" "}
          <span className="text-white">Your Inspection</span>
        </p>
        <p className="mt-1 font-ui text-[14px] text-white/55">
          Create your free account to get started today.
        </p>

        {/* Form */}
        <form
          className="mt-6 space-y-4"
          onSubmit={(event) => {
            void onSubmit(event);
          }}
          noValidate
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="sr-only">First name</span>
              <input
                type="text"
                name="firstName"
                autoComplete="given-name"
                placeholder="First name"
                className={inputClass}
              />
            </label>
            <label className="block">
              <span className="sr-only">Last name</span>
              <input
                type="text"
                name="lastName"
                autoComplete="family-name"
                placeholder="Last name"
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
              placeholder="Email address"
              className={inputClass}
            />
          </label>

          <label className="block">
            <span className="sr-only">Phone number</span>
            <input
              type="tel"
              name="phone"
              autoComplete="tel"
              placeholder="Phone number"
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

          <div className="flex items-start gap-3 text-left font-ui text-[14px] leading-relaxed text-white/80">
            <input
              type="checkbox"
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
              className="mt-1 h-4 w-4 shrink-0 cursor-pointer rounded border-white/40 bg-black/40 text-[#ff7a01] focus:ring-[#1468ba]"
            />
            <span>
              I agree to receive SMS notifications from{" "}
              <a
                href="/home"
                className="font-semibold text-[#ff7a01] underline underline-offset-2"
              >
                Chex.ai
              </a>{" "}
              regarding my account sign-up, inspection status, and support
              communications. Msg frequency varies. Msg &amp; data rates may
              apply. Reply STOP to opt out.
              <span className="mt-1 block">
                View our{" "}
                <a
                  href="/terms-of-use"
                  className="font-semibold text-[#ff7a01] underline underline-offset-2"
                >
                  SMS Terms &amp; Privacy Policy
                </a>
                .
              </span>
            </span>
          </div>

          <div className="flex items-start gap-3 text-left font-ui text-[14px] leading-relaxed text-white/80">
            <input
              type="checkbox"
              checked={acceptedTos}
              onChange={(e) => setAcceptedTos(e.target.checked)}
              className="mt-1 h-4 w-4 shrink-0 cursor-pointer rounded border-white/40 bg-black/40 text-[#ff7a01] focus:ring-[#1468ba]"
            />
            <span>
              I Accept the{" "}
              <a
                href="/terms-of-use"
                className="font-semibold text-[#ff7a01] underline underline-offset-2"
              >
                terms of use
              </a>
              .
            </span>
          </div>

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

          <button
            type="submit"
            disabled={!acceptedTerms || !acceptedTos || isSubmitting}
            className="mt-1 w-full rounded-[12px] bg-[#ff7a01] py-3.5 font-ui text-[16px] font-bold text-white shadow-[0_14px_36px_-16px_rgba(255,122,1,0.85)] transition-[filter,transform] active:scale-[0.99] enabled:hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
          >
            {isSubmitting ? "Creating account..." : "Create Account"}
          </button>
          {submitError ? (
            <p className="font-ui text-[13px] text-[#ff9d9d]">{submitError}</p>
          ) : null}
        </form>

        <p className="mt-5 text-center font-ui text-[14px] text-white/70">
          Already have an account?{" "}
          <a
            href={appSideLoginHref}
            className="font-semibold text-[#1468ba] underline underline-offset-2 hover:text-[#3d8fd9]"
          >
            Log in
          </a>
          .
        </p>
      </div>
    </div>
  );
}

// ─── Provider ────────────────────────────────────────────────────────────────

const OPEN_EVENT = "chex:open-register";

export function RegisterModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  // Listen via window event so navigation/stale-closure issues can't prevent opening
  useEffect(() => {
    const handler = () => setIsOpen(true);
    window.addEventListener(OPEN_EVENT, handler);
    return () => window.removeEventListener(OPEN_EVENT, handler);
  }, []);

  const openModal = useCallback(() => {
    window.dispatchEvent(new Event(OPEN_EVENT));
  }, []);

  return (
    <RegisterModalContext.Provider value={{ openModal }}>
      {children}
      {isOpen && <RegisterModalPanel onClose={() => setIsOpen(false)} />}
    </RegisterModalContext.Provider>
  );
}
