"use client";

import { useEffect, useRef } from "react";
import { SectionHeading } from "@/app/(site)/components/ui/section-heading";

export type LocationTestimonialsProps = {
  title: string;
  description: string;
  label: string;
  quoteImage?: string;
  starImage?: string;
  items: ReadonlyArray<{
    name: string;
    quote: string;
    stars: number;
    avatar?: string;
  }>;
};

type Item = LocationTestimonialsProps["items"][number];

function splitIntoColumns(items: ReadonlyArray<Item>) {
  const cols: [Item[], Item[], Item[]] = [[], [], []];
  items.forEach((item, index) => {
    cols[index % 3]?.push(item);
  });
  return cols;
}

function Star({ className = "" }: { className?: string }) {
  return (
    <svg
      className={["text-[#ff9900]", className].join(" ")}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
  );
}

function Stars({ count }: { count: number }) {
  const safe = Math.max(1, Math.min(5, count || 5));
  return (
    <div className="flex gap-1" aria-label={`${safe} out of 5 stars`}>
      {Array.from({ length: safe }).map((_, i) => (
        <Star key={i} className="h-4 w-4" />
      ))}
    </div>
  );
}

function TestimonialCard({ item }: { item: Item }) {
  const letter = item.name.trim().charAt(0).toUpperCase() || "R";
  return (
    <article className="rounded-[16px] border border-[#e4ebf5] bg-white p-5 shadow-[0_16px_34px_-28px_rgba(27,47,75,0.45)]">
      <p className="font-ui text-[15px] leading-7 text-[#41546e]">
        {item.quote}
      </p>
      <div className="mt-5 flex items-center gap-3">
        {item.avatar ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.avatar}
            alt={item.name}
            className="h-11 w-11 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#1368b9] font-ui text-[16px] font-semibold text-white">
            {letter}
          </div>
        )}
        <div className="min-w-0">
          <p className="font-ui truncate text-[16px] font-semibold text-[#1b2f4b]">
            {item.name}
          </p>
          <div className="mt-1">
            <Stars count={item.stars} />
          </div>
        </div>
      </div>
    </article>
  );
}

const CARD_GAP = 16; // matches gap-4

function Column({
  items,
  direction,
  durationSeconds,
}: {
  items: Item[];
  direction: "up" | "down";
  durationSeconds: number;
}) {
  if (!items.length) return null;
  const loop = [...items, ...items];

  const innerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const halfHeightRef = useRef(0);

  useEffect(() => {
    const el = innerRef.current;
    if (!el) return;

    // Measure the pixel height of the first half (N items + N gaps).
    // N gaps because flex gap also appears between the last card of copy 1
    // and the first card of copy 2.
    function measureHalfHeight() {
      const children = Array.from(el!.children) as HTMLElement[];
      const N = items.length;
      let h = 0;
      for (let i = 0; i < N; i++) {
        h += children[i]?.offsetHeight ?? 0;
      }
      halfHeightRef.current = h + N * CARD_GAP;
    }

    measureHalfHeight();
    const ro = new ResizeObserver(measureHalfHeight);
    ro.observe(el);

    let progress = 0;
    let lastTime: number | null = null;
    const totalMs = durationSeconds * 1000;

    function frame(now: number) {
      if (lastTime === null) lastTime = now;
      // Clamp dt so a hidden-tab resume doesn't cause a visible jump
      const dt = Math.min(now - lastTime, 100);
      lastTime = now;

      progress = (progress + dt / totalMs) % 1;

      const h = halfHeightRef.current;
      if (h > 0) {
        const ty = direction === "up" ? -progress * h : -(1 - progress) * h;
        el!.style.transform = `translateY(${ty}px)`;
      }

      rafRef.current = requestAnimationFrame(frame);
    }

    rafRef.current = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, [items, direction, durationSeconds]);

  return (
    <div className="relative h-[620px] overflow-hidden">
      <div ref={innerRef} className="flex flex-col gap-4 will-change-transform">
        {loop.map((item, index) => (
          <TestimonialCard key={`${item.name}-${index}`} item={item} />
        ))}
      </div>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent" />
    </div>
  );
}

export function LocationTestimonials({
  title,
  description,
  label,
  items,
}: LocationTestimonialsProps) {
  const [col1, col2, col3] = splitIntoColumns(items);

  return (
    <section className="bg-white px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-[1240px]">
        <SectionHeading title={title} description={description} />
        <div
          className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3"
          role="region"
          aria-label={label}
        >
          <Column items={col1} direction="up" durationSeconds={40} />
          <Column items={col2} direction="down" durationSeconds={44} />
          <Column items={col3} direction="up" durationSeconds={42} />
        </div>
      </div>
    </section>
  );
}
