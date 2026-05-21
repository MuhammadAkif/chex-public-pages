import type { Metadata } from "next";

import { ContactUsForm } from "./contact-us-form";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact Chex.AI for help with vehicle inspections, rideshare inspection support, or fleet inspection workflows.",
};

export default function ContactUsPage() {
  return (
    <div className="min-h-screen bg-white px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-[760px]">
        <h1 className="text-center font-display text-[36px] font-bold tracking-[-0.02em] text-[#1b2f4b] sm:text-[44px]">
          Contact Us
        </h1>

        <ContactUsForm />
      </div>
    </div>
  );
}
