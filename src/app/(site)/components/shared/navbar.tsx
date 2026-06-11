"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Route } from "next";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";

import {
  SiteImage,
  type SiteImageSource,
} from "@/app/(site)/components/shared/site-image";
import { Button } from "@/app/(site)/components/ui/button";
import { useRegisterModal } from "@/app/(site)/components/home/register-modal";

type NavChild = { label: string; href: string; comingSoon?: boolean };

function ComingSoonBadge() {
  return (
    <span className="ml-2 shrink-0 rounded-full bg-[#fff1e5] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[#ff7a01]">
      Coming soon
    </span>
  );
}
type NavLink = {
  label: string;
  href: string;
  active?: boolean;
  children?: ReadonlyArray<NavChild>;
};

type NavbarProps = {
  logo: SiteImageSource;
  links: ReadonlyArray<NavLink>;
};

// `useSyncExternalStore` returns the server snapshot during SSR and the client
// snapshot after hydration — the React 19-recommended way to detect "are we
// mounted on the client?" without an effect-driven setState.
const subscribeNoop = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

function isHrefActive(href: string, pathname: string | null): boolean {
  if (!pathname) return false;
  if (!href || href === "#") return false;
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function isLinkActive(link: NavLink, pathname: string | null): boolean {
  if (isHrefActive(link.href, pathname)) return true;
  return Boolean(link.children?.some((child) => isHrefActive(child.href, pathname)));
}

function DropdownItem({ link, pathname }: { link: NavLink; pathname: string | null }) {
  const [open, setOpen] = useState(false);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelClose = () => {
    if (closeTimerRef.current !== null) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const openNow = () => {
    cancelClose();
    setOpen(true);
  };

  const scheduleClose = () => {
    cancelClose();
    closeTimerRef.current = setTimeout(() => {
      closeTimerRef.current = null;
      setOpen(false);
    }, 120);
  };

  useEffect(() => cancelClose, []);

  const isActive = isLinkActive(link, pathname);

  return (
    <div
      className="relative"
      onMouseEnter={openNow}
      onMouseLeave={scheduleClose}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        onFocus={openNow}
        onBlur={scheduleClose}
        aria-expanded={open}
        aria-haspopup="menu"
        className={`type-nav flex items-center gap-1 transition-colors ${
          isActive
            ? "rounded-[4px] bg-[#fff1e5] px-4 py-2 text-[#ff7a01]"
            : "text-[#41546e] hover:text-[#1b2f4b]"
        }`}
      >
        {link.label}
        <svg
          className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div className="absolute left-0 top-full z-50 pt-2">
          <div className="w-max min-w-[12rem] overflow-hidden rounded-[12px] border border-[#e4ebf5] bg-white py-1.5 shadow-[0_20px_50px_-16px_rgba(27,47,75,0.25)]">
            {link.children?.map((child) =>
              child.comingSoon ? (
                <div
                  key={child.label}
                  className="flex cursor-default items-center justify-between gap-3 whitespace-nowrap px-4 py-2.5 font-ui text-[14px] text-[#9aa7b8]"
                >
                  {child.label}
                  <ComingSoonBadge />
                </div>
              ) : (
                <Link
                  key={child.label}
                  href={child.href as Route}
                  className="block whitespace-nowrap px-4 py-2.5 font-ui text-[14px] text-[#41546e] transition-colors hover:bg-[#f4f8ff] hover:text-[#1b2f4b]"
                  onClick={() => setOpen(false)}
                >
                  {child.label}
                </Link>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export function Navbar({ logo, links }: NavbarProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [navBottom, setNavBottom] = useState(0);
  const headerRef = useRef<HTMLDivElement>(null);
  const { openModal } = useRegisterModal();
  const isLocationsPage = pathname?.startsWith("/locations/");
  const inspectionHref = isLocationsPage ? "#signup" : undefined;
  const onInspectionClick = isLocationsPage ? undefined : openModal;
  const loginHref = `${process.env.NEXT_PUBLIC_RIDESHAIR_APP_BASE_LINK ?? ""}/login`;

  const mounted = useSyncExternalStore(subscribeNoop, getClientSnapshot, getServerSnapshot);

  // Reset the mobile menu when the route changes. React's recommended pattern
  // for "reset state on prop change" is to compare against the previous value
  // during render — this avoids the effect-driven setState that React 19's
  // linter (correctly) flags as a source of cascading renders.
  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setMenuOpen(false);
    setMobileDropdown(null);
  }

  useEffect(() => {
    const updateScrollState = () => setIsScrolled(window.scrollY > 0);
    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    return () => window.removeEventListener("scroll", updateScrollState);
  }, []);

  // Track where the navbar ends in the viewport so the portaled mobile panel
  // can be pinned right below it (the sticky parent is at the top of the page).
  useEffect(() => {
    if (!menuOpen) return;
    const update = () => {
      const rect = headerRef.current?.getBoundingClientRect();
      if (rect) setNavBottom(rect.bottom);
    };
    update();
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("resize", update);
    };
  }, [menuOpen]);

  // Lock scroll using the position:fixed pattern so the page doesn't visually
  // jump when the menu opens (overflow:hidden alone causes shifts on iOS).
  useEffect(() => {
    if (!menuOpen) return;
    const scrollY = window.scrollY;
    const body = document.body;
    const prev = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
      overflow: body.style.overflow,
    };
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    body.style.overflow = "hidden";
    return () => {
      body.style.position = prev.position;
      body.style.top = prev.top;
      body.style.left = prev.left;
      body.style.right = prev.right;
      body.style.width = prev.width;
      body.style.overflow = prev.overflow;
      window.scrollTo(0, scrollY);
    };
  }, [menuOpen]);

  return (
    <div
      ref={headerRef}
      className={`relative border-b border-white/60 bg-white/82 backdrop-blur-xl transition-shadow duration-200 ${
        isScrolled ? "shadow-[0_16px_40px_-28px_rgba(27,47,75,0.55)]" : "shadow-none"
      }`}
    >
      <div className="mx-auto flex max-w-[1240px] items-center justify-between gap-6 px-4 py-4 sm:px-6 lg:px-10">
        <Link href="/" className="shrink-0">
          <SiteImage src={logo} alt="Chex.AI" className="h-11 w-auto" priority />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((link) =>
            link.children?.length ? (
              <DropdownItem key={link.label} link={link} pathname={pathname} />
            ) : (
              <Link
                key={link.label}
                href={link.href as Route}
                className={`type-nav transition-colors ${
                  isLinkActive(link, pathname)
                    ? "rounded-[4px] bg-[#fff1e5] px-4 py-2 text-[#ff7a01]"
                    : "text-[#41546e] hover:text-[#1b2f4b]"
                }`}
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Button href={loginHref} variant="outline" size="sm" className="cursor-pointer">
            Login
          </Button>
          <Button href={inspectionHref} onClick={onInspectionClick} size="sm" className="cursor-pointer">
            Start My Inspection
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#d7e3f4] bg-white text-[#1b2f4b] lg:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span className="relative h-4 w-5">
            <span className="absolute left-0 top-0 h-0.5 w-5 bg-current" />
            <span className="absolute left-0 top-[7px] h-0.5 w-5 bg-current" />
            <span className="absolute left-0 top-[14px] h-0.5 w-5 bg-current" />
          </span>
        </button>
      </div>

      {/* Mobile menu — portaled to body so it escapes the sticky/relative
          stacking contexts and reliably overlays page content. */}
      {mounted && menuOpen &&
        createPortal(
          <div className="lg:hidden">
            <div
              style={{ top: navBottom }}
              className="fixed inset-x-0 bottom-0 z-80 bg-black/50"
              onClick={() => setMenuOpen(false)}
              aria-hidden="true"
            />
            <div
              style={{ top: navBottom, maxHeight: `calc(100dvh - ${navBottom}px)` }}
              className="fixed inset-x-0 z-81 overflow-y-auto overscroll-contain border-t border-[#d7e3f4] bg-white px-4 py-4 shadow-[0_20px_50px_-16px_rgba(27,47,75,0.25)]"
            >
              <nav className="flex flex-col gap-1">
            {links.map((link) =>
              link.children?.length ? (
                <div key={link.label}>
                  <button
                    type="button"
                    className="flex w-full items-center justify-between rounded-[10px] bg-[#f4f8ff] px-4 py-3 font-ui text-[#41546e]"
                    onClick={() =>
                      setMobileDropdown((v) => (v === link.label ? null : link.label))
                    }
                  >
                    {link.label}
                    <svg
                      className={`h-3.5 w-3.5 transition-transform ${mobileDropdown === link.label ? "rotate-180" : ""}`}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  {mobileDropdown === link.label && (
                    <div className="ml-4 mt-1 flex flex-col gap-0.5">
                      {link.children.map((child) =>
                        child.comingSoon ? (
                          <div
                            key={child.label}
                            className="flex cursor-default items-center justify-between rounded-[8px] px-4 py-2.5 font-ui text-[14px] text-[#9aa7b8]"
                          >
                            {child.label}
                            <ComingSoonBadge />
                          </div>
                        ) : (
                          <Link
                            key={child.label}
                            href={child.href as Route}
                            className="rounded-[8px] px-4 py-2.5 font-ui text-[14px] text-[#41546e] hover:bg-[#f4f8ff] hover:text-[#1b2f4b]"
                            onClick={() => setMenuOpen(false)}
                          >
                            {child.label}
                          </Link>
                        )
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.label}
                  href={link.href as Route}
                  className={`type-nav rounded-[10px] px-4 py-3 ${
                    isLinkActive(link, pathname)
                      ? "bg-[#fff1e5] text-[#ff7a01]"
                      : "bg-[#f4f8ff] text-[#41546e]"
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              )
            )}
            <Button href={loginHref} variant="outline" fullWidth className="cursor-pointer mt-2">
              Login
            </Button>
            <Button href={inspectionHref} onClick={onInspectionClick} fullWidth className="cursor-pointer mt-2">
              Start My Inspection
            </Button>
              </nav>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
