import type { Metadata } from "next";

import { InspectionFormPage } from "@/app/(site)/components/inspection-form/inspection-form-page";
import { pageContent } from "@/app/(site)/inspection-form/content";

export const metadata: Metadata = {
  title: "Uber & Lyft Vehicle Inspection Forms by State | Chex.AI",
  description:
    "Check your state's Uber or Lyft vehicle inspection requirement — or skip the printout and complete your inspection online with Chex.AI in about 30 minutes with same-day certification.",
};

export default function InspectionForm() {
  return <InspectionFormPage content={pageContent} />;
}
