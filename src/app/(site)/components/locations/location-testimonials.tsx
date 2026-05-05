"use client";

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
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#1368b9] font-ui text-[16px] font-semibold text-white">
          {letter}
        </div>
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
  const animationName = direction === "up" ? "locLoveUp" : "locLoveDown";

  return (
    <div className="relative h-[620px] overflow-hidden">
      <div
        className="flex flex-col gap-4 will-change-transform"
        style={{
          animation: `${animationName} ${durationSeconds}s linear infinite`,
        }}
      >
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

      <style jsx global>{`
        @keyframes locLoveUp {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(calc(-50% - 8px));
          }
        }

        @keyframes locLoveDown {
          0% {
            transform: translateY(calc(-50% - 8px));
          }
          100% {
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
