"use client";

import { useEffect, useState } from "react";

export type StickyCtaProps = {
  label: string;
  href: string;
  /** Show the bar only after the user scrolls past this many pixels. */
  showAfter?: number;
};

/**
 * A persistent conversion bar for the long inspection-form page. Hidden until
 * the visitor scrolls past the hero, then pinned to the bottom on small/medium
 * screens where the hero CTA has scrolled out of view.
 */
export function StickyCta({ label, href, showAfter = 640 }: StickyCtaProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > showAfter);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [showAfter]);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-[#010e2b]/95 px-4 py-3 backdrop-blur transition-transform duration-300 lg:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="mx-auto flex max-w-[560px] items-center justify-between gap-3">
        <span className="font-ui text-[13px] leading-4 text-white/80">
          Same-day certificate ·{" "}
          <span className="font-semibold text-white">Pay only if you pass</span>
        </span>
        <a
          href={href}
          className="shrink-0 rounded-[8px] bg-[#ff7a01] px-5 py-2.5 font-ui text-[14px] font-bold text-white shadow-[0_14px_36px_-16px_rgba(255,122,1,0.9)] transition hover:brightness-105"
        >
          {label}
        </a>
      </div>
    </div>
  );
}
