import type { Metadata } from "next";

import { InspectionFormPage } from "@/app/(site)/components/inspection-form/inspection-form-page";
import { getInspectionFormPage } from "@/app/(site)/inspection-form/payload";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const { metadata } = await getInspectionFormPage();
  return metadata;
}

export default async function InspectionForm() {
  const { content } = await getInspectionFormPage();
  return <InspectionFormPage content={content} />;
}
