import { Button } from "@/app/(site)/components/ui/button";
import { Reveal } from "@/app/(site)/components/shared/reveal";
import { SiteImage } from "@/app/(site)/components/shared/site-image";
import { RideshareFaq } from "@/app/(site)/components/rideshare/rideshare-faq";
import {
  LocationTestimonials,
  type LocationTestimonialsProps,
} from "@/app/(site)/components/locations/location-testimonials";
import {
  StateFormsTable,
  type StateFormsTableProps,
} from "@/app/(site)/components/inspection-form/state-forms-table";
import {
  RequirementsAccordion,
  type RequirementsAccordionProps,
} from "@/app/(site)/components/inspection-form/requirements-accordion";
import { StickyCta } from "@/app/(site)/components/inspection-form/sticky-cta";
import { InspectionSignupForm } from "@/app/(site)/components/inspection-form/inspection-signup-form";

/* ─── Content types ─────────────────────────────────────────────────────── */

type HeroContent = {
  eyebrow: string;
  titleLead: string;
  titleHighlight: string;
  description: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
  note: string;
  image: string;
  imageAlt: string;
};

type TrustContent = {
  title: string;
  logos: ReadonlyArray<{ src: string; alt: string }>;
  textChips?: ReadonlyArray<string>;
};

type OnlineContent = {
  eyebrow: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  image: string;
  imageAlt: string;
  steps: ReadonlyArray<{ title: string; description: string }>;
};

type LocalPrepContent = {
  eyebrow: string;
  title: string;
  paragraphs: ReadonlyArray<string>;
  ctaLabel: string;
  ctaHref: string;
  panelTitle: string;
  panelItems: ReadonlyArray<string>;
};

type CompareColumn = {
  tag: string;
  title: string;
  steps: ReadonlyArray<string>;
  foot: string;
  badge?: string;
};

type CompareContent = {
  eyebrow: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  local: CompareColumn;
  chex: CompareColumn & { badge: string };
};

type FaqContent = {
  title: string;
  items: ReadonlyArray<{ question: string; answer: string }>;
};

type CtaContent = {
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  stats: ReadonlyArray<{ value: string; label: string }>;
};

export type InspectionFormContent = {
  hero: HeroContent;
  trust: TrustContent;
  online: OnlineContent;
  localPrep: LocalPrepContent;
  requirements: RequirementsAccordionProps;
  states: StateFormsTableProps;
  compare: CompareContent;
  reviews: LocationTestimonialsProps;
  faq: FaqContent;
  cta: CtaContent;
};

/* ─── Section heading helper ────────────────────────────────────────────── */

function SectionHead({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mx-auto mb-10 max-w-[760px] text-center">
      <p className="type-ui-label text-[#ff7a01]">{eyebrow}</p>
      <h2 className="mt-3 font-display text-[28px] font-bold leading-tight tracking-[-0.01em] text-[#1b2f4b] sm:text-[36px]">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 font-ui text-[16px] leading-7 text-[#41546e] sm:text-[17px]">
          {description}
        </p>
      ) : null}
    </div>
  );
}

/* ─── Hero ───────────────────────────────────────────────────────────────── */

function Hero({ hero }: { hero: HeroContent }) {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#f0f6ff_100%)] px-4 pb-16 pt-14 sm:px-6 lg:px-10 lg:pb-24 lg:pt-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(255,122,1,0.14),transparent_62%)]"
      />
      <div className="relative mx-auto grid max-w-[1160px] items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <p className="type-ui-label text-[#ff7a01]">{hero.eyebrow}</p>
          <h1 className="mt-4 font-display text-[34px] font-bold leading-[1.1] tracking-[-0.01em] text-[#1b2f4b] sm:text-[44px] lg:text-[50px]">
            {hero.titleLead}{" "}
            <span className="text-[#ff7a01]">{hero.titleHighlight}</span>
          </h1>
          <p className="mt-5 max-w-[540px] font-ui text-[17px] leading-8 text-[#41546e] sm:text-[18px]">
            {hero.description}
          </p>
          <div className="mt-7 flex flex-wrap gap-3.5">
            <Button href={hero.primaryCtaHref} size="lg" className="rounded-[8px] px-7">
              {hero.primaryCtaLabel}
            </Button>
            <Button
              href={hero.secondaryCtaHref}
              variant="outline"
              size="lg"
              className="rounded-[8px] px-7"
            >
              {hero.secondaryCtaLabel}
            </Button>
          </div>
          <p className="mt-5 flex items-center gap-2 font-ui text-[13.5px] text-[#63757f]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#ff7a01]" />
            {hero.note}
          </p>
        </div>

        {/* Product preview */}
        <div className="relative flex justify-center lg:justify-end">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_60%_45%,rgba(255,122,1,0.14),transparent_62%)]"
          />
          <SiteImage
            src={hero.image}
            alt={hero.imageAlt}
            priority
            className="h-auto w-full max-w-[460px] object-contain drop-shadow-[0_34px_70px_rgba(10,27,42,0.20)]"
          />
        </div>
      </div>
    </section>
  );
}

