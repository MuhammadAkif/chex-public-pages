import type { Block } from 'payload'

/**
 * A simple, robust table for rich-text content. The author pastes rows of data
 * (one row per line); columns are split on a Tab or a `|` pipe. This means you
 * can paste a selection straight out of Excel / Google Sheets (tab-separated)
 * or hand-write a Markdown-style pipe table. The frontend parses the text into
 * a real, styled <table> — no raw HTML, so there is no XSS surface.
 *
 * Used via BlocksFeature on the Posts `content` editor (see src/collections/Posts.ts).
 */
export const TableBlock: Block = {
  slug: 'table',
  interfaceName: 'TableBlock',
  labels: {
    plural: 'Tables',
    singular: 'Table',
  },
  fields: [
    {
      name: 'data',
      type: 'textarea',
      admin: {
        description:
          'One row per line. Separate columns with a Tab (paste straight from Excel / Google Sheets) or a | pipe. A Markdown separator line like | --- | --- | is ignored.',
        rows: 8,
      },
      label: 'Table data',
      required: true,
    },
    {
      name: 'hasHeaderRow',
      type: 'checkbox',
      defaultValue: true,
      label: 'Use the first row as a header',
    },
    {
      name: 'caption',
      type: 'text',
      admin: {
        description: 'Optional caption shown beneath the table.',
      },
      label: 'Caption',
    },
  ],
}
