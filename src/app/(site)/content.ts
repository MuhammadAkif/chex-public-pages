export const siteContent = {
  announcement: "4.8 stars · 50k+ drivers approved · Uber & Lyft accepted",
  navigationLinks: [
    { label: "Home", href: "/home", active: true },
    { label: "Services", href: "/home#how-it-works" },
    { label: "Blog", href: "/home#case-studies" },
    { label: "Contact us", href: "/home#footer" },
    { label: "Dashboard", href: "/home#business-help" },
  ],
  logo: "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/logo-chex.png",
  footer: {
    description:
      "Chex.AI is a licensed vehicle inspection solution and damage detection platform using AI. Our automated workflows simplify and expedite driver acquisition.",
    menuTitle: "Menu",
    menuItems: [
      "Home",
      "Rideshare Inspections",
      "Fleet & DSP Inspections",
      "Blog",
    ],
    contactTitle: "Contact us",
    contactItems: [
      "support@chex.ai",
      "Terms of use",
      "Privacy Policy",
      "Contact us",
    ],
    socialItems: ["Twitter", "LinkedIn", "GitHub"],
    copyright: "© 2026 CHEX.AI All Rights Reserved",
  },
} as const;
