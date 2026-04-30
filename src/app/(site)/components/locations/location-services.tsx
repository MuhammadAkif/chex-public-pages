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
    if (!currentParagraph) return
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
      const parts = line.split('•').map((p) => p.trim()).filter(Boolean)
      if (parts.length) {
        const [lead, ...rest] = parts
        if (lead) { currentParagraph = lead; flushParagraph() }
        for (const item of rest) {
          if (item) bullets.push(item.replace(BULLET_PREFIX_PATTERN, '').trim())
        }
      }
      continue
    }

    currentParagraph = currentParagraph ? `${currentParagraph} ${line}` : line
  }

  flushParagraph()
  return { bullets, paragraphs, table: parsedTable }
}

// ─── Sentiment helpers (reused from comparison section) ──────────────────────

const POSITIVE_SIGNALS = [
  'instant','digital','handled','same day','half hour','always','yes',
  'statewide','full','auto','confirmed','correct','flexible','anytime','stored','covered',
]
const NEGATIVE_SIGNALS = [
  'usually yes','paper','you handle','you do it','1–3 days','1-3 days',
  'not always','limited','business hours','inconsistent','generic','rejection','sometimes','easy to lose',
]
const isPositiveCell = (v: string) => POSITIVE_SIGNALS.some((s) => v.toLowerCase().includes(s))
const isNegativeCell = (v: string) => NEGATIVE_SIGNALS.some((s) => v.toLowerCase().includes(s))

// ─── Component ───────────────────────────────────────────────────────────────

