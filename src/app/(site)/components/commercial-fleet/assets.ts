/**
 * Static design assets for the Commercial Fleet Inspection service page.
 *
 * Every file was exported from the Figma "Chex.ai Revamp" design
 * (node 2657-5127) and lives under `public/commercial-fleet/`. Photographic
 * images and multi-part decorative SVGs are referenced here so the section
 * components can stay focused on layout. Editable text/media is sourced from
 * the `commercial-fleet-page` Payload global instead — see `../../commercial-fleet-inspection-service/payload.ts`.
 */

const base = '/commercial-fleet'

export const fleetAssets = {
  // Hero
  heroVideoPoster: `${base}/3ba442eb827e222ce951bd45a0b2e52d6e16ac5a.png`, // truck inspection still (image 5)
  ratingAvatarRing: `${base}/d6344387d6d848707e23c04ae546ac6cd4ff884b.svg`, // peach ellipse ring
  ratingAvatar: `${base}/4d801096d605b8e726b6407b987d4cfb1e1b5796.png`, // reviewer avatar

  // "Four steps…" flow icons (white glyph on blue badge, 24px)
  flowIcons: [
    `${base}/bfda71429efd0cb09e46b895ce9256b41b2c9a62.svg`, // Tell us your platform
    `${base}/775a295e9b5ee9e945efbba9c44f696891366e4e.svg`, // Capture the guided walkaround
    `${base}/bcc2d0beae9bc6214337587c637b313ec640b3d8.svg`, // AI inspects, a human verifies
    `${base}/a5c99240b3cb77fccf9f7579b0fbc11d8c68b8d7.svg`, // Certificate, same day
  ],
  flowPillCheck: `${base}/7b4725958593a456ec075ef5d462256e46ccbbd1.svg`, // blue check in pills

  // DVIR / platform six-card glyphs (rendered inside a coloured badge)
  platformGlyphs: {
    check: `${base}/35372658f5f6f1d2b9a83eabc1b1099ad450685a.svg`, // 163-part detection (blue on white)
    doc: `${base}/364af797732db1c4d3e6933a0d7abea37a564b20.svg`, // eDVIR & DOT compliance
    shield: `${base}/331dfa80ff490ce9dc3b729098698da5171d33de.svg`, // Fraud & tamper detection
    plate: `${base}/d72020497b88cebd9a610875090bd4a53f9d3afa.svg`, // Auto VIN, plate & odometer
    chart: `${base}/add1d239abb3d5e523bf37a2f46efc62b0c0646b.svg`, // Real-time fleet dashboard
    code: `${base}/08be6be9a939c76a5abacae0fa1a9fdf51a6f60f.svg`, // API & telematics integration
  },

  // Shared abstract gradient (trusted card + CTA background)
  gradientBackdrop: `${base}/e6f8b26ad7224dbe8d69c22da29e32143ec9fc30.png`,

  // Dark "manage & inspect" card
  managePreview: `${base}/b1d7b5685868d2762573f486d2fec142a606e556.png`, // dashboard/inspection still
  manageBulletIcon: `${base}/182eb949fe25811d9a91c143cd232dd8fae8983c.svg`, // orange check bullet
  manageBadgeRing: `${base}/9d764bb74aa65a7f05241532351e26c265e4575e.svg`, // thin orange ring
  manageBadgeSeal: `${base}/c2c685ae6c9fd00132655d9f71b2ed938dfd6ec4.svg`, // scalloped orange verified seal
  manageBadgeCheck: `${base}/29ce8801acd70ceab0e0e201fd196113915f3566.svg`, // white check glyph

  // "How it works" phone mock-ups (masked by the phone-shape SVG)
  phoneMask: `${base}/ef3c9729ca3c0864fbc989d0bde58d54e6bbd405.svg`,
  phoneShots: [
    `${base}/0f814ad6bd4775a47d46bd3d74adb743c7054299.png`, // Login
    `${base}/37a478a44aa2d49d38f49e889be80d330e7ff61d.png`, // Vehicle Inspection
    `${base}/e0101486936bcb5f21f13f9a0642e8312b08c000.png`, // Inspection Reviewed
  ],

  // "Running 50 cars or 5,000?" fleet-operators section
  fleetOperators: {
    background: `${base}/34a0caa8752cac8f84aaca8dc1a482a4eb18193f.png`, // fleet lot at sunset
    lock: `${base}/c5e07309409cb1f57a5886b78610814983d1cf2d.svg`, // eyebrow lock icon
    featureIcons: {
      onboard: `${base}/d2a6e73fff90cc6da3ffbe6d9cb563c99b77fb30.svg`,
      api: `${base}/c3d0c81dc715ffdb13338c9d2723639fe0ae5fb9.svg`,
      condition: `${base}/4693f56171307f6d38844c10b49d7460bbc90753.svg`,
    },
  },

  // "Benefits we propose" icons (PNG line icons)
  benefitIcons: {
    fast: `${base}/benefit-fast.svg`, // Fast and convenient (assembled Figma stopwatch)
    cost: `${base}/357484120620e107bfc9ba0184fb3c92aa7913be.png`, // Cost-effective (graph)
    accuracy: `${base}/6144fbd614ac8db18615a5b02a00326c02bf6057.png`, // Increased accuracy (goal)
    experience: `${base}/d9616a1a9a667a66a55576a42fe474819384bc39.png`, // Improved customer experience (rating)
    risk: `${base}/5944b42e825d7f8c9f2b81579bae8316471ae5c8.png`, // Better risk management (measurement)
  },
} as const

export type PlatformGlyph = keyof typeof fleetAssets.platformGlyphs
export type BenefitIconKey = keyof typeof fleetAssets.benefitIcons
export type FleetFeatureIconKey = keyof typeof fleetAssets.fleetOperators.featureIcons
