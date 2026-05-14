import type { Metadata } from "next";

import { RideshareInspectionPage } from "@/app/(site)/components/rideshare/rideshare-inspection-page";
import { pageContent } from "@/app/(site)/uber-inspection/content";

export const metadata: Metadata = {
  title: "Uber Vehicle Inspection | Chex.AI",
  description:
    "Complete your Uber vehicle inspection online with Chex.AI. Same-day certification, no appointments needed.",
};

export default function UberInspectionPage() {
  return <RideshareInspectionPage content={pageContent} />;
}
