"use client";

/* eslint-disable @next/next/no-img-element */

import { useCallback, useState } from "react";

const inputClass =
  "w-full rounded-[10px] border border-white/35 bg-black/35 px-4 py-3 font-ui text-[15px] text-white placeholder:text-white/55 outline-none transition-[border-color,box-shadow] focus:border-[#1468ba] focus:ring-2 focus:ring-[#1468ba]/35";

export type LocationRegisterProps = {
  sectionId?: string;
  backgroundImage: string;
  backgroundImageAlt: string;
  headlineLines: ReadonlyArray<string>;
  formHeadingAccent: string;
  formHeadingRest: string;
  firstNamePlaceholder: string;
  lastNamePlaceholder: string;
  emailPlaceholder: string;
  phonePlaceholder: string;
  passwordPlaceholder: string;
  termsPrefix: string;
  termsLinkLabel: string;
  termsLinkHref: string;
  registerButtonLabel: string;
  registerButtonHref?: string;
  loginPrefix: string;
  loginLinkLabel: string;
  loginLinkHref: string;
};

export function LocationRegister({
  sectionId,
  backgroundImage,
  backgroundImageAlt,
  headlineLines,
  formHeadingAccent,
  formHeadingRest,
  firstNamePlaceholder,
  lastNamePlaceholder,
  emailPlaceholder,
  phonePlaceholder,
  passwordPlaceholder,
  termsPrefix,
  termsLinkLabel,
  termsLinkHref,
  registerButtonLabel,
  registerButtonHref,
  loginPrefix,
  loginLinkLabel,
  loginLinkHref,
}: LocationRegisterProps) {
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const onSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!acceptedTerms || !registerButtonHref) {
        return;
      }
      window.location.assign(registerButtonHref);
    },
    [acceptedTerms, registerButtonHref],
  );

  if (!backgroundImage || !headlineLines.length) {
    return null;
  }

  return (
    <section
      id={sectionId || undefined}
      className="relative isolate overflow-hidden px-4 py-16 sm:px-6 lg:px-10 lg:py-24"
    >
      <img
        src={backgroundImage}
        alt={backgroundImageAlt}
        className="absolute inset-0 -z-20 h-full w-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-black/55" aria-hidden />

      <div className="relative mx-auto grid max-w-[1240px] gap-10 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-16">
        <div className="text-white">
          <h2 className="font-display text-[clamp(2rem,4.5vw,3.35rem)] font-black uppercase leading-[1.08] tracking-[-0.02em] lg:text-[80px]">
            {headlineLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
        </div>

        <div className="rounded-[16px] border border-white/15 bg-black/60 p-6 shadow-[0_24px_60px_-28px_rgba(0,0,0,0.85)] backdrop-blur-sm sm:p-8">
          <p className="font-display text-[26px] font-bold leading-snug sm:text-[30px] lg:text-[40px]">
            <span className="text-[#f68b1f]">{formHeadingAccent}</span>{" "}
            <span className="text-white">{formHeadingRest}</span>
          </p>

          <form className="mt-6 space-y-4" onSubmit={onSubmit} noValidate>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="sr-only">{firstNamePlaceholder}</span>
                <input
                  type="text"
                  name="firstName"
                  autoComplete="given-name"
                  placeholder={firstNamePlaceholder}
                  className={inputClass}
                />
              </label>
              <label className="block">
                <span className="sr-only">{lastNamePlaceholder}</span>
                <input
                  type="text"
                  name="lastName"
                  autoComplete="family-name"
                  placeholder={lastNamePlaceholder}
                  className={inputClass}
                />
              </label>
            </div>
            <label className="block">
              <span className="sr-only">{emailPlaceholder}</span>
              <input
                type="email"
                name="email"
                autoComplete="email"
                placeholder={emailPlaceholder}
                className={inputClass}
              />
            </label>
            <label className="block">
              <span className="sr-only">{phonePlaceholder}</span>
              <input
                type="tel"
                name="phone"
                autoComplete="tel"
                placeholder={phonePlaceholder}
                className={inputClass}
              />
            </label>
            <label className="block">
              <span className="sr-only">{passwordPlaceholder}</span>
              <input
                type="password"
                name="password"
                autoComplete="new-password"
                placeholder={passwordPlaceholder}
                className={inputClass}
              />
            </label>

            <label className="flex cursor-pointer items-start gap-3 font-ui text-[14px] leading-relaxed text-white/92 sm:text-[15px]">
              <input
                type="checkbox"
                checked={acceptedTerms}
                onChange={(ev) => setAcceptedTerms(ev.target.checked)}
                className="mt-1 h-4 w-4 shrink-0 rounded border-white/50 bg-black/40 text-[#f68b1f] focus:ring-[#1468ba]"
              />
              <span>
                {termsPrefix}
                <a
                  href={termsLinkHref}
                  className="font-semibold text-[#1468ba] underline decoration-[#1468ba]/80 underline-offset-2 hover:text-[#3d8fd9]"
                >
                  {termsLinkLabel}
                </a>
                .
              </span>
            </label>

            <button
              type="submit"
              disabled={!acceptedTerms || !registerButtonHref}
              className="mt-2 w-full rounded-[12px] bg-[#ff7a01] py-3.5 font-ui text-[16px] font-bold text-white shadow-[0_14px_36px_-16px_rgba(255,122,1,0.95)] transition-[filter,transform] active:scale-[0.99] enabled:hover:brightness-105 disabled:cursor-not-allowed  sm:text-[17px]"
            >
              {registerButtonLabel}
            </button>
          </form>

          <p className="mt-5 text-center font-ui text-[14px] text-white/90 sm:text-[15px]">
            {loginPrefix}
            <a
              href={loginLinkHref}
              className="font-semibold text-[#1468ba] underline decoration-[#1468ba]/80 underline-offset-2 hover:text-[#3d8fd9]"
            >
              {loginLinkLabel}
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
