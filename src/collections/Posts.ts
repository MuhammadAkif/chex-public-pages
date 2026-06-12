import type { CollectionConfig } from 'payload'
import { BlocksFeature, lexicalEditor } from '@payloadcms/richtext-lexical'

import { TableBlock } from '../blocks/TableBlock'
import { slugifyOrFallback } from '../lib/slugify'

const isPostData = (
  value: unknown,
): value is { slug?: unknown; title?: unknown } =>
  typeof value === 'object' && value !== null

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    defaultColumns: ['title', 'slug', '_status', 'updatedAt'],
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (!isPostData(data)) return data

        const source = typeof data.slug === 'string' && data.slug ? data.slug : data.title
        if (typeof source === 'string') {
          data.slug = slugifyOrFallback(source, 'post')
        }

        return data
      },
    ],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'postImage',
      type: 'text',
      admin: {
        description: 'Public image URL for this post (for example an S3 link).',
      },
      label: 'Post image URL',
    },
    {
      name: 'slug',
      type: 'text',
      admin: {
        description:
          'Human-readable unique URL segment for this post. Saved in lowercase hyphenated format.',
      },
      index: true,
      required: true,
      unique: true,
    },
    {
      name: 'excerpt',
      type: 'textarea',
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
        },
        {
          name: 'description',
          type: 'textarea',
        },
      ],
      label: 'SEO metadata',
    },
    {
      name: 'content',
      type: 'richText',
      // Scope a field-level editor to Posts so blog content can embed tables via
      // a stable Blocks feature. The root editor (payload.config.ts) is left
      // untouched, so Locations and other richText fields keep the default set.
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          BlocksFeature({ blocks: [TableBlock] }),
        ],
      }),
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
  ],
  versions: {
    drafts: true,
  },
}

