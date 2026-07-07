import type { Field, GlobalConfig } from 'payload'

/**
 * Pairs a Payload media `upload` relationship with a `*FallbackUrl` text field.
 * The frontend prefers the relationship and falls back to the URL — matches the
 * migration-shim convention used by ServicePage / HomePage / LandingPage.
 */
const mediaFields = (name: string, label: string): Field[] => [
  {
    name,
    type: 'upload',
    admin: {
      description: `${label} selected from the Payload media library.`,
    },
    label,
    relationTo: 'media',
  },
  {
    name: `${name}FallbackUrl`,
    type: 'text',
    admin: {
      description:
        'Migration fallback URL. The frontend prefers the media relationship when it is present.',
    },
    label: `${label} fallback URL`,
  },
]

const textItemField = (name = 'text', label = 'Text'): Field => ({
  name,
  type: 'textarea',
  label,
  required: true,
})

const stateStatusField = (name: 'uber' | 'lyft'): Field => ({
  name,
  type: 'select',
  defaultValue: 'none',
  options: [
    { label: 'Downloadable form', value: 'form' },
    { label: 'Not required', value: 'none' },
    { label: 'See note', value: 'note' },
  ],
  required: true,
})

export const InspectionFormPage: GlobalConfig = {
  slug: 'inspection-form-page',
  label: 'Inspection Form Page',
  admin: {
    group: 'Site',
  },
  access: {
    read: () => true,
    update: () => true,
  },
  fields: [
    {
      name: 'meta',
      type: 'group',
      admin: {
        description: 'SEO metadata used by the App Router route metadata.',
      },
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea', required: true },
      ],
    },
    {
      name: 'hero',
      type: 'group',
      fields: [
        { name: 'eyebrow', type: 'text', required: true },
        { name: 'titleLead', type: 'text', required: true },
        { name: 'titleHighlight', type: 'text', required: true },
        { name: 'description', type: 'textarea', required: true },
        { name: 'primaryCtaLabel', type: 'text', required: true },
        { name: 'primaryCtaHref', type: 'text', required: true },
        { name: 'secondaryCtaLabel', type: 'text', required: true },
        { name: 'secondaryCtaHref', type: 'text', required: true },
        { name: 'note', type: 'text', required: true },
        ...mediaFields('image', 'Hero image'),
        { name: 'imageAlt', type: 'text', required: true },
      ],
    },
    {
      name: 'trust',
      type: 'group',
      fields: [
        { name: 'title', type: 'text', required: true },
        {
          name: 'logos',
          type: 'array',
          fields: [
            ...mediaFields('image', 'Logo image'),
            { name: 'alt', type: 'text', required: true },
            {
              name: 'className',
              type: 'text',
              admin: {
                description:
                  'Optional Tailwind size override for this single logo (e.g. "h-14 sm:h-16"). Leave blank for the default size.',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'online',
      type: 'group',
      fields: [
        { name: 'eyebrow', type: 'text', required: true },
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea', required: true },
        { name: 'ctaLabel', type: 'text', required: true },
        { name: 'ctaHref', type: 'text', required: true },
        ...mediaFields('image', 'Online section image'),
        { name: 'imageAlt', type: 'text', required: true },
        {
          name: 'steps',
          type: 'array',
          fields: [
            { name: 'title', type: 'text', required: true },
            { name: 'description', type: 'textarea', required: true },
          ],
        },
      ],
    },
    {
      name: 'localPrep',
      type: 'group',
      fields: [
        { name: 'eyebrow', type: 'text', required: true },
        { name: 'title', type: 'text', required: true },
        {
          name: 'paragraphs',
          type: 'array',
          fields: [textItemField()],
        },
        { name: 'ctaLabel', type: 'text', required: true },
        { name: 'ctaHref', type: 'text', required: true },
        { name: 'panelTitle', type: 'text', required: true },
        {
          name: 'panelItems',
          type: 'array',
          fields: [textItemField()],
        },
      ],
    },
    {
      name: 'requirements',
      type: 'group',
      fields: [
        { name: 'eyebrow', type: 'text', required: true },
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea', required: true },
        {
          name: 'groups',
          type: 'array',
          fields: [
            { name: 'title', type: 'text', required: true },
            { name: 'intro', type: 'textarea' },
            {
              name: 'twoColumn',
              type: 'checkbox',
              defaultValue: false,
            },
            {
              name: 'bullets',
              type: 'array',
              fields: [textItemField()],
            },
          ],
        },
      ],
    },
    {
      name: 'states',
      type: 'group',
      fields: [
        { name: 'eyebrow', type: 'text', required: true },
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea', required: true },
        { name: 'ctaHref', type: 'text', required: true },
        { name: 'footnote', type: 'textarea', required: true },
        {
          name: 'rows',
          type: 'array',
          fields: [
            { name: 'name', type: 'text', required: true },
            stateStatusField('uber'),
            stateStatusField('lyft'),
            { name: 'note', type: 'text' },
          ],
        },
      ],
    },
    {
      name: 'compare',
      type: 'group',
      fields: [
        { name: 'eyebrow', type: 'text', required: true },
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea', required: true },
        { name: 'ctaLabel', type: 'text', required: true },
        { name: 'ctaHref', type: 'text', required: true },
        {
          name: 'local',
          type: 'group',
          fields: [
            { name: 'tag', type: 'text', required: true },
            { name: 'title', type: 'text', required: true },
            {
              name: 'steps',
              type: 'array',
              fields: [textItemField()],
            },
            { name: 'foot', type: 'textarea', required: true },
          ],
        },
        {
          name: 'chex',
          type: 'group',
          fields: [
            { name: 'badge', type: 'text', required: true },
            { name: 'tag', type: 'text', required: true },
            { name: 'title', type: 'text', required: true },
            {
              name: 'steps',
              type: 'array',
              fields: [textItemField()],
            },
            { name: 'foot', type: 'textarea', required: true },
          ],
        },
      ],
    },
    {
      name: 'reviews',
      type: 'group',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea', required: true },
        { name: 'label', type: 'text', required: true },
        {
          name: 'items',
          type: 'array',
          fields: [
            { name: 'name', type: 'text', required: true },
            { name: 'quote', type: 'textarea', required: true },
            { name: 'stars', type: 'number', defaultValue: 5, required: true },
            { name: 'avatar', type: 'text' },
          ],
        },
      ],
    },
    {
      name: 'faq',
      type: 'group',
      fields: [
        { name: 'title', type: 'text', required: true },
        {
          name: 'items',
          type: 'array',
          fields: [
            { name: 'question', type: 'text', required: true },
            { name: 'answer', type: 'textarea', required: true },
          ],
        },
      ],
    },
    {
      name: 'cta',
      type: 'group',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea', required: true },
        { name: 'ctaLabel', type: 'text', required: true },
        { name: 'ctaHref', type: 'text', required: true },
        {
          name: 'stats',
          type: 'array',
          fields: [
            { name: 'value', type: 'text', required: true },
            { name: 'label', type: 'text', required: true },
          ],
        },
      ],
    },
  ],
}
