import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    defaultColumns: ['filename', 'alt', 'sourceHash', 'updatedAt'],
    useAsTitle: 'filename',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      admin: {
        description: 'Alternative text for images when used in page content.',
      },
    },
    {
      name: 'sourceHash',
      type: 'text',
      admin: {
        description: 'SHA-256 hash used by the media import script to avoid duplicate uploads.',
        position: 'sidebar',
      },
      index: true,
      unique: true,
    },
    {
      name: 'sourcePath',
      type: 'text',
      admin: {
        description: 'Original local asset path for the first file imported with this hash.',
        position: 'sidebar',
      },
    },
  ],
  upload: {
    mimeTypes: ['image/*', 'video/mp4'],
    staticDir: 'media',
  },
}
