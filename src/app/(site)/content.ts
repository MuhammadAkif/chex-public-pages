export const siteContent = {
  announcement: "4.8 stars · 50k+ drivers approved · Uber & Lyft accepted",
  navigationLinks: [
    { label: "Home", href: "/", active: true },
    {
      label: "Areas we serve",
      href: "#",
      children: [
        { label: "Alabama", href: "/locations/alabama" },
        { label: "Arizona", href: "/locations/arizona" },
        { label: "Arkansas", href: "/locations/arkansas" },
        { label: "California", href: "/locations/california" },
        { label: "Colorado", href: "/locations/colorado" },
        { label: "Iowa", href: "/locations/iowa" },
        { label: "Nebraska", href: "/locations/nebraska" },
        { label: "Nevada", href: "/locations/nevada" },
        { label: "New Mexico", href: "/locations/new-mexico" },
        { label: "Ohio", href: "/locations/ohio" },
        { label: "South Carolina", href: "/locations/south-carolina" },
      ],
    },
    { label: "Landing Page", href: "/landing-page" },
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
