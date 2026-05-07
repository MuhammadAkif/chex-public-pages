"use client";

import { RegisterModalProvider } from "@/app/(site)/components/home/register-modal";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return <RegisterModalProvider>{children}</RegisterModalProvider>;
}
