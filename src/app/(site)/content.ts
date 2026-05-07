export const siteContent = {
  announcement: "4.8 stars · 50k+ drivers approved · Uber & Lyft accepted",
  navigationLinks: [
    { label: "Home", href: "/home", active: true },
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
    { label: "Blog", href: "/blogs" },
    { label: "Contact us", href: "/contact-us" },
  ],
  logo: "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/logo-chex.png",
  footer: {
    description:
      "Chex.AI is a licensed vehicle inspection solution and damage detection platform using AI. Our automated workflows simplify and expedite driver acquisition.",
    menuTitle: "Menu",
    menuItems: [
      "Home",
      "Rideshare Inspections",
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
