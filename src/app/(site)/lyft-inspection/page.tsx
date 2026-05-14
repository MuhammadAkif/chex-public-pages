import type { Metadata } from "next";

import { RideshareInspectionPage } from "@/app/(site)/components/rideshare/rideshare-inspection-page";
import { pageContent } from "@/app/(site)/lyft-inspection/content";

export const metadata: Metadata = {
  title: "Lyft Vehicle Inspection | Chex.AI",
  description:
    "Complete your Lyft vehicle inspection online with Chex.AI. Same-day certification, no appointments needed.",
};

export default function LyftInspectionPage() {
  return <RideshareInspectionPage content={pageContent} />;
}
