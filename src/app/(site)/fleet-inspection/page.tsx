import type { Metadata } from "next";

import { FleetPage } from "@/app/(site)/components/fleet/fleet-page";
import { pageContent } from "@/app/(site)/fleet-inspection/content";

export const metadata: Metadata = {
  title: "Fleet & DSP Vehicle Inspection | Chex.AI",
  description:
    "Fleet & DSP vehicle damage detection and inspection management platform powered by Chex.AI.",
};

export default function FleetInspectionPage() {
  return <FleetPage content={pageContent} />;
}
