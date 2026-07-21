import type { CollectionConfig } from 'payload'

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
      name: 'cta',
      type: 'group',
      admin: {
        description:
          'The call-to-action card shown in the blog sidebar and at the bottom of the post. Leave blank to use the site default.',
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
        {
          name: 'secondaryLabel',
          type: 'text',
          label: 'Button label',
        },
      ],
      label: 'Call to action',
    },
    {
      name: 'content',
      type: 'richText',
      admin: {
        description:
          'To add a table, type <table> on its own line, then one row per line (columns separated by a | pipe or a Tab), then </table> on its own line. The first row becomes the header.',
      },
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

