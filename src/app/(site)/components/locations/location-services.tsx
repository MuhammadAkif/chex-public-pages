/* eslint-disable @next/next/no-img-element */

import { Button } from '@/app/(site)/components/ui/button'

export type LocationServicesProps = {
  eyebrow: string
  title: string
  description: string
  ctaLabel: string
  demoHref: string
  items: ReadonlyArray<{
    title: string
    description: string
    image: string
    reverse?: boolean
  }>
}

const BR_TAG_PATTERN = /<br\s*\/?>/gi
const BULLET_PREFIX_PATTERN = /^(?:[-*]\s+|✅\s*|•\s*)/
const TABLE_BLOCK_PATTERN = /\[TABLE\]([\s\S]*?)\[\/TABLE\]/i

type ParsedTable = {
  headers: string[]
  rows: string[][]
}

function parseServiceDescription(description: string) {
  const tableMatch = description.match(TABLE_BLOCK_PATTERN)
  let parsedTable: ParsedTable | null = null
  let normalizedDescription = description

  if (tableMatch?.[1]) {
    const lines = tableMatch[1]
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
    const matrix = lines
      .map((line) => line.split('|').map((cell) => cell.trim()))
      .filter((cells) => cells.length >= 3)

    if (matrix.length >= 2) {
      parsedTable = {
        headers: matrix[0] ?? [],
        rows: matrix.slice(1),
      }
    }

    normalizedDescription = description.replace(tableMatch[0], '').trim()
  }

  const paragraphs: string[] = []
  const bullets: string[] = []
  const normalizedLines = normalizedDescription
    .replace(BR_TAG_PATTERN, '\n')
    .split('\n')
    .map((line) => line.trim())
  let currentParagraph = ''

  const flushParagraph = () => {
    if (!currentParagraph) {
      return
    }

    paragraphs.push(currentParagraph.trim())
    currentParagraph = ''
  }

  for (const line of normalizedLines) {
    if (!line) {
      flushParagraph()
      continue
    }

    if (BULLET_PREFIX_PATTERN.test(line)) {
      flushParagraph()
      bullets.push(line.replace(BULLET_PREFIX_PATTERN, '').trim())
      continue
    }

    if (line.includes('•')) {
      flushParagraph()
      const parts = line
        .split('•')
        .map((part) => part.trim())
        .filter(Boolean)

      if (parts.length) {
        const [lead, ...rest] = parts

        if (lead) {
          currentParagraph = lead
          flushParagraph()
        }

        for (const item of rest) {
          if (item) {
            bullets.push(item.replace(BULLET_PREFIX_PATTERN, '').trim())
          }
        }
      }

      continue
    }

    currentParagraph = currentParagraph ? `${currentParagraph} ${line}` : line
  }

  flushParagraph()

  return { bullets, paragraphs, table: parsedTable }
}

export function LocationServices({
  eyebrow,
  title,
  description,
  ctaLabel,
  demoHref,
  items,
}: LocationServicesProps) {
  return (
    <section id="services" className="relative bg-[#1b1c20] px-4 py-20 text-white sm:px-6 lg:px-10 lg:py-28">
      <div className="pointer-events-none absolute left-[8%] top-0 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,_rgba(255,122,1,0.18)_0%,_rgba(255,122,1,0)_72%)] blur-3xl" />
      <div className="pointer-events-none absolute right-[-8rem] top-[36%] h-[44rem] w-[44rem] rounded-full bg-[radial-gradient(circle,_rgba(255,122,1,0.2)_0%,_rgba(255,122,1,0)_72%)] blur-3xl" />
      <div className="relative mx-auto max-w-[1240px]">
        <div className="mx-auto max-w-5xl text-center">
          <p className="type-ui-label text-white">{eyebrow}</p>
          <h2 className="mt-6 font-display text-[44px] font-bold leading-[1.12] tracking-[-2.4px] text-white sm:text-[56px] lg:text-[64px] lg:leading-[70.4px] lg:tracking-[-3.2px]">
            {title}
          </h2>
          <p className="type-location-body-relaxed mx-auto mt-6 max-w-5xl text-white/82">
            {description}
          </p>
        </div>

        <div className="mt-16 space-y-9">
          {items.map((item) => (
            <article
              key={item.title}
              className="relative overflow-hidden rounded-[30px] bg-[radial-gradient(circle_at_50%_112%,#ff7a01_0%,#994901_22%,#000_54%)] p-6 shadow-[0_34px_100px_-72px_rgba(255,122,1,0.75)] sm:p-10 lg:p-[60px]"
            >
              <div
                className={`grid gap-10 lg:grid-cols-[0.9fr_1fr] lg:items-center ${
                  item.reverse ? 'lg:grid-cols-[1fr_0.9fr]' : ''
                }`}
              >
                <div className={item.reverse ? 'lg:order-2' : ''}>
                  <h3 className="type-location-card-title max-w-xl text-white">{item.title}</h3>
                  {(() => {
                    const { bullets, paragraphs, table } = parseServiceDescription(item.description)

                    return (
                      <div className="mt-5 max-w-xl space-y-3 font-display text-[16px] leading-7 tracking-[-0.16px] text-white/84">
                        {paragraphs.map((paragraph) => (
                          <p key={paragraph}>{paragraph}</p>
                        ))}
                        {bullets.length ? (
                          <ul className="space-y-2 text-left">
                            {bullets.map((bullet) => (
                              <li key={bullet} className="flex items-start gap-2">
                                <span aria-hidden="true">•</span>
                                <span>{bullet}</span>
                              </li>
                            ))}
                          </ul>
                        ) : null}
                        {table ? (
                          <div className="overflow-hidden rounded-[14px] border border-white/20 bg-black/20">
                            <table className="w-full border-collapse text-left font-ui text-[14px] leading-6 text-white/90">
                              <thead className="bg-white/10 text-white">
                                <tr>
                                  {table.headers.map((header) => (
                                    <th key={header} className="px-4 py-3 font-semibold">
                                      {header}
                                    </th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody>
                                {table.rows.map((row) => (
                                  <tr key={row.join('|')} className="border-t border-white/10">
                                    {row.map((cell) => (
                                      <td key={cell} className="px-4 py-3 align-top">
                                        {cell}
                                      </td>
                                    ))}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        ) : null}
                      </div>
                    )
                  })()}
                  <div className="mt-9">
                    <Button href={demoHref}>Read more</Button>
                  </div>
                </div>

                <div className={item.reverse ? 'lg:order-1' : ''}>
                  <div className="overflow-hidden rounded-[28px] border border-[#f0f6ff] bg-[#f0f6ff] p-5">
                    <div className="overflow-hidden rounded-[24px] border border-[#2563eb]/30 shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]">
                      <img src={item.image} alt={item.title} className="aspect-[515/262] w-full object-cover" />
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Button href={demoHref} className="min-w-[260px]">
            {ctaLabel}
          </Button>
        </div>
      </div>
    </section>
  )
}
