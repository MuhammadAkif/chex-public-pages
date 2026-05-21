import type { Metadata } from "next";
import { Manrope, Poppins } from "next/font/google";
import localFont from "next/font/local";
import type { ReactNode } from "react";

import { MarketingScripts } from "./marketing-scripts";
import "./globals.css";

const getSiteUrl = () => {
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

  if (
    !serverUrl ||
    (process.env.NODE_ENV === "production" &&
      (serverUrl.includes("localhost") || serverUrl.includes("127.0.0.1")))
  ) {
    return "https://chex.ai";
  }

  return serverUrl;
};

const satoshi = localFont({
  src: [
    {
      path: "./fonts/satoshi-400.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/satoshi-500.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/satoshi-700.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-satoshi",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["400", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "Chex.AI Vehicle Inspections",
    template: "%s | Chex.AI",
  },
  description:
    "Chex.AI provides fast, AI-assisted vehicle inspections for rideshare drivers, fleets, and delivery service providers.",
  robots: {
    follow: true,
    index: true,
  },
  verification: {
    google: "1ZnrPxvD-qLyi-lk6uKoW-Ot1A_6qjXHNhEbi9twDQM",
  },
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <MarketingScripts />
      </head>
      <body
        className={`${satoshi.variable} ${poppins.variable} ${manrope.variable} bg-mist font-body text-ink antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
