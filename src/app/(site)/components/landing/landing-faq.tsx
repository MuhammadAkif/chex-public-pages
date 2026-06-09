'use client'

import { useState } from 'react'

type LandingFaqProps = {
  title: string
  items: ReadonlyArray<{ question: string; answer: string }>
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      className={`h-5 w-5 shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
      aria-hidden
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
    </svg>
  )
}

export function LandingFaq({ title, items }: LandingFaqProps) {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section className="bg-white px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-[1100px]">
        <h2 className="text-center font-display text-[30px] font-bold tracking-[-1px] text-[#1b2f4b] sm:text-[42px]">
          {title}
        </h2>

        <div className="mt-12 flex flex-col gap-4">
          {items.map((item, index) => {
            const open = openIndex === index
            return (
              <div
                key={item.question}
                className={`overflow-hidden rounded-[12px] border-l-4 bg-[#eef4ff] transition-colors ${
                  open ? 'border-[#1368b9]' : 'border-[#1368b9]/60'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(open ? -1 : index)}
                  aria-expanded={open}
                  className="flex w-full cursor-pointer items-center justify-between gap-4 px-6 py-5 text-left text-[#1368b9]"
                >
                  <span className="font-display text-[16px] font-bold sm:text-[18px]">
                    {item.question}
                  </span>
                  <Chevron open={open} />
                </button>
                <div
                  className={`grid overflow-hidden transition-[grid-template-rows] duration-300 ${
                    open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  }`}
                >
                  <div className="min-h-0">
                    <p className="px-6 pb-6 font-ui text-[15px] leading-7 text-[#41546e] sm:text-[16px]">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
