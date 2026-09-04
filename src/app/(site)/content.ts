export const siteContent = {
  announcement: "4.8 stars · 50k+ drivers approved · $5M+ saved in Inspection costs",
  navigationLinks: [
    { label: "Home", href: "/", active: true },
    {
      label: "Services",
      href: "/rideshare-inspection-service",
      children: [
        { label: "Rideshare Inspection", href: "/rideshare-inspection-service", icon: "car" },
        { label: "Commercial Fleet Inspections", href: "/commercial-fleet-inspection-service", icon: "truck" },
        { label: "Insurance", href: "/insurance-inspection-service", icon: "shield" },
        { label: "Rental Car Companies", href: "/rental-inspection-service", icon: "key" },
        { label: "Towing & Valet Services", href: "/towing-valet-inspection-service", icon: "clipboard" },
      ],
    },
    // "Areas we serve" is temporarily hidden from the navbar. Restore this
    // entry to re-enable the locations dropdown.
    // {
    //   label: "Areas we serve",
    //   href: "#",
    //   children: [
    //     { label: "Alabama", href: "/locations/alabama" },
    //     { label: "Arizona", href: "/locations/arizona" },
    //     { label: "Arkansas", href: "/locations/arkansas" },
    //     { label: "California", href: "/locations/california" },
    //     { label: "Colorado", href: "/locations/colorado" },
    //     { label: "Iowa", href: "/locations/iowa" },
    //     { label: "Nebraska", href: "/locations/nebraska" },
    //     { label: "Nevada", href: "/locations/nevada" },
    //     { label: "New Mexico", href: "/locations/new-mexico" },
    //     { label: "Ohio", href: "/locations/ohio" },
    //     { label: "South Carolina", href: "/locations/south-carolina" },
    //   ],
    // },
    {
      label: "Pricing",
      href: "/dsp-fleet-pricing",
      children: [
        { label: "Rideshare Pricing", href: "/rideshare-pricing" },
        { label: "Commercial Fleet pricing", href: "/dsp-fleet-pricing" },
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
      { label: "Inspection Form", href: "/inspection-form" },
      { label: "Rideshare Pricing", href: "/rideshare-pricing" },
      { label: "Commercial Fleet pricing", href: "/dsp-fleet-pricing" },
      { label: "Contact us", href: "/contact-us" },
      { label: "Blog", href: "/blogs" },
    ],
    servicesTitle: "Services",
    servicesItems: [
      { label: "Rideshare Inspection", href: "/rideshare-inspection-service" },
      { label: "Commercial Fleet Inspections", href: "/commercial-fleet-inspection-service" },
      { label: "Insurance", href: "/insurance-inspection-service" },
      { label: "Rental Car Companies", href: "/rental-inspection-service" },
      { label: "Towing & Valet Services", href: "/towing-valet-inspection-service" },
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
