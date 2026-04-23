import analyticsDashboard from '@/app/(site)/assets/home/analytics-dashboard.png'
import arrowCircle from '@/app/(site)/assets/home/arrow-circle.png'
import caseAccuracy from '@/app/(site)/assets/home/case-accuracy.png'
import caseCoverage from '@/app/(site)/assets/home/case-coverage.png'
import caseDetection from '@/app/(site)/assets/home/case-detection.png'
import caseGrowth from '@/app/(site)/assets/home/case-growth.png'
import caseReliability from '@/app/(site)/assets/home/case-reliability.png'
import heroVan from '@/app/(site)/assets/home/hero-van.png'
import keyDifferentiators from '@/app/(site)/assets/home/key-differentiators.png'
import logoAdroit from '@/app/(site)/assets/home/logo-adroit.png'
import logoCarepool from '@/app/(site)/assets/home/logo-carepool.png'
import logoOxo from '@/app/(site)/assets/home/logo-oxo.png'
import logoZum from '@/app/(site)/assets/home/logo-zum.png'
import manageInspection from '@/app/(site)/assets/home/manage-inspection.png'

export const homeContent = {
  hero: {
    rating: '4.9 (1667+ reviews)',
    title: 'AI powered vehicle safety inspection & damage detection',
    description:
      "CHEX.AI's Car Damage Recognition is an advanced AI solution that instantly detects dents, scratches, and body defects in vehicles using smartphone photos.",
    primaryLabel: 'Register your inspection today',
    secondaryLabel: 'Request a demo',
    helperText: 'No Credit Card Required',
    media: heroVan,
  },
  community: {
    title: 'Our Community of Chex.AI is Trending Fast',
    subtitle:
      'Our AI based solution simplifies vehicle inspections and automates damage documentation for the mobility industry',
    stats: [
      { value: '1000+', label: 'Customers', tone: 'sky' },
      { value: '5+', label: 'Years of Experience', tone: 'sand' },
      { value: '20+', label: 'Companies', tone: 'ice' },
    ],
    manageTitle: 'You can manage & inspect your car online',
    manageBullets: [
      'A Chex Verified Ecosystem interconnecting all of the various stakeholders',
      'User-friendly app and comprehensive dashboard',
      'Powered by advanced AI, allowing for real-time reporting on every inspected vehicle',
      'AI based reviews for pinpoint damage and safety items reporting',
    ],
    manageImage: manageInspection,
    trustedTitle: 'Trusted by brands that refuse to compromise on customer experience',
    trustedLogos: [
      { image: logoAdroit, label: 'Adroit' },
      { image: logoOxo, label: 'OXO' },
      { image: logoCarepool, label: 'Carepool' },
      { image: logoZum, label: 'Zum' },
      { image: logoAdroit, label: 'Adroit repeat' },
    ],
  },
  howItWorks: {
    title: 'How it works',
    description:
      'With a user-friendly app and comprehensive dashboard, Chex.AI streamlines inspection reviews and provides detailed insights, enhancing operational efficiency',
    steps: [
      {
        title: 'Capture guided evidence',
        description:
          'Scalable photo and video collection through a customizable mobile and web inspection flow.',
        image: heroVan,
      },
      {
        title: 'Review every inspection',
        description:
          'Partner dashboards provide real-time inspection access, compliance records, and advanced analytics.',
        image: manageInspection,
      },
      {
        title: 'Surface AI findings',
        description:
          'AI-based reviews pinpoint damage, safety items, and newly detected issues in one workflow.',
        image: analyticsDashboard,
      },
    ],
  },
  benefits: {
    title: 'Benefits we propose',
    items: [
      {
        title: 'Fast and convenient',
        description:
          "Chex.AI's Inspection solution modernizes operations and is easy to use",
        tone: 'accent',
        icon: 'spark',
      },
      {
        title: 'Cost-effective',
        description:
          'We provide the best service at a lower cost when compared to competition',
        tone: 'muted',
        icon: 'cost',
      },
      {
        title: 'Increased accuracy',
        description:
          'High accuracy levels and advanced machine vision technology to accurately pinpoint the damage',
        tone: 'muted',
        icon: 'target',
      },
      {
        title: 'Improved customer experience',
        description:
          'With Easy To Follow Guidelines Provided In App, customers can complete inspection in minutes',
        tone: 'muted',
        icon: 'people',
      },
      {
        title: 'Better risk management',
        description:
          'Visibility allows for strategic loss mitigation, allowing partners to higher profitability',
        tone: 'muted',
        icon: 'shield',
      },
    ],
  },
  keyDifferentiators: {
    title: 'Key Differentiators',
    items: [
      'Easily integratable allowing businesses to perform and manage repeatable tasks.',
      'Mobile application with easy to use self inspection guide & tools for users.',
      'Highly scalable technology enabling businesses to expand quicker.',
      'Reduces business overhead & operations cost.',
    ],
    image: keyDifferentiators,
  },
  businessHelp: {
    title: 'How can we help your business?',
    description:
      'We can help your business optimize asset inspection process. Our interactive dashboard allows you to review data in real time and provide feedback to your customers instantaneously!',
    buttonLabel: 'Contact us',
    image: analyticsDashboard,
  },
  caseStudies: {
    title: 'Case Studies',
    items: [
      {
        metric: '98.5%',
        title: 'Accuracy',
        description:
          'Our AI-powered vehicle inspection system automatically detects and highlights visible damages such as dents, scratches, cracks, and broken parts from vehicle images.',
        image: caseAccuracy,
      },
      {
        metric: '95.3%',
        title: 'AI Detection',
        description:
          'The system inspects every side of the vehicle and detects damage on each body part individually by comparing current and previous inspections.',
        image: caseDetection,
      },
      {
        metric: '93.6%',
        title: 'Reliability',
        description:
          'Automated condition assessments give operations teams a dependable, repeatable decisioning baseline.',
        image: caseReliability,
      },
      {
        metric: '92.5%',
        title: 'Growth Rate',
        description:
          'Actionable inspection data creates smoother customer handoffs and supports higher program throughput.',
        image: caseGrowth,
      },
      {
        metric: '81.5%',
        title: 'Coverage',
        description:
          'Multi-angle inspection capture keeps more of the vehicle lifecycle visible across distributed fleets.',
        image: caseCoverage,
      },
    ],
    arrowImage: arrowCircle,
  },
  testimonials: {
    title: 'Feedback from our verified clients',
    description: 'We are happy when our customers are too.',
    label: 'What Our Client Say About Us?',
    items: [
      {
        name: 'Mousa Naseer',
        role: 'Regional Markets Executive',
        quote:
          'The app was easy to follow, the pictures showing what was required of me to take made it simple. Upload was fast. They responded quickly and had the inspection back within a half hour! Thank you. Well worth the money.',
        featured: true,
      },
      {
        name: 'Andressa Amorim',
        role: 'Regional Markets Executive',
        quote: 'Chexai was really easy to use, better than going to the mechanic!',
        featured: false,
      },
    ],
  },
  cta: {
    title: 'Ready to modernize your inspections?',
    description:
      'Join the hundreds of automotive brands leading the AI revolution. Start your risk-free 14-day trial today.',
    primaryLabel: 'Start free Inspection',
    secondaryLabel: 'Talk to an expert',
    helperText: 'No Credit Card Required, Cancel Anytime.',
  },
} as const