/* ─── Trust strip ────────────────────────────────────────────────────────── */

function TrustStrip({ trust }: { trust: TrustContent }) {
  return (
    <div className="bg-white px-4 pb-2 pt-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-[1160px]">
        <p className="text-center font-ui text-[13px] font-semibold uppercase tracking-[0.08em] text-[#63757f]">
          {trust.title}
        </p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-10 gap-y-5">
          {trust.logos.map((logo) => (
            <SiteImage
              key={logo.alt}
              src={logo.src}
              alt={logo.alt}
              className="h-7 w-auto object-contain opacity-90 sm:h-8"
            />
          ))}
          {(trust.textChips ?? []).map((chip) => (
            <span
              key={chip}
              className="rounded-full border border-[#e4ebea] bg-white px-4 py-2 font-display text-[15px] font-bold text-[#1b2f4b] opacity-90"
            >
              {chip}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Online option (4 steps) ────────────────────────────────────────────── */

function OnlineOption({ online }: { online: OnlineContent }) {
  return (
    <section className="scroll-mt-28 py-14">
      <div>
        <SectionHead
          eyebrow={online.eyebrow}
          title={online.title}
          description={online.description}
        />
        <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <div className="relative flex justify-center">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_50%,rgba(255,122,1,0.12),transparent_62%)]"
            />
            <SiteImage
              src={online.image}
              alt={online.imageAlt}
              className="h-auto w-full max-w-[420px] object-contain drop-shadow-[0_30px_60px_rgba(10,27,42,0.18)]"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {online.steps.map((step, index) => (
              <div
                key={step.title}
                className="rounded-[16px] border border-[#e4ebf5] bg-white p-6 shadow-[0_4px_14px_rgba(10,27,42,0.06)]"
              >
                <div className="grid h-9 w-9 place-items-center rounded-[10px] bg-[#fff1e6] font-display text-[14px] font-bold text-[#ff7a01]">
                  {index + 1}
                </div>
                <h4 className="mt-4 font-display text-[16.5px] font-semibold text-[#1b2f4b]">
                  {step.title}
                </h4>
                <p className="mt-2 font-ui text-[14px] leading-6 text-[#63757f]">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-10 text-center">
          <Button href={online.ctaHref} size="lg" className="rounded-[8px] px-8">
            {online.ctaLabel}
          </Button>
        </div>
      </div>
    </section>
  );
}

/* ─── Local prep split ───────────────────────────────────────────────────── */

function LocalPrep({ localPrep }: { localPrep: LocalPrepContent }) {
  return (
    <section className="py-14">
      <div className="grid items-center gap-11 lg:grid-cols-2">
        <div>
          <p className="type-ui-label text-[#ff7a01]">{localPrep.eyebrow}</p>
          <h2 className="mt-3 font-display text-[26px] font-bold leading-tight tracking-[-0.01em] text-[#1b2f4b] sm:text-[32px]">
            {localPrep.title}
          </h2>
          {localPrep.paragraphs.map((paragraph) => (
            <p
              key={paragraph.slice(0, 24)}
              className="mt-4 font-ui text-[16px] leading-7 text-[#41546e]"
            >
              {paragraph}
            </p>
          ))}
          <div className="mt-6">
            <Button
              href={localPrep.ctaHref}
              variant="outline"
              size="lg"
              className="rounded-[8px] px-7"
            >
              {localPrep.ctaLabel}
            </Button>
          </div>
        </div>
        <div className="rounded-[22px] border border-[#e4ebf5] bg-white p-7 shadow-[0_4px_14px_rgba(10,27,42,0.06)]">
          <h3 className="font-display text-[18px] font-bold text-[#1b2f4b]">
            {localPrep.panelTitle}
          </h3>
          <ul className="mt-4">
            {localPrep.panelItems.map((item) => (
              <li
                key={item}
                className="relative border-b border-[#eef2f1] py-3 pl-8 font-ui text-[15px] text-[#243642] last:border-b-0"
              >
                <span className="absolute left-0 top-3 grid h-[18px] w-[18px] place-items-center rounded-full bg-[#fff1e6]">
                  <svg
                    width="11"
                    height="11"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#c85c00"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ─── Compare ────────────────────────────────────────────────────────────── */

function CompareCard({
  column,
  win,
}: {
  column: CompareColumn;
  win?: boolean;
}) {
  return (
    <div
      className={`relative rounded-[22px] border p-8 ${
        win
          ? "border-transparent bg-[linear-gradient(180deg,#010e2b,#0c2334)] text-[#dbe9e4]"
          : "border-[#e4ebea] bg-white"
      }`}
    >
      {win && column.badge ? (
        <span className="absolute -top-3 right-6 rounded-full bg-[#ff7a01] px-3 py-1.5 font-display text-[12px] font-bold text-white">
          {column.badge}
        </span>
      ) : null}
      <p
        className={`font-display text-[12px] font-bold uppercase tracking-[0.1em] ${
          win ? "text-[#ff7a01]" : "text-[#63757f]"
        }`}
      >
        {column.tag}
      </p>
      <h3
        className={`mb-5 mt-1.5 font-display text-[22px] font-bold ${
          win ? "text-white" : "text-[#1b2f4b]"
        }`}
      >
        {column.title}
      </h3>
      <ol className="space-y-0">
        {column.steps.map((step, index) => (
          <li
            key={step}
            className={`relative py-2.5 pl-11 font-ui text-[14.5px] ${
              win
                ? "border-b border-white/10 last:border-b-0"
                : "border-b border-[#eef2f1] last:border-b-0"
            }`}
          >
            <span
              className={`absolute left-0 top-2.5 grid h-6 w-6 place-items-center rounded-[8px] font-display text-[12px] font-bold ${
                win ? "bg-[#ff7a01] text-white" : "bg-[#eef2f8] text-[#63757f]"
              }`}
            >
              {index + 1}
            </span>
            {step}
          </li>
        ))}
      </ol>
      <p
        className={`mt-5 font-ui text-[13px] leading-6 ${
          win ? "text-[#9fc7ba]" : "text-[#63757f]"
        }`}
      >
        {column.foot}
      </p>
    </div>
  );
}

function Compare({ compare }: { compare: CompareContent }) {
  return (
    <section className="bg-white px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-[1080px]">
        <SectionHead
          eyebrow={compare.eyebrow}
          title={compare.title}
          description={compare.description}
        />
        <div className="grid gap-6 lg:grid-cols-2">
          <CompareCard column={compare.local} />
          <CompareCard column={compare.chex} win />
        </div>
        <div className="mt-10 text-center">
          <Button href={compare.ctaHref} size="lg" className="rounded-[8px] px-8">
            {compare.ctaLabel}
          </Button>
        </div>
      </div>
    </section>
  );
}

/* ─── Final CTA ──────────────────────────────────────────────────────────── */

function FinalCta({ cta }: { cta: CtaContent }) {
  return (
    <section className="bg-white px-4 pb-20 pt-4 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-[1080px]">
        <div className="relative overflow-hidden rounded-[26px] bg-[linear-gradient(180deg,#010e2b,#081722)] px-6 py-14 text-center sm:px-10">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-16 top-0 h-[320px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(255,122,1,0.22),transparent_60%)]"
          />
          <div className="relative">
            <h2 className="mx-auto max-w-[640px] font-display text-[28px] font-bold leading-tight text-white sm:text-[38px]">
              {cta.title}
            </h2>
            <p className="mx-auto mt-4 max-w-[560px] font-ui text-[16px] leading-7 text-[#a9c6bd] sm:text-[17px]">
              {cta.description}
            </p>
            <div className="mt-7">
              <Button href={cta.ctaHref} size="lg" className="rounded-[8px] px-8">
                {cta.ctaLabel}
              </Button>
            </div>
            <div className="mx-auto mt-10 grid max-w-[640px] grid-cols-1 gap-6 sm:grid-cols-3">
              {cta.stats.map((stat) => (
                <div key={stat.label}>
                  <span className="block font-display text-[34px] font-bold leading-none text-white">
                    {stat.value}
                  </span>
                  <span className="mt-2 block font-ui text-[13.5px] tracking-[0.04em] text-[#a9c6bd]">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Page ───────────────────────────────────────────────────────────────── */

export function InspectionFormPage({
  content,
}: {
  content: InspectionFormContent;
}) {
  return (
    <main className="overflow-x-clip bg-white">
      <Hero hero={content.hero} />
      <TrustStrip trust={content.trust} />

      {/* Sticky-form band: the signup form stays pinned beside the content from
          "Skip the shop…" through the requirements section. */}
      <section id="signup" className="scroll-mt-24 bg-white">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-10">
          <div className="xl:grid xl:grid-cols-[minmax(0,1fr)_360px] xl:gap-12">
            <div className="min-w-0">
              {/* Form shown inline on smaller screens (no sticky sidebar there) */}
              <div className="pt-12 xl:hidden">
                <div className="mx-auto max-w-[560px]">
                  <InspectionSignupForm />
                </div>
              </div>
              <Reveal>
                <OnlineOption online={content.online} />
              </Reveal>
              <Reveal>
                <StateFormsTable {...content.states} embedded />
              </Reveal>
              <Reveal>
                <LocalPrep localPrep={content.localPrep} />
              </Reveal>
              <Reveal>
                <RequirementsAccordion {...content.requirements} embedded />
              </Reveal>
            </div>
            <div className="hidden xl:block">
              <div className="sticky top-28 py-14">
                <InspectionSignupForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Reveal>
        <Compare compare={content.compare} />
      </Reveal>
      <Reveal>
        <LocationTestimonials {...content.reviews} />
      </Reveal>
      <Reveal>
        <RideshareFaq title={content.faq.title} items={content.faq.items} />
      </Reveal>
      <Reveal>
        <FinalCta cta={content.cta} />
      </Reveal>
      <StickyCta label={content.hero.primaryCtaLabel} href={content.hero.primaryCtaHref} />
    </main>
  );
}
