'use client'

import { useState } from 'react'

export type LocationFaqProps = {
  idBase: string
  title: string
  description: string
  items: ReadonlyArray<{
    question: string
    answer: string
  }>
}

function ChevronIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <svg
      viewBox="0 0 20 20"
      className={`h-4 w-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="m5 7.5 5 5 5-5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function LocationFaq({ idBase, title, description, items }: LocationFaqProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(items.length > 0 ? 0 : null)

  return (
    <section className="bg-white px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-[1240px]">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="type-location-heading text-[#1b2f4b]">{title}</h2>
          <p className="type-location-body mt-6 text-[#41546e]">{description}</p>
        </div>

        <div className="mt-16 space-y-10">
          {items.map((item, index) => {
            const isOpen = activeIndex === index
            const panelId = `${idBase}-faq-panel-${index}`
            const buttonId = `${idBase}-faq-button-${index}`

            return (
              <article
                key={item.question}
                className={`rounded-bl-[4px] rounded-br-[16px] rounded-tl-[4px] rounded-tr-[16px] border-l-[7px] border-[#1368b9] p-8 shadow-[0_1px_4px_0_rgba(25,33,61,0.06)] ${
                  isOpen
                    ? 'bg-[linear-gradient(222deg,#ffffff_37%,#f0f6ff_61%)]'
                    : 'bg-[#f0f6ff]'
                }`}
              >
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-controls={panelId}
                    aria-expanded={isOpen}
                    className="flex w-full items-start gap-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1368b9] focus-visible:ring-offset-4"
                    onClick={() => {
                      setActiveIndex((current) => (current === index ? null : index))
                    }}
                  >
                    <span className="mt-0.5 inline-flex h-8 w-8 flex-none items-center justify-center rounded-full text-[#1368b9]">
                      <ChevronIcon isOpen={isOpen} />
                    </span>
                    <span className="max-w-4xl font-display text-[20px] font-bold capitalize leading-[1.35] text-[#1368b9]">
                      {item.question}
                    </span>
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="mt-6 max-w-5xl pl-11 font-display text-[16px] leading-[1.66] text-[#1b1c20]">
                      {item.answer}
                    </p>
                  </div>
                </div>
                <span className="sr-only">FAQ item {index + 1}</span>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
