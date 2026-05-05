"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import {
  SiteImage,
  type SiteImageSource,
} from "@/app/(site)/components/shared/site-image";
import { Button } from "@/app/(site)/components/ui/button";

type NavbarProps = {
  logo: SiteImageSource;
  links: ReadonlyArray<{
    label: string;
    href: string;
    active?: boolean;
  }>;
};

export function Navbar({ logo, links }: NavbarProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const inspectionHref =
    pathname?.startsWith("/locations/") ? "#signup" : "/home#business-help";

  useEffect(() => {
    const updateScrollState = () => {
      setIsScrolled(window.scrollY > 0);
    };

    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateScrollState);
    };
  }, []);

  return (
    <div
      className={`border-b border-white/60 bg-white/82 backdrop-blur-xl transition-shadow duration-200 ${
        isScrolled
          ? "shadow-[0_16px_40px_-28px_rgba(27,47,75,0.55)]"
          : "shadow-none"
      }`}
    >
      <div className="mx-auto flex max-w-[1240px] items-center justify-between gap-6 px-4 py-4 sm:px-6 lg:px-10">
        <a href="/home" className="shrink-0">
          <SiteImage
            src={logo}
            alt="Chex.AI"
            className="h-11 w-auto"
            priority
          />
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((link) => {
            const isActive = Boolean(link.active) && pathname === "/home";

            return (
              <a
                key={link.label}
                href={link.href}
                className={`type-nav transition-colors ${
                  isActive
                    ? "rounded-[4px] bg-[#fff1e5] px-4 py-2 text-[#ff7a01]"
                    : "text-[#41546e] hover:text-[#1b2f4b]"
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        <div className="hidden lg:block">
          <Button href={inspectionHref} size="sm">
            Start My Inspection
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#d7e3f4] bg-white text-[#1b2f4b] lg:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((current) => !current)}
        >
          <span className="relative h-4 w-5">
            <span className="absolute left-0 top-0 h-0.5 w-5 bg-current" />
            <span className="absolute left-0 top-[7px] h-0.5 w-5 bg-current" />
            <span className="absolute left-0 top-[14px] h-0.5 w-5 bg-current" />
          </span>
        </button>
      </div>

      {menuOpen ? (
        <div className="border-t border-[#d7e3f4] bg-white px-4 py-4 lg:hidden">
          <nav className="flex flex-col gap-3">
            {links.map((link) => {
              const isActive = Boolean(link.active) && pathname === "/home";

              return (
                <a
                  key={link.label}
                  href={link.href}
                  className={`type-nav rounded-[10px] px-4 py-3 ${
                    isActive
                      ? "bg-[#fff1e5] text-[#ff7a01]"
                      : "bg-[#f4f8ff] text-[#41546e]"
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              );
            })}
            <Button href={inspectionHref} fullWidth>
              Start My Inspection
            </Button>
          </nav>
        </div>
      ) : null}
    </div>
  );
}
