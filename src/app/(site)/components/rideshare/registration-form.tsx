"use client";

import { useState, type FormEvent } from "react";

import {
  SiteImage,
  type SiteImageSource,
} from "@/app/(site)/components/shared/site-image";
import { signupThenLogin } from "@/app/(site)/components/shared/auth-client";

export type RegistrationFormProps = {
  heading: string;
  formHeadingLead: string;
  formHeadingHighlight: string;
  formHeadingTail: string;
  submitLabel: string;
  termsLabel: string;
  termsLinkLabel: string;
  termsHref: string;
  loginPrompt: string;
  loginLinkLabel: string;
  loginHref: string;
  backgroundImage: SiteImageSource;
  backgroundImageAlt: string;
};

const PHONE_PATTERN = /^\+?1?[\s.-]?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;

export function RegistrationForm({
  heading,
  formHeadingLead,
  formHeadingHighlight,
  formHeadingTail,
  submitLabel,
  termsLabel,
  termsLinkLabel,
  termsHref,
  loginPrompt,
  loginLinkLabel,
  loginHref,
  backgroundImage,
  backgroundImageAlt,
}: RegistrationFormProps) {
  const [agreed, setAgreed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (!agreed) {
      setError("Please accept the Terms of Use.");
      return;
    }

    const formData = new FormData(event.currentTarget);
    const readField = (name: string) => {
      const value = formData.get(name);
      return typeof value === "string" ? value : "";
    };
    const firstName = readField("firstName").trim();
    const lastName = readField("lastName").trim();
    const email = readField("email").trim();
    const phone = readField("phone").trim();
    const password = readField("password");

    if (!firstName || !lastName || !email || !phone || !password) {
      setError("Please fill all fields.");
      return;
    }
    if (!PHONE_PATTERN.test(phone)) {
      setError("Please enter a valid phone number.");
      return;
    }

    setSubmitting(true);
    signupThenLogin({ firstName, lastName, email, phone, password })
      .catch((err: unknown) => {
        const message =
          err instanceof Error ? err.message : "Something went wrong.";
        setError(message);
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <section
      id="signup"
      className="relative overflow-hidden bg-[#fafafa]"
    >
      <div className="absolute inset-0" aria-hidden="true">
        <SiteImage
          src={backgroundImage}
          alt={backgroundImageAlt}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative mx-auto flex min-h-[100vh] max-w-[1300px] flex-col items-center gap-10 px-4 py-16 sm:px-6 lg:flex-row lg:items-center lg:justify-evenly lg:gap-5 lg:px-10 lg:py-24">
        <div className="w-full lg:w-1/2">
          <h2 className="font-display text-[32px] font-semibold uppercase leading-[1.2] text-white sm:text-[42px] lg:text-[64px]">
            {heading}
          </h2>
        </div>

        <div className="w-full max-w-[500px] rounded-[20px] border-2 border-white/20 bg-black/40 p-6 backdrop-blur-md sm:p-10 lg:max-w-[460px]">
          <h3 className="font-display text-[24px] font-semibold leading-[1.2] text-white sm:text-[32px]">
            <span className="text-[#ff9900]">{formHeadingLead}</span>{" "}
            {formHeadingHighlight}
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>
            {formHeadingTail}
          </h3>

          <form className="mt-7 space-y-4" onSubmit={onSubmit} noValidate>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <input
                name="firstName"
                required
                placeholder="First Name"
                autoComplete="given-name"
                className="w-full rounded-[8px] border border-white/50 bg-transparent px-5 py-4 font-ui text-[16px] text-white placeholder-[#d2d2d2] outline-none focus:ring-2 focus:ring-[#ff9900]/40"
              />
              <input
                name="lastName"
                required
                placeholder="Last Name"
                autoComplete="family-name"
                className="w-full rounded-[8px] border border-white/50 bg-transparent px-5 py-4 font-ui text-[16px] text-white placeholder-[#d2d2d2] outline-none focus:ring-2 focus:ring-[#ff9900]/40"
              />
            </div>

            <input
              name="email"
              type="email"
              required
              placeholder="Email Address"
              autoComplete="email"
              className="w-full rounded-[8px] border border-white/50 bg-transparent px-5 py-4 font-ui text-[16px] text-white placeholder-[#d2d2d2] outline-none focus:ring-2 focus:ring-[#ff9900]/40"
            />

            <input
              name="phone"
              type="tel"
              required
              placeholder="Phone Number"
              autoComplete="tel"
              className="w-full rounded-[8px] border border-white/50 bg-transparent px-5 py-4 font-ui text-[16px] text-white placeholder-[#d2d2d2] outline-none focus:ring-2 focus:ring-[#ff9900]/40"
            />

            <input
              name="password"
              type="password"
              required
              placeholder="Password"
              autoComplete="new-password"
              className="w-full rounded-[8px] border border-white/50 bg-transparent px-5 py-4 font-ui text-[16px] text-white placeholder-[#d2d2d2] outline-none focus:ring-2 focus:ring-[#ff9900]/40"
            />

            <label className="flex items-center gap-3 pt-2">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="h-5 w-5 cursor-pointer rounded border border-white/50 bg-white/10 accent-[#ff9900]"
              />
              <span className="font-ui text-[13px] leading-5 text-white sm:text-[14px]">
                {termsLabel}{" "}
                <a
                  href={termsHref}
                  className="font-semibold text-[#1890ff] underline"
                >
                  {termsLinkLabel}
                </a>
              </span>
            </label>

            {error ? (
              <p className="font-ui text-[14px] text-[#ffb4a8]" role="alert">
                {error}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={submitting}
              className="block h-12 w-full cursor-pointer rounded-[8px] bg-[#ff9900] font-ui text-[16px] font-semibold text-white transition-colors hover:bg-[#f08c00] disabled:opacity-60 sm:text-[18px]"
            >
              {submitting ? "Submitting…" : submitLabel}
            </button>

            <p className="pt-2 text-center font-ui text-[14px] text-white">
              {loginPrompt}{" "}
              <a
                href={loginHref}
                className="font-semibold text-[#1890ff] underline"
              >
                {loginLinkLabel}
              </a>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
