export const siteContent = {
  announcement: "4.8 stars · 50k+ drivers approved · $5M+ saved in Inspection costs",
  navigationLinks: [
    { label: "Home", href: "/", active: true },
    {
      label: "Services",
      href: "/rideshare-inspection-service",
      children: [
        { label: "Rideshare Inspection", href: "/rideshare-inspection-service" },
        { label: "Commercial Fleet Inspections", href: "#", comingSoon: true },
        { label: "Insurance", href: "#", comingSoon: true },
        { label: "Rental Car Companies", href: "#", comingSoon: true },
        { label: "Towing & Valet Services", href: "#", comingSoon: true },
      ],
    },
    { label: "Blog", href: "/blogs" },
    { label: "Contact us", href: "/contact-us" },
  ],
  logo: "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/logo-chex.png",
  footer: {
    description:
      "Chex.AI is a licensed vehicle inspection solution and damage detection platform using AI. Our automated workflows simplify and expedite driver acquisition.",
    menuTitle: "Menu",
    menuItems: [
      { label: "Home", href: "/" },
      { label: "Contact us", href: "/contact-us" },
      { label: "Blog", href: "/blogs" },
    ],
    servicesTitle: "Services",
    servicesItems: [
      { label: "Rideshare Inspection", href: "/ride-share" },
      { label: "Fleet & DSP Inspections", href: "/fleet-inspection" },
      { label: "Uber Inspection", href: "/uber-inspection" },
      { label: "Lyft Inspection", href: "/lyft-inspection" },
    ],
    contactTitle: "Contact us",
    contactItems: [
      { label: "support@chex.ai", href: "mailto:support@chex.ai" },
      { label: "Contact us", href: "/contact-us" },
      { label: "Terms of Use", href: "/terms-of-use" },
      { label: "Privacy Policy", href: "/privacy-policy" },
    ],
    copyright: "© 2026 CHEX.AI All Rights Reserved",
  },
} as const;
