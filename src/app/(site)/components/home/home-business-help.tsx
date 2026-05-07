"use client";

import { useEffect, useRef } from "react";
import {
  SiteImage,
  type SiteImageSource,
} from "@/app/(site)/components/shared/site-image";
import { Button } from "@/app/(site)/components/ui/button";

// Add more cards here to extend the scroller
const BUSINESS_CARDS = [
  {
    image:
      "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/reviews%20card-1.png",
    quoteBefore: "Fast and easy!... Received my certificate ",
    quoteHighlight: "within 5 minutes",
    quoteAfter: " after submitting the inspection.",
    name: "Cary Gillies",
    role: "Founder: @XYZ",
  },
  {
    image:
      "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/reviews%20card-2.png",
    quoteBefore:
      "Great fast service! Beats going all over town when you can have your ",
    quoteHighlight: "inspection immediately from home.",
    quoteAfter: "",
    name: "Kent Malveaux",
    role: "Founder: @XYZ",
  },
  {
    image:
      "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/reviews%20card-3-1.png",
    quoteBefore:
      "Super fast and work with Uber and Lyft! 5 stars and would highly recommend",
    quoteHighlight: "5 stars",
    quoteAfter: "",
    name: "Kent Malveaux",
    role: "Founder: @XYZ",
  },
  {
    image:
      "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/reviews%20card-4.png",
    quoteBefore: "Thank you for your assistance....",
    quoteHighlight: "assistance",
    quoteAfter: "",
    name: "Venessa Fairley",
    role: "Founder: @XYZ",
  },
  {
    image:
      "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/reviews%20card-5.png",
    quoteBefore: "Smooth transaction. Will definitely use again.",
    quoteHighlight: "use again",
    quoteAfter: "",
    name: "Manuel beronilla",
    role: "Founder: @XYZ",
  },
  {
    image:
      "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/reviews%20card-6.png",
    quoteBefore: "Quick cheap and easy with same day results - tough to beat.",
    quoteHighlight: "tough to beat",
    quoteAfter: "",
    name: "Armando Valencia",
    role: "Founder: @XYZ",
  },
];

const CARD_GAP = 16; // gap-4

function ImageDragger({ cards }: { cards: typeof BUSINESS_CARDS }) {
  const loop = [...cards, ...cards];
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const halfWidthRef = useRef(0);
  const progressRef = useRef(0);
  const isPausedRef = useRef(false);
  const dragStartX = useRef(0);
  const dragStartProgress = useRef(0);

  useEffect(() => {
    const el = innerRef.current;
    if (!el) return;

    function measureHalfWidth() {
      const children = Array.from(el!.children) as HTMLElement[];
      const N = cards.length;
      let w = 0;
      for (let i = 0; i < N; i++) w += children[i]?.offsetWidth ?? 0;
      halfWidthRef.current = w + N * CARD_GAP;
    }

    measureHalfWidth();
    const ro = new ResizeObserver(measureHalfWidth);
    ro.observe(el);

    let lastTime: number | null = null;
    const totalMs = 42000;

    function frame(now: number) {
      if (lastTime === null) lastTime = now;
      const dt = Math.min(now - lastTime, 100);
      lastTime = now;

      if (!isPausedRef.current) {
        progressRef.current = (progressRef.current + dt / totalMs) % 1;
      }

      const h = halfWidthRef.current;
      if (h > 0) {
        el!.style.transform = `translateX(${-progressRef.current * h}px)`;
      }

      rafRef.current = requestAnimationFrame(frame);
    }

    rafRef.current = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, [cards]);

  function onMouseDown(e: React.MouseEvent) {
    isPausedRef.current = true;
    dragStartX.current = e.clientX;
    dragStartProgress.current = progressRef.current;
    outerRef.current?.classList.replace("cursor-grab", "cursor-grabbing");
  }

  function onMouseMove(e: React.MouseEvent) {
    if (!isPausedRef.current) return;
    const dx = dragStartX.current - e.clientX;
    const h = halfWidthRef.current;
    if (h > 0) {
      progressRef.current = ((dragStartProgress.current + dx / h) % 1 + 1) % 1;
    }
  }

  function stopDrag() {
    isPausedRef.current = false;
    outerRef.current?.classList.replace("cursor-grabbing", "cursor-grab");
  }

  return (
    <div
      ref={outerRef}
      className="cursor-grab overflow-hidden"
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={stopDrag}
      onMouseLeave={stopDrag}
    >
      <div ref={innerRef} className="flex gap-4 will-change-transform select-none">
        {loop.map((card, index) => (
          <div
            key={index}
            className="relative w-[400px] flex-none overflow-hidden rounded-[20px] xl:w-[430px]"
          >
            <SiteImage
              src={card.image}
              alt={card.name}
              className="pointer-events-none h-auto w-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 rounded-b-[20px] bg-gradient-to-t from-black/85 via-black/60 to-transparent px-8 pb-10 pt-16 text-white">
              <p className="font-ui text-[20px] leading-[1.3]">
                {card.quoteBefore}
                <span className="text-[#1488ff]">{card.quoteHighlight}</span>
                {card.quoteAfter}
              </p>
              <p className="font-ui mt-4 text-[28px] font-semibold leading-none">
                {card.name}
              </p>
              <p className="font-ui mt-2 text-[18px] leading-none text-white/70">
                {card.role}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

type HomeBusinessHelpProps = {
  title: string;
  description: string;
  buttonLabel: string;
  image: SiteImageSource;
};

export function HomeBusinessHelp({
  title,
  description,
  buttonLabel,
}: HomeBusinessHelpProps) {
  return (
    <section
      id="business-help"
      className="overflow-hidden pb-16 pt-20 lg:pb-24 lg:pt-28"
    >
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-10">
        <div className="grid items-center gap-10 lg:grid-cols-[0.4fr_0.6fr] lg:gap-12">
          <div className="relative min-w-0">
            <div className="pointer-events-none absolute -left-10 top-1/2 h-56 w-56 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,_rgba(255,122,1,0.3)_0%,_rgba(255,122,1,0)_72%)] blur-2xl" />
            <h2 className="type-section-heading max-w-xl text-white">
              {title}
            </h2>
            <p className="type-body-lg mt-8 max-w-xl text-white/80">
              {description}
            </p>
            <div className="mt-10">
              <Button href="#footer">{buttonLabel}</Button>
            </div>
          </div>

          <div
            className="relative min-w-0 shadow-[0_40px_120px_-60px_rgba(19,104,185,0.6)]"
            style={{
              marginRight: "calc(-1 * max(0px, (100vw - 1240px) / 2))",
            }}
          >
            <ImageDragger cards={BUSINESS_CARDS} />
            <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#07132d] to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
