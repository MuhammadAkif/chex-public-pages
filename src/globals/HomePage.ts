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

export const HomePage: GlobalConfig = {
  slug: 'home-page',
  label: 'Home Page',
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
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea', required: true },
      ],
    },
    {
      name: 'hero',
      type: 'group',
      fields: [
        { name: 'ratingText', type: 'text', required: true },
        { name: 'titleAccent', type: 'text', required: true },
        { name: 'title', type: 'text', required: true },
        {
          name: 'description',
          type: 'textarea',
          admin: { description: 'Supports inline <strong> for accent words.' },
          required: true,
        },
        { name: 'buttonLabel', type: 'text', required: true },
        ...mediaFields('image', 'Hero image'),
        ...mediaFields('backgroundVideo', 'Hero background video (mp4)'),
      ],
    },
    {
      name: 'trusted',
      type: 'group',
      fields: [
        { name: 'title', type: 'text', required: true },
        {
          name: 'logos',
          type: 'array',
          fields: [...mediaFields('image', 'Logo image'), { name: 'label', type: 'text', required: true }],
        },
      ],
    },
    {
      name: 'transform',
      type: 'group',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea', required: true },
        ...mediaFields('image', 'Transform image'),
        {
          name: 'features',
          type: 'array',
          fields: [
            { name: 'title', type: 'text', required: true },
            { name: 'description', type: 'textarea', required: true },
          ],
        },
      ],
    },
    {
      name: 'solutions',
      type: 'group',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea', required: true },
        {
          name: 'blocks',
          type: 'array',
          fields: [
            { name: 'label', type: 'text', required: true },
            { name: 'title', type: 'text', required: true },
            {
              name: 'description',
              type: 'textarea',
              admin: { description: 'Supports inline <strong> for accent words.' },
              required: true,
            },
            { name: 'bullets', type: 'array', fields: [textItemField()] },
            { name: 'buttonLabel', type: 'text', required: true },
            ...mediaFields('image', 'Block illustration'),
            {
              name: 'variant',
              type: 'select',
              defaultValue: 'card-light',
              options: [
                { label: 'Full-bleed image', value: 'full' },
                { label: 'Light card', value: 'card-light' },
                { label: 'Peach card', value: 'card-peach' },
              ],
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'testimonials',
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
      name: 'achievements',
      type: 'group',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea', required: true },
        ...mediaFields('backgroundImage', 'Background image'),
        {
          name: 'stats',
          type: 'array',
          fields: [
            { name: 'value', type: 'text', required: true },
            { name: 'label', type: 'text', required: true },
          ],
        },
        { name: 'note', type: 'textarea', required: true },
        { name: 'buttonLabel', type: 'text', required: true },
      ],
    },
    {
      name: 'inspect',
      type: 'group',
      fields: [
        { name: 'eyebrow', type: 'text', required: true },
        { name: 'titleAccentA', type: 'text', required: true },
        { name: 'titleMid', type: 'text', required: true },
        { name: 'titleAccentB', type: 'text', required: true },
        { name: 'titleTail', type: 'text', required: true },
        { name: 'subtitle', type: 'text', required: true },
        { name: 'description', type: 'textarea', required: true },
        { name: 'buttonLabel', type: 'text', required: true },
        {
          name: 'testimonial',
          type: 'group',
          fields: [
            { name: 'name', type: 'text', required: true },
            { name: 'quote', type: 'textarea', required: true },
            { name: 'role', type: 'text', required: true },
            ...mediaFields('image', 'Testimonial photo'),
          ],
        },
      ],
    },
    {
      name: 'articles',
      type: 'group',
      fields: [
        { name: 'eyebrow', type: 'text', required: true },
        { name: 'title', type: 'text', required: true },
        {
          name: 'items',
          type: 'array',
          fields: [
            { name: 'tag', type: 'text', required: true },
            { name: 'title', type: 'text', required: true },
            ...mediaFields('image', 'Article image'),
            { name: 'href', type: 'text' },
          ],
        },
      ],
    },
  ],
}