export function LocationServices({
  eyebrow,
  title,
  description,
  ctaLabel,
  demoHref,
  items,
}: LocationServicesProps) {
  return (
    <section
      id="services"
      className="relative overflow-hidden bg-white px-4 py-20 sm:px-6 lg:px-10 lg:py-28"
    >
      {/* Subtle top-center radial hint */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_40%_at_50%_0%,rgba(255,122,1,0.05),transparent)]" />

      <div className="relative mx-auto max-w-[1240px]">

        {/* ── Section heading ── */}
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[#ff7a01]">
            {eyebrow}
          </p>
          <h2 className="mt-4 font-display text-[36px] font-bold leading-[1.12] tracking-[-1.8px] text-[#0f172a] sm:text-[48px] lg:text-[56px] lg:leading-[62px] lg:tracking-[-2.8px]">
            {title}
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-[17px] leading-[1.7] text-[#475569]">
            {description}
          </p>
        </div>

        {/* ── Service cards ── */}
        <div className="mt-16 space-y-8">
          {items.map((item) => (
            <article
              key={item.title}
              className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_4px_32px_rgba(15,23,42,0.07)] transition-shadow hover:shadow-[0_8px_48px_rgba(15,23,42,0.11)]"
            >
              {/* Orange top accent bar */}
              <div className="h-1 w-full bg-gradient-to-r from-[#ff7a01] via-[#ff9a3c] to-transparent" />

              <div
                className={`grid gap-10 p-6 sm:p-10 lg:p-[52px] lg:grid-cols-[0.9fr_1fr] lg:items-center ${
                  item.reverse ? 'lg:grid-cols-[1fr_0.9fr]' : ''
                }`}
              >
                {/* ── Text side ── */}
                <div className={item.reverse ? 'lg:order-2' : ''}>
                  <h3 className="text-[22px] font-bold leading-[1.25] tracking-[-0.5px] text-[#0f172a] sm:text-[26px] lg:text-[30px]">
                    {item.title}
                  </h3>

                  {(() => {
                    const { bullets, paragraphs, table } = parseServiceDescription(item.description)

                    return (
                      <div className="mt-5 max-w-xl space-y-3 text-[15px] leading-7 text-[#475569]">
                        {paragraphs.map((paragraph) => (
                          <p key={paragraph}>{paragraph}</p>
                        ))}

                        {bullets.length ? (
                          <ul className="space-y-2 text-left">
                            {bullets.map((bullet) => (
                              <li key={bullet} className="flex items-start gap-2.5">
                                <span className="mt-1.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#ff7a01]/15">
                                  <svg className="h-2.5 w-2.5 text-[#ff7a01]" viewBox="0 0 10 10" fill="currentColor">
                                    <path d="M3.5 7.5L1 5l1-1 1.5 1.5 4-4 1 1z"/>
                                  </svg>
                                </span>
                                <span>{bullet}</span>
                              </li>
                            ))}
                          </ul>
                        ) : null}

                        {/* ── Inline table (white theme) ── */}
                        {table ? (
                          <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_4px_20px_rgba(15,23,42,0.06)]">

                            {/* Column headers */}
                            <div
                              className="grid border-b border-slate-200 bg-slate-50"
                              style={{ gridTemplateColumns: `repeat(${table.headers.length}, 1fr)` }}
                            >
                              {table.headers.map((header, hi) => (
                                <div
                                  key={header}
                                  className={[
                                    'px-4 py-3 text-[11px] font-bold uppercase tracking-widest',
                                    hi === 0 ? 'text-slate-400' : '',
                                    hi === 1 ? 'text-slate-600 border-x border-slate-200' : '',
                                    hi === table.headers.length - 1
                                      ? 'bg-[#fff7ed] text-[#c2540a] border-x border-[#ff7a01]/15'
                                      : '',
                                  ].join(' ')}
                                >
                                  {header}
                                </div>
                              ))}
                            </div>

                            {/* Data rows */}
                            {table.rows.map((row, ri) => {
                              const isEven = ri % 2 === 0
                              return (
                                <div
                                  key={row.join('|')}
                                  className={`grid border-b border-slate-100 last:border-0 ${isEven ? 'bg-white' : 'bg-slate-50/50'}`}
                                  style={{ gridTemplateColumns: `repeat(${row.length}, 1fr)` }}
                                >
                                  {row.map((cell, ci) => {
                                    const isChex = ci === row.length - 1
                                    const isTrad = ci === 1
                                    const showCheck = isChex && isPositiveCell(cell)
                                    const showCross = isTrad && isNegativeCell(cell)

                                    return (
                                      <div
                                        key={`${ci}-${cell}`}
                                        className={[
                                          'flex items-center gap-2 px-4 py-3 text-[13px] leading-5',
                                          ci === 0 ? 'font-semibold text-[#0f172a]' : '',
                                          isTrad ? `border-x border-slate-100 ${showCross ? 'text-slate-400' : 'text-slate-600'}` : '',
                                          isChex ? 'bg-[#fff7ed]/60 border-x border-[#ff7a01]/10 font-semibold text-[#1e293b]' : '',
                                        ].join(' ')}
                                      >
                                        {showCheck && (
                                          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100">
                                            <svg className="h-3 w-3 text-emerald-600" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                              <polyline points="2,6 5,9 10,3" />
                                            </svg>
                                          </span>
                                        )}
                                        {showCross && (
                                          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-50">
                                            <svg className="h-3 w-3 text-red-400" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                                              <line x1="3" y1="3" x2="9" y2="9" /><line x1="9" y1="3" x2="3" y2="9" />
                                            </svg>
                                          </span>
                                        )}
                                        <span>{cell}</span>
                                      </div>
                                    )
                                  })}
                                </div>
                              )
                            })}
                          </div>
                        ) : null}
                      </div>
                    )
                  })()}

                  <div className="mt-8">
                    <Button href={demoHref}>Read more</Button>
                  </div>
                </div>

                {/* ── Image side ── */}
                <div className={item.reverse ? 'lg:order-1' : ''}>
                  <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-[#f0f6ff] p-4 shadow-[0_4px_24px_rgba(15,23,42,0.08)]">
                    <div className="overflow-hidden rounded-[18px] border border-[#2563eb]/20 shadow-[0_2px_8px_rgba(0,0,0,0.10)]">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="aspect-[515/262] w-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* ── Bottom CTA ── */}
        <div className="mt-12 flex justify-center">
          <Button href={demoHref} className="min-w-[260px]">
            {ctaLabel}
          </Button>
        </div>
      </div>
    </section>
  )
}
