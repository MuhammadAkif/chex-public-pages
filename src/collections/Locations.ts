import type { CollectionConfig, Field } from 'payload'

const classNameField = (name: string, label: string, defaultValue?: string): Field => ({
  name,
  type: 'text',
  admin: {
    description: 'Advanced layout/style override used by the existing location page components.',
  },
  defaultValue,
  label,
})

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

const DEFAULT_PAGE_CLASS_NAME =
  'bg-[linear-gradient(180deg,#ffffff_0%,#f0f6ff_8%,#ffffff_20%,#ffffff_100%)] text-[#1b2f4b]'
const DEFAULT_HERO_SECTION_CLASS_NAME =
  'bg-[linear-gradient(180deg,#ffffff_0%,#f0f6ff_100%)]'
const DEFAULT_HERO_LAYOUT_CLASS_NAME = 'lg:grid-cols-[0.98fr_1fr] lg:gap-14'
const DEFAULT_HERO_TITLE_CLASS_NAME =
  'max-w-[684px] font-display text-[36px] font-bold leading-[1.15] tracking-[-1.6px] sm:text-[40px]'
const DEFAULT_HERO_DESCRIPTION_CLASS_NAME = 'max-w-[672px]'
const DEFAULT_CASE_STUDIES_SECTION_CLASS_NAME =
  'bg-[#010e2b] px-4 py-16 text-white sm:px-6 lg:px-10 lg:py-20'
const DEFAULT_CASE_STUDIES_SCROLL_CLASS_NAME =
  'mt-14 overflow-x-auto pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
const DEFAULT_CASE_STUDIES_ARTICLE_CLASS_NAME =
  'group relative h-[485px] w-[320px] overflow-hidden rounded-[12px] border border-white sm:w-[388px]'
const DEFAULT_CASE_STUDIES_IMAGE_CLASS_NAME =
  'absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105'
const DEFAULT_CASE_STUDIES_ARROW_CLASS_NAME =
  'pointer-events-none absolute right-8 top-[43%] h-16 w-16 -rotate-90 object-contain opacity-95 sm:h-24 sm:w-24'
const DEFAULT_CASE_STUDIES_METRIC_CLASS_NAME =
  'font-display text-[54px] font-bold leading-[1.1] tracking-[-0.05em] sm:text-[64px]'
const DEFAULT_CASE_STUDIES_TITLE_CLASS_NAME = 'mt-1 font-display text-[28px] font-medium leading-[1.2]'
const DEFAULT_CASE_STUDIES_DESCRIPTION_CLASS_NAME = 'type-body-md mt-5 max-w-[21rem] text-white/92'

