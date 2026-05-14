"use client";

import { useEffect, useState } from "react";

export type CustomerReview = {
  reviewText: string;
  reviewerName: string;
  ratingStar: number;
};

export type CustomerReviewsProps = {
  title: string;
  subtitle: string;
  reviews: ReadonlyArray<CustomerReview>;
};

function useReviewsPerView() {
  const [perView, setPerView] = useState(2);

  useEffect(() => {
    const update = () => {
      if (typeof window === "undefined") return;
      setPerView(window.innerWidth >= 768 ? 2 : 1);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return perView;
}

export function CustomerReviews({
  title,
  subtitle,
  reviews,
}: CustomerReviewsProps) {
  const perView = useReviewsPerView();
  const [start, setStart] = useState(0);

  if (!reviews.length) return null;

  const maxStart = Math.max(0, reviews.length - perView);
  const safeStart = Math.min(start, maxStart);
  const visible = reviews.slice(safeStart, safeStart + perView);

  const onPrev = () => setStart((s) => Math.max(0, s - 1));
  const onNext = () => setStart((s) => Math.min(maxStart, s + 1));

  return (
    <section className="bg-white px-4 py-16 sm:px-6 lg:px-10 lg:py-20">
      <div className="mx-auto max-w-[1240px] text-center">
        <h2 className="font-display text-[32px] font-bold leading-tight text-[#1b2f4b] sm:text-[40px]">
          {title}
        </h2>
        <p className="mt-4 font-ui text-[16px] text-[#41546e] sm:text-[18px]">
          {subtitle}
        </p>

        <div className="relative mt-10">
          <div className="grid gap-6 md:grid-cols-2">
            {visible.map((review, idx) => (
              <article
                key={`${review.reviewerName}-${safeStart + idx}`}
                className="flex h-full flex-col rounded-[16px] border border-[#e5edf7] bg-white p-6 text-left shadow-[0_22px_60px_-40px_rgba(20,104,186,0.4)] sm:p-8"
              >
                <div className="font-ui tracking-[0.3em] text-[#ff7a01]">
                  {"★".repeat(Math.max(1, Math.min(5, review.ratingStar)))}
                </div>
                <p className="mt-4 flex-1 font-ui text-[15px] leading-7 text-[#41546e] sm:text-[16px]">
                  {review.reviewText}
                </p>
                <p className="mt-5 font-ui text-[16px] font-semibold text-[#1b2f4b]">
                  {review.reviewerName}
                </p>
              </article>
            ))}
          </div>

          {reviews.length > perView ? (
            <div className="mt-8 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={onPrev}
                disabled={safeStart === 0}
                aria-label="Previous reviews"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#d7e3f4] bg-white text-[#1b2f4b] transition-colors hover:border-[#1368b9] hover:text-[#1368b9] disabled:opacity-40"
              >
                ←
              </button>
              <button
                type="button"
                onClick={onNext}
                disabled={safeStart >= maxStart}
                aria-label="Next reviews"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#d7e3f4] bg-white text-[#1b2f4b] transition-colors hover:border-[#1368b9] hover:text-[#1368b9] disabled:opacity-40"
              >
                →
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
