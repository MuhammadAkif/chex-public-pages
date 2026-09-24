import type { Metadata } from "next";

import { Reveal } from "@/app/(site)/components/shared/reveal";
import { RequestDemoForm } from "./request-demo-form";

export const metadata: Metadata = {
  title: "Request a Demo",
  description:
    "See how Chex.AI can optimize your vehicle inspection process. Request a personalized demo and get started with same-day, AI-powered inspections.",
};

const benefits = [
  "Same-day inspections completed with the push of a button — no scheduled appointments.",
  "AI-powered damage detection that removes the need for expensive manual reviews.",
  "An all-in-one platform customized for rideshare, fleet, insurance, and rental workflows.",
];

export default function RequestDemoPage() {
  return (
    <div className="min-h-screen bg-white px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
      <div className="mx-auto grid max-w-[1160px] items-start gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Marketing column */}
        <Reveal variant="fade-up">
          <div className="lg:pt-6">
            <span className="font-ui text-[13px] font-semibold uppercase tracking-[0.14em] text-[#ff7a01]">
              Request a demo
            </span>
            <h1 className="mt-3 font-display text-[34px] font-bold leading-[1.1] tracking-[-0.02em] text-[#1b2f4b] sm:text-[42px]">
              See how your business can optimize the vehicle inspection process.
            </h1>
            <p className="mt-5 font-ui text-[16px] leading-7 text-[#41546e]">
              Chex.AI is an all-in-one solution customized for vehicle
              inspections. Our technology removes the need for scheduled
              appointments and expensive reviews — inspections are completed the
              same day by the push of a button.
            </p>

            <ul className="mt-8 space-y-4">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#fff1e3] text-[13px] font-bold text-[#ff7a01]">
                    ✓
                  </span>
                  <span className="font-ui text-[15px] leading-6 text-[#41546e]">
                    {benefit}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* Form column */}
        <Reveal variant="fade-up" delayMs={120}>
          <RequestDemoForm />
        </Reveal>
      </div>
    </div>
  );
}
