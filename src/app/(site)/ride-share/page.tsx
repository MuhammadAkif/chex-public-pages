import type { Metadata } from "next";

import { RideshareInspectionPage } from "@/app/(site)/components/rideshare/rideshare-inspection-page";
import { pageContent } from "@/app/(site)/ride-share/content";

export const metadata: Metadata = {
  title: "Ride-share Vehicle Inspection | Chex.AI",
  description:
    "Online vehicle inspection platform for rideshare drivers. Same-day certification, no appointments needed.",
};

export default function RideSharePage() {
  return <RideshareInspectionPage content={pageContent} />;
}
