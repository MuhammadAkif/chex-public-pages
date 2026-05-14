import type { Metadata } from "next";

import { LegalPage } from "@/app/(site)/components/legal/legal-page";
import { pageContent } from "@/app/(site)/privacy-policy/content";

export const metadata: Metadata = {
  title: "Privacy Policy | Chex.AI",
  description: "Chex.AI Privacy Policy describing how Chex.AI collects, uses, and protects your information.",
};

export default function PrivacyPolicyPage() {
  return <LegalPage content={pageContent} />;
}