export const Locations: CollectionConfig = {
  slug: 'locations',
  admin: {
    defaultColumns: ['title', 'slug', '_status', 'updatedAt'],
    group: 'Site',
    useAsTitle: 'title',
  },
  access: {
    read: ({ req }) => {
      if (req.user) {
        return true
      }

      return {
        _status: {
          equals: 'published',
        },
      }
    },
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      admin: {
        description: 'Internal CMS title, usually the state name.',
      },
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      admin: {
        description: 'URL segment under /locations, for example "alabama".',
      },
      index: true,
      required: true,
      unique: true,
    },
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
      label: 'SEO metadata',
    },
    classNameField('pageClassName', 'Page class name', DEFAULT_PAGE_CLASS_NAME),
    {
      name: 'hero',
      type: 'group',
      fields: [
        {
          name: 'rating',
          type: 'text',
          required: true,
        },
        ...mediaFields('ratingBadgeImage', 'Rating badge image'),
        {
          name: 'googleReview',
          type: 'group',
          admin: {
            description: 'Google review widget content shown above the hero title.',
          },
          fields: [
            ...mediaFields('logo', 'Google logo'),
            {
              name: 'label',
              type: 'text',
              defaultValue: 'Google Rating',
              required: true,
            },
            {
              name: 'score',
              type: 'text',
              defaultValue: '4.8',
              required: true,
            },
            {
              name: 'stars',
              type: 'number',
              defaultValue: 5,
              min: 1,
              max: 5,
              required: true,
            },
            {
              name: 'reviewLinkLabel',
              type: 'text',
              defaultValue: 'See all our reviews',
              required: true,
            },
            {
              name: 'reviewLinkHref',
              type: 'text',
              required: true,
            },
          ],
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
          name: 'primaryLabel',
          type: 'text',
          required: true,
        },
        {
          name: 'secondaryLabel',
          type: 'text',
          required: true,
        },
        {
          name: 'helperText',
          type: 'text',
          required: true,
        },
        {
          name: 'demoHref',
          type: 'text',
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
          ],
          minRows: 1,
          required: true,
        },
        {
          name: 'locations',
          type: 'array',
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
            },
            ...mediaFields('image', 'Pin image'),
            {
              name: 'featured',
              type: 'checkbox',
              defaultValue: false,
            },
          ],
          minRows: 1,
          required: true,
        },
        {
          name: 'style',
          type: 'group',
          admin: {
            description: 'Advanced hero layout values retained from the current implementation.',
          },
          fields: [
            classNameField('sectionClassName', 'Section class name', DEFAULT_HERO_SECTION_CLASS_NAME),
            classNameField('layoutClassName', 'Layout class name', DEFAULT_HERO_LAYOUT_CLASS_NAME),
            classNameField('ratingContainerClassName', 'Rating container class name'),
            classNameField('titleClassName', 'Title class name', DEFAULT_HERO_TITLE_CLASS_NAME),
            classNameField(
              'descriptionClassName',
              'Description class name',
              DEFAULT_HERO_DESCRIPTION_CLASS_NAME,
            ),
          ],
        },
      ],
      required: true,
    },
    {
      name: 'overview',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'paragraphs',
          type: 'array',
          fields: [textItemField('text', 'Paragraph')],
          minRows: 1,
          required: true,
        },
        ...mediaFields('image', 'Overview image'),
        {
          name: 'imageAlt',
          type: 'text',
          required: true,
        },
      ],
      required: true,
    },
    {
      name: 'services',
      type: 'group',
      fields: [
        {
          name: 'eyebrow',
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
          name: 'ctaLabel',
          type: 'text',
          required: true,
        },
        {
          name: 'demoHref',
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
            ...mediaFields('image', 'Service image'),
            {
              name: 'reverse',
              type: 'checkbox',
              defaultValue: false,
            },
          ],
          minRows: 1,
          required: true,
        },
      ],
      required: true,
    },
    {
      name: 'comparison',
      type: 'group',
      admin: {
        description: 'Standalone comparison table section rendered after the services cards.',
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
        {
          name: 'winnerLabel',
          type: 'text',
          admin: {
            description: 'Badge label on the winner (last) column. Defaults to "Best Choice".',
          },
          defaultValue: 'Best Choice',
        },
        {
          name: 'footerText',
          type: 'text',
          admin: {
            description: 'Small print shown at the bottom of the winner column.',
          },
          defaultValue: '✓ Faster · Easier · More Reliable',
        },
        {
          name: 'columnHeaders',
          type: 'array',
          admin: {
            description: 'Table column headers in order — e.g. Feature, Traditional Shop, Chex.ai.',
          },
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
            },
          ],
          minRows: 3,
          maxRows: 3,
          required: true,
        },
        {
          name: 'rows',
          type: 'array',
          admin: {
            description: 'One entry per comparison row. Each row has exactly 3 cells matching the column headers.',
          },
          fields: [
            {
              name: 'featureLabel',
              type: 'text',
              label: 'Feature (column 1)',
              required: true,
            },
            {
              name: 'traditionalValue',
              type: 'text',
              label: 'Traditional Shop value (column 2)',
              required: true,
            },
            {
              name: 'chexValue',
              type: 'text',
              label: 'Chex.ai value (column 3)',
              required: true,
            },
          ],
          minRows: 1,
          required: true,
        },
        {
          name: 'ctaLabel',
          type: 'text',
          admin: {
            description: 'Optional CTA button label shown below the table.',
          },
        },
        {
          name: 'ctaHref',
          type: 'text',
          admin: {
            description: 'Optional CTA button URL.',
          },
        },
      ],
      required: true,
    },
    {
      name: 'registerRideShareSection',
      type: 'group',
      admin: {
        description: 'Rideshare inspection registration process shown between services and showcase.',
      },
      fields: [
        {
          name: 'eyebrow',
          type: 'text',
          required: true,
        },
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'ctaLabel',
          type: 'text',
          required: true,
        },
        {
          name: 'ctaHref',
          type: 'text',
          required: true,
        },
        ...mediaFields('initialImage', 'Initial process image'),
        {
          name: 'initialImageAlt',
          type: 'text',
        },
        {
          name: 'steps',
          type: 'array',
          fields: [
            {
              name: 'step',
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
            ...mediaFields('icon', 'Step icon'),
            {
              name: 'iconAlt',
              type: 'text',
              required: true,
            },
            ...mediaFields('image', 'Step image'),
            {
              name: 'imageAlt',
              type: 'text',
              required: true,
            },
            {
              name: 'review',
              type: 'group',
              fields: [
                {
                  name: 'name',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'stars',
                  type: 'number',
                  min: 1,
                  max: 5,
                  required: true,
                },
                {
                  name: 'quote',
                  type: 'textarea',
                  required: true,
                },
                {
                  name: 'avatar',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'reviewLinkHref',
                  type: 'text',
                  required: true,
                },
              ],
              required: true,
            },
          ],
          minRows: 1,
          required: true,
        },
      ],
      required: true,
    },
    {
      name: 'pricingRideShareSection',
      type: 'group',
      admin: {
        description: 'Rideshare inspection pricing cards and supporting highlights.',
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
        {
          name: 'currencySymbol',
          type: 'text',
          required: true,
        },
        ...mediaFields('highlightIcon', 'Pricing highlight icon'),
        {
          name: 'highlightIconAlt',
          type: 'text',
        },
        {
          name: 'plans',
          type: 'array',
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
            },
            {
              name: 'price',
              type: 'text',
              required: true,
            },
            {
              name: 'description',
              type: 'text',
              required: true,
            },
            {
              name: 'subDescription',
              type: 'text',
            },
            {
              name: 'buttonLabel',
              type: 'text',
              required: true,
            },
            {
              name: 'buttonHref',
              type: 'text',
              required: true,
            },
            {
              name: 'tone',
              type: 'select',
              enumName: 'loc_rs_plan_tone',
              defaultValue: 'primary',
              options: [
                {
                  label: 'Primary (blue)',
                  value: 'primary',
                },
                {
                  label: 'Accent (orange)',
                  value: 'accent',
                },
              ],
              required: true,
            },
          ],
          minRows: 1,
          required: true,
        },
        {
          name: 'highlights',
          type: 'array',
          fields: [
            {
              name: 'emphasis',
              type: 'text',
            },
            {
              name: 'text',
              type: 'text',
              required: true,
            },
            {
              name: 'emphasisTone',
              type: 'select',
              enumName: 'loc_rs_highlight_tone',
              defaultValue: 'accent',
              options: [
                {
                  label: 'Primary (blue)',
                  value: 'primary',
                },
                {
                  label: 'Accent (orange)',
                  value: 'accent',
                },
              ],
              required: true,
            },
          ],
          minRows: 1,
          required: true,
        },
      ],
      required: true,
    },
    {
      name: 'pricing',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          admin: {
            description: 'Section heading shown above the pricing table.',
          },
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          admin: {
            description: 'Short callout under the pricing heading.',
          },
          required: true,
        },
        {
          name: 'plans',
          type: 'array',
          maxRows: 2,
          minRows: 2,
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
            },
            {
              name: 'price',
              type: 'text',
              required: true,
            },
            {
              name: 'subtitle',
              type: 'text',
              required: true,
            },
            {
              name: 'caption',
              type: 'text',
            },
            {
              name: 'buttonLabel',
              type: 'text',
              required: true,
            },
            {
              name: 'buttonHref',
              type: 'text',
              required: true,
            },
            {
              name: 'priceTone',
              type: 'select',
              defaultValue: 'primary',
              options: [
                {
                  label: 'Primary (blue)',
                  value: 'primary',
                },
                {
                  label: 'Accent (orange)',
                  value: 'accent',
                },
              ],
              required: true,
            },
          ],
          required: true,
        },
        {
          name: 'highlights',
          type: 'array',
          fields: [
            {
              name: 'text',
              type: 'text',
              required: true,
            },
          ],
          admin: {
            description: 'Short highlights shown below the pricing cards.',
          },
          minRows: 1,
          required: true,
        },
      ],
      required: true,
    },
    {
      name: 'showcase',
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
        {
          name: 'demoHref',
          type: 'text',
          required: true,
        },
        ...mediaFields('video', 'Showcase video'),
        {
          name: 'items',
          type: 'array',
          fields: [
            {
              name: 'number',
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
          ],
          minRows: 1,
          required: true,
        },
        {
          name: 'visual',
          type: 'group',
          fields: [
            {
              name: 'variant',
              type: 'select',
              defaultValue: 'organic-frame',
              options: [
                {
                  label: 'Organic frame',
                  value: 'organic-frame',
                },
                {
                  label: 'Wave',
                  value: 'wave',
                },
                {
                  label: 'Processing',
                  value: 'processing',
                },
                {
                  label: 'Preview',
                  value: 'preview',
                },
              ],
              required: true,
            },
            {
              name: 'showGlow',
              type: 'checkbox',
              defaultValue: true,
            },
          ],
        },
      ],
      required: true,
    },
    {
      name: 'regions',
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
          name: 'demoHref',
          type: 'text',
          required: true,
        },
        {
          name: 'style',
          type: 'group',
          fields: [
            classNameField('sectionClassName', 'Section class name'),
            classNameField('headingClassName', 'Heading class name', 'max-w-5xl'),
            classNameField('titleClassName', 'Title class name'),
            classNameField('articleClassName', 'Article class name', 'sm:grid-cols-[0.92fr_1fr]'),
          ],
        },
        {
          name: 'items',
          type: 'array',
          fields: [
            {
              name: 'city',
              type: 'text',
              required: true,
            },
            {
              name: 'description',
              type: 'textarea',
              required: true,
            },
            ...mediaFields('image', 'Region image'),
          ],
          minRows: 1,
          required: true,
        },
      ],
      required: true,
    },
    {
      name: 'manage',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'bullets',
          type: 'array',
          fields: [textItemField('text', 'Bullet')],
          minRows: 1,
          required: true,
        },
        {
          name: 'buttonLabel',
          type: 'text',
          required: true,
        },
        {
          name: 'demoHref',
          type: 'text',
          required: true,
        },
        ...mediaFields('frameImage', 'Phone frame image'),
        ...mediaFields('screenImage', 'Phone screen image'),
        classNameField('screenClassName', 'Phone screen class name'),
        {
          name: 'checkIconColor',
          type: 'text',
          defaultValue: '#ff7a01',
          required: true,
        },
        {
          name: 'illustration',
          type: 'group',
          fields: [
            {
              name: 'variant',
              type: 'select',
              defaultValue: 'framed-screen',
              options: [
                {
                  label: 'Framed screen',
                  value: 'framed-screen',
                },
                {
                  label: 'Offset screen',
                  value: 'offset-screen',
                },
              ],
              required: true,
            },
            ...mediaFields('notchImage', 'Phone notch image'),
          ],
          required: true,
        },
      ],
      required: true,
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
              type: 'textarea',
            },
            {
              name: 'linkHref',
              type: 'text',
            },
            {
              name: 'linkLabel',
              type: 'text',
            },
          ],
          minRows: 1,
          required: true,
        },
        ...mediaFields('arrowImage', 'Arrow image'),
        {
          name: 'style',
          type: 'group',
          fields: [
            classNameField(
              'sectionClassName',
              'Section class name',
              DEFAULT_CASE_STUDIES_SECTION_CLASS_NAME,
            ),
            classNameField('scrollClassName', 'Scroll class name', DEFAULT_CASE_STUDIES_SCROLL_CLASS_NAME),
            classNameField(
              'articleClassName',
              'Article class name',
              DEFAULT_CASE_STUDIES_ARTICLE_CLASS_NAME,
            ),
            classNameField('imageClassName', 'Image class name', DEFAULT_CASE_STUDIES_IMAGE_CLASS_NAME),
            classNameField('arrowClassName', 'Arrow class name', DEFAULT_CASE_STUDIES_ARROW_CLASS_NAME),
            classNameField('metricClassName', 'Metric class name', DEFAULT_CASE_STUDIES_METRIC_CLASS_NAME),
            classNameField('titleClassName', 'Title class name', DEFAULT_CASE_STUDIES_TITLE_CLASS_NAME),
            classNameField(
              'descriptionClassName',
              'Description class name',
              DEFAULT_CASE_STUDIES_DESCRIPTION_CLASS_NAME,
            ),
            classNameField('captionClassName', 'Caption class name'),
            classNameField('linkClassName', 'Link class name'),
          ],
        },
      ],
      required: true,
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
        ...mediaFields('quoteImage', 'Quote image'),
        ...mediaFields('starImage', 'Star image'),
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
              name: 'avatar',
              type: 'text',
            },
            {
              name: 'quote',
              type: 'textarea',
              required: true,
            },
            {
              name: 'stars',
              type: 'number',
              min: 1,
              max: 5,
              required: true,
            },
          ],
          minRows: 1,
          required: true,
        },
      ],
      required: true,
    },
    {
      name: 'registerSection',
      type: 'group',
      admin: {
        description:
          'Full-width registration block with background image, headline, and sign-up form (after testimonials).',
      },
      fields: [
        {
          name: 'sectionId',
          type: 'text',
          admin: {
            description: 'Optional anchor ID for in-page links (e.g. signup).',
          },
        },
        ...mediaFields('backgroundImage', 'Background image'),
        {
          name: 'backgroundImageAlt',
          type: 'text',
          required: true,
        },
        {
          name: 'headlineLines',
          type: 'array',
          admin: {
            description: 'One row per line of the left headline (e.g. YOU CAN / MANAGE & / …).',
          },
          fields: [textItemField('text', 'Line')],
          minRows: 1,
          required: true,
        },
        {
          name: 'formHeadingAccent',
          type: 'text',
          admin: {
            description: 'Leading phrase shown in accent orange (e.g. Sign up).',
          },
          required: true,
        },
        {
          name: 'formHeadingRest',
          type: 'text',
          admin: {
            description: 'Remainder of the form title in white.',
          },
          required: true,
        },
        {
          name: 'firstNamePlaceholder',
          type: 'text',
          required: true,
        },
        {
          name: 'lastNamePlaceholder',
          type: 'text',
          required: true,
        },
        {
          name: 'emailPlaceholder',
          type: 'text',
          required: true,
        },
        {
          name: 'phonePlaceholder',
          type: 'text',
          required: true,
        },
        {
          name: 'passwordPlaceholder',
          type: 'text',
          required: true,
        },
        {
          name: 'termsPrefix',
          type: 'text',
          admin: {
            description: 'Text before the Terms link (e.g. "By checking the box, you accept our ").',
          },
          required: true,
        },
        {
          name: 'termsLinkLabel',
          type: 'text',
          required: true,
        },
        {
          name: 'termsLinkHref',
          type: 'text',
          required: true,
        },
        {
          name: 'registerButtonLabel',
          type: 'text',
          required: true,
        },
        {
          name: 'registerButtonHref',
          type: 'text',
          admin: {
            description: 'URL to open when the user submits (e.g. external app sign-up).',
          },
        },
        {
          name: 'loginPrefix',
          type: 'text',
          admin: {
            description: 'Text before the Login link.',
          },
          required: true,
        },
        {
          name: 'loginLinkLabel',
          type: 'text',
          required: true,
        },
        {
          name: 'loginLinkHref',
          type: 'text',
          required: true,
        },
      ],
      required: true,
    },
    {
      name: 'faq',
      type: 'group',
      fields: [
        {
          name: 'idBase',
          type: 'text',
          admin: {
            description: 'Stable DOM ID prefix for accordion controls.',
          },
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
          name: 'items',
          type: 'array',
          fields: [
            {
              name: 'question',
              type: 'text',
              required: true,
            },
            {
              name: 'answer',
              type: 'textarea',
              required: true,
            },
          ],
          minRows: 1,
          required: true,
        },
      ],
      required: true,
    },
    {
      name: 'cta',
      type: 'group',
      fields: [
        {
          name: 'sectionId',
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
          name: 'primaryLabel',
          type: 'text',
          required: true,
        },
        {
          name: 'secondaryLabel',
          type: 'text',
          required: true,
        },
        {
          name: 'helperText',
          type: 'text',
          required: true,
        },
        ...mediaFields('image', 'CTA background image'),
        classNameField('imageOpacityClassName', 'Image opacity class name', 'opacity-100'),
      ],
      required: true,
    },
  ],
  versions: {
    drafts: true,
  },
}
