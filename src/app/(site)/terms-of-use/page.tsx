import type { Metadata } from "next";

import { LegalPage } from "@/app/(site)/components/legal/legal-page";
import { pageContent } from "@/app/(site)/terms-of-use/content";

export const metadata: Metadata = {
  title: "Terms of Use | Chex.AI",
  description: "Chex.AI Terms of Use governing your access to and use of the Chex.AI sites and services.",
};

export default function TermsOfUsePage() {
  return <LegalPage content={pageContent} />;
}
