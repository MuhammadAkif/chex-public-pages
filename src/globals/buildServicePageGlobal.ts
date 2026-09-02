import type { Field, GlobalConfig } from 'payload'

import type { CommercialFleetContent } from '@/app/(site)/commercial-fleet-inspection-service/content'

/**
 * Builds a Payload global for a service page that uses the commercial-fleet
 * section components (Commercial Fleet, Insurance, …). Every such page shares
 * the exact field structure; only the slug/label and the seeded defaults
 * differ. Each global introduces its own `<slug_with_underscores>*` tables and
 * touches nothing else.
 */

const text = (
  name: string,
  defaultValue: string,
  opts: { admin?: { description?: string }; required?: boolean } = {},
): Field => ({
  name,
  type: 'text',
  defaultValue,
  ...opts,
})

const textarea = (name: string, defaultValue: string): Field => ({
  name,
  type: 'textarea',
  defaultValue,
})

const ctaGroup = (name: string, value: { label: string; href: string }): Field => ({
  name,
  type: 'group',
  fields: [text('label', value.label), text('href', value.href)],
})

const platformIconOptions = ['check', 'doc', 'shield', 'plate', 'chart', 'code'] as const
const benefitIconOptions = ['fast', 'cost', 'accuracy', 'experience', 'risk'] as const
const fleetFeatureIconOptions = ['onboard', 'api', 'condition'] as const

export function buildServicePageGlobal({
  slug,
  label,
  d,
}: {
  slug: string
  label: string
  d: CommercialFleetContent
}): GlobalConfig {
  return {
    slug,
    label,
    admin: { group: 'Site' },
    access: {
      read: () => true,
      update: () => true,
    },
    fields: [
      {
        name: 'meta',
        type: 'group',
        admin: { description: 'SEO metadata used by the App Router route metadata.' },
        fields: [text('title', d.meta.title), textarea('description', d.meta.description)],
      },
      {
        name: 'hero',
        type: 'group',
        fields: [
          text('rating', d.hero.rating),
          text('title', d.hero.title),
          textarea('description', d.hero.description),
          ctaGroup('primaryCta', d.hero.primaryCta),
          ctaGroup('secondaryCta', d.hero.secondaryCta),
          text('media', d.hero.media, {
            admin: { description: 'Hero video still / poster image URL.' },
          }),
        ],
      },
      {
        name: 'flow',
        type: 'group',
        label: 'Four steps',
        fields: [
          text('title', d.flow.title),
          textarea('description', d.flow.description),
          {
            name: 'steps',
            type: 'array',
            maxRows: 4,
            admin: { description: 'Icons are fixed by design order.' },
            fields: [
              text('number', ''),
              text('title', ''),
              textarea('description', ''),
              text('metricLabel', ''),
              text('metric', ''),
              { name: 'pills', type: 'array', fields: [text('text', '')] },
              // Deprecated: retained only so the dev-mode schema push stays
              // additive (avoids a destructive DROP of the legacy column).
              { name: 'step', type: 'text', admin: { hidden: true } },
            ],
          },
        ],
      },
      {
        name: 'platform',
        type: 'group',
        label: 'Platform features',
        fields: [
          text('title', d.platform.title),
          textarea('description', d.platform.description),
          {
            name: 'features',
            type: 'array',
            fields: [
              text('title', ''),
              textarea('description', ''),
              {
                name: 'icon',
                type: 'select',
                defaultValue: 'check',
                options: platformIconOptions.map((v) => ({ label: v, value: v })),
              },
              { name: 'highlighted', type: 'checkbox', defaultValue: false },
            ],
          },
        ],
      },
      {
        name: 'community',
        type: 'group',
        label: 'Community / trending / trusted',
        fields: [
          text('trendingTitle', d.community.trendingTitle),
          {
            name: 'stats',
            type: 'array',
            maxRows: 4,
            fields: [text('value', ''), text('label', '')],
          },
          text('inspectTitle', d.community.inspectTitle),
          text('inspectHighlight', d.community.inspectHighlight),
          text('manageTitle', d.community.manageTitle),
          {
            name: 'manageBullets',
            type: 'array',
            fields: [text('label', ''), textarea('text', '')],
          },
          text('manageImage', d.community.manageImage),
          textarea('manageBadge', d.community.manageBadge),
          text('trustedTitle', d.community.trustedTitle),
          {
            name: 'trustedLogos',
            type: 'array',
            fields: [text('label', '')],
          },
        ],
      },
      {
        name: 'howItWorks',
        type: 'group',
        fields: [
          text('title', d.howItWorks.title),
          textarea('description', d.howItWorks.description),
          {
            name: 'steps',
            type: 'array',
            maxRows: 4,
            fields: [text('step', ''), text('title', ''), textarea('description', ''), text('image', '')],
          },
        ],
      },
      {
        name: 'benefits',
        type: 'group',
        fields: [
          text('title', d.benefits.title),
          {
            name: 'items',
            type: 'array',
            fields: [
              text('title', ''),
              textarea('description', ''),
              {
                name: 'icon',
                type: 'select',
                defaultValue: 'fast',
                options: benefitIconOptions.map((v) => ({ label: v, value: v })),
              },
              { name: 'highlighted', type: 'checkbox', defaultValue: false },
              { name: 'wide', type: 'checkbox', defaultValue: false },
            ],
          },
        ],
      },
      {
        name: 'fleetOperators',
        type: 'group',
        label: 'Operators / insurers banner',
        fields: [
          text('eyebrow', d.fleetOperators.eyebrow),
          text('title', d.fleetOperators.title),
          textarea('description', d.fleetOperators.description),
          ctaGroup('primaryCta', d.fleetOperators.primaryCta),
          ctaGroup('secondaryCta', d.fleetOperators.secondaryCta),
          text('background', d.fleetOperators.background),
          {
            name: 'stats',
            type: 'array',
            maxRows: 3,
            fields: [text('value', ''), text('label', '')],
          },
          {
            name: 'features',
            type: 'array',
            maxRows: 3,
            admin: { description: 'Icons are fixed by design order (onboard / api / condition).' },
            fields: [
              {
                name: 'icon',
                type: 'select',
                defaultValue: 'onboard',
                options: fleetFeatureIconOptions.map((v) => ({ label: v, value: v })),
              },
              text('title', ''),
              textarea('description', ''),
            ],
          },
        ],
      },
      {
        name: 'testimonials',
        type: 'group',
        fields: [
          text('title', d.testimonials.title),
          textarea('description', d.testimonials.description),
          text('label', d.testimonials.label),
          {
            name: 'items',
            type: 'array',
            fields: [
              text('name', ''),
              textarea('quote', ''),
              { name: 'stars', type: 'number', defaultValue: 5 },
              text('avatar', '', { required: false }),
            ],
          },
        ],
      },
      {
        name: 'faq',
        type: 'group',
        fields: [
          text('title', d.faq.title),
          textarea('description', d.faq.description),
          {
            name: 'items',
            type: 'array',
            fields: [text('question', ''), textarea('answer', '')],
          },
        ],
      },
      {
        name: 'cta',
        type: 'group',
        fields: [
          text('title', d.cta.title),
          textarea('description', d.cta.description),
          ctaGroup('primaryCta', d.cta.primaryCta),
          ctaGroup('secondaryCta', d.cta.secondaryCta),
          text('note', d.cta.note),
          text('background', d.cta.background),
        ],
      },
    ],
  }
}
