"use client";

import { useState, type ReactNode } from "react";

export type FaqEntry = {
  question: string;
  answer: ReactNode;
};

export type RideshareFaqProps = {
  title: string;
  items: ReadonlyArray<FaqEntry>;
};

export function RideshareFaq({ title, items }: RideshareFaqProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-white px-4 py-16 sm:px-6 lg:px-10 lg:py-20">
      <div className="mx-auto max-w-[920px]">
        <h2 className="text-center font-display text-[32px] font-bold leading-tight text-[#1b2f4b] sm:text-[40px]">
          {title}
        </h2>

        <div className="mt-10 space-y-3">
          {items.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.question}
                className="overflow-hidden rounded-[12px] border border-[#e5edf7] bg-white shadow-[0_10px_40px_-30px_rgba(20,104,186,0.4)]"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  className="flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-[#f4f8ff] sm:px-6 sm:py-5"
                >
                  <span className="font-display text-[16px] font-semibold text-[#1b2f4b] sm:text-[18px]">
                    {faq.question}
                  </span>
                  <svg
                    width="12"
                    height="8"
                    viewBox="0 0 12 8"
                    fill="none"
                    aria-hidden="true"
                    className={`shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  >
                    <path
                      d="m6.613.612 4.947 4.787a.82.82 0 0 1 0 1.193l-.822.796a.89.89 0 0 1-1.233 0L5.998 3.995 2.492 7.388a.89.89 0 0 1-1.233 0l-.823-.796a.82.82 0 0 1 0-1.193L5.383.612a.885.885 0 0 1 1.23 0"
                      fill="#1b2f4b"
                    />
                  </svg>
                </button>
                {isOpen ? (
                  <div className="px-5 pb-5 font-ui text-[15px] leading-7 text-[#41546e] sm:px-6 sm:pb-6 sm:text-[16px]">
                    {faq.answer}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
