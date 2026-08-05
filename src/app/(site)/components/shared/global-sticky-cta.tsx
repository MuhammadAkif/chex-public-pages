"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { useRegisterModal } from "@/app/(site)/components/home/register-modal";

export type GlobalStickyCtaProps = {
  /** Show the bar only after the user scrolls past this many pixels. */
  showAfter?: number;
};

/**
 * Site-wide persistent bottom conversion bar. Mounted once in the site layout so
 * it appears on every public page (home, locations, services, etc.) on phones and
 * tablets (below the 1024px `lg` breakpoint), pinned to the bottom once the visitor
 * scrolls past the hero. Clicking the button opens the "Start Your Inspection"
 * register modal.
 *
 * Routes that already ship their own sticky bar are excluded so the bar never
 * doubles up: blog detail pages (`/blogs/<slug>`) and the inspection-form page.
 */
export function GlobalStickyCta({ showAfter = 640 }: GlobalStickyCtaProps) {
  const pathname = usePathname();
  const { openModal } = useRegisterModal();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > showAfter);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [showAfter]);

  // Pages that opt out of the global sticky bar — either they ship their own
  // (inspection-form, blog detail) or don't want it (dsp-fleet-pricing).
  const hideStickyBar =
    pathname === "/inspection-form" ||
    pathname === "/dsp-fleet-pricing" ||
    pathname.startsWith("/blogs/");
  if (hideStickyBar) return null;

  return (
    <div
      role="region"
      aria-label="Inspection offer"
      className={`fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-[#010e2b]/95 px-4 py-3 backdrop-blur transition-transform duration-300 lg:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="mx-auto flex max-w-[560px] items-center justify-between gap-3">
        <span className="font-ui text-[13px] leading-4 text-white/80">
          Get inspected for as low as{" "}
          <span className="font-semibold text-white">$29.99</span>
        </span>
        <button
          type="button"
          onClick={openModal}
          className="shrink-0 cursor-pointer rounded-[8px] bg-[#ff7a01] px-5 py-2.5 font-ui text-[14px] font-bold text-white shadow-[0_14px_36px_-16px_rgba(255,122,1,0.9)] transition hover:brightness-105"
        >
          Start My Inspection
        </button>
      </div>
    </div>
  );
}
