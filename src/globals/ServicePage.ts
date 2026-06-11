import type { Field, GlobalConfig } from 'payload'

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

export const ServicePage: GlobalConfig = {
  slug: 'service-page',
  label: 'Rideshare Inspection Service',
  admin: {
    group: 'Site',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'meta',
      type: 'group',
      admin: {
        description: 'SEO metadata used by the App Router route metadata.',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
      ],
    },
    {
      name: 'hero',
      type: 'group',
      fields: [
        {
          name: 'rating',
          type: 'text',
          required: true,
        },
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
        {
          name: 'secondaryLabel',
          type: 'text',
          required: true,
        },
        ...mediaFields('media', 'Hero media (image or video)'),
      ],
    },
    {
      name: 'community',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'subtitle',
          type: 'textarea',
          required: true,
        },
        {
          name: 'stats',
          type: 'array',
          fields: [
            {
              name: 'value',
              type: 'text',
              required: true,
            },
            {
              name: 'label',
              type: 'text',
              required: true,
            },
            {
              name: 'tone',
              type: 'text',
              required: true,
            },
          ],
        },
        {
          name: 'manageTitle',
          type: 'text',
          required: true,
        },
        {
          name: 'manageBullets',
          type: 'array',
          fields: [textItemField()],
        },
        ...mediaFields('manageImage', 'Manage section image'),
        {
          name: 'trustedTitle',
          type: 'text',
          required: true,
        },
        {
          name: 'trustedLogos',
          type: 'array',
          fields: [
            ...mediaFields('image', 'Logo image'),
            {
              name: 'label',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'howItWorks',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
        {
          name: 'steps',
          type: 'array',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            {
              name: 'description',
              type: 'textarea',
              required: true,
            },
            ...mediaFields('image', 'Step image'),
          ],
        },
      ],
    },
    {
      name: 'benefits',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'items',
          type: 'array',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            {
              name: 'description',
              type: 'textarea',
              required: true,
            },
            {
              name: 'tone',
              type: 'text',
              required: true,
            },
            {
              name: 'icon',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'keyDifferentiators',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'items',
          type: 'array',
          fields: [textItemField()],
        },
        ...mediaFields('image', 'Key differentiators image'),
      ],
    },
    {
      name: 'businessHelp',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
        {
          name: 'buttonLabel',
          type: 'text',
          required: true,
        },
        ...mediaFields('image', 'Business help image'),
      ],
    },
    {
      name: 'caseStudies',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'items',
          type: 'array',
          fields: [
            {
              name: 'metric',
              type: 'text',
              required: true,
            },
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            {
              name: 'description',
              type: 'textarea',
              required: true,
            },
            ...mediaFields('image', 'Case study image'),
            {
              name: 'caption',
              type: 'text',
            },
          ],
        },
        ...mediaFields('arrowImage', 'Case studies arrow image'),
      ],
    },
    {
      name: 'testimonials',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'items',
          type: 'array',
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
            },
            {
              name: 'quote',
              type: 'textarea',
              required: true,
            },
            {
              name: 'stars',
              type: 'number',
              defaultValue: 5,
              required: true,
            },
            {
              name: 'avatar',
              type: 'text',
            },
          ],
        },
      ],
    },
    {
      name: 'cta',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
        {
          name: 'secondaryLabel',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}
