"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";

export type ThankYouPlan = {
  /** Plan name, e.g. "Starter". */
  name: string;
  /** Price label, e.g. "$99/month". */
  priceLabel: string;
  /** Inclusions label, e.g. "250 inspections included". */
  includedLabel: string;
};

const RECEIPT_PATH = "/api/v1/billing/checkout/receipt";

const APP_STORE_URL =
  "https://apps.apple.com/us/app/chex-inspection/id6473516316";
const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.chex_ai";

type ReceiptResponse = { hostedInvoiceUrl?: string; invoicePdf?: string };

type ThankYouModalProps = {
  plan: ThankYouPlan;
  /** Next billing date label, e.g. "Jul 17". Defaults to one month from today. */
  nextBilling?: string;
  /** Stripe checkout session id, used to fetch the receipt. */
  sessionId?: string;
  /** Bearer token (from signup) authorizing the receipt request. */
  receiptToken?: string;
  onClose: () => void;
  onGoToDashboard?: () => void;
  /** Overrides the default "redirect to the hosted invoice" behavior. */
  onViewReceipt?: () => void;
};

// Scattered confetti — a fixed set so the layout is deterministic (no random in
// render). Each entry positions/rotates one decorative chip in the header.
const CONFETTI: ReadonlyArray<{
  className: string;
  style: React.CSSProperties;
}> = [
  {
    className: "h-2 w-2 rounded-full bg-white/70",
    style: { top: "18%", left: "30%" },
  },
  {
    className: "h-1.5 w-1.5 rounded-full bg-white/60",
    style: { top: "62%", left: "20%" },
  },
  {
    className: "h-1.5 w-1.5 rounded-full bg-[#ffb066]",
    style: { top: "78%", left: "44%" },
  },
  {
    className: "h-2 w-2 rounded-full bg-[#ff7a01]",
    style: { top: "26%", left: "66%" },
  },
  {
    className: "h-3 w-1.5 rotate-[24deg] rounded-[1px] bg-[#ffb347]",
    style: { top: "30%", left: "12%" },
  },
  {
    className: "h-3 w-1.5 -rotate-[18deg] rounded-[1px] bg-[#ff7a01]",
    style: { top: "58%", left: "62%" },
  },
  {
    className: "h-3.5 w-1.5 rotate-[40deg] rounded-[1px] bg-[#ffc97a]",
    style: { top: "20%", left: "84%" },
  },
  {
    className: "h-2.5 w-[3px] -rotate-[30deg] rounded-[1px] bg-white/70",
    style: { top: "70%", left: "82%" },
  },
  {
    className: "h-2 w-2 rotate-45 bg-[#ffb347]",
    style: { top: "12%", left: "46%" },
  },
  {
    className: "h-2 w-2 rotate-45 bg-[#ff7a01]",
    style: { top: "46%", left: "8%" },
  },
  {
    className: "h-1.5 w-1.5 rounded-full bg-white/60",
    style: { top: "10%", left: "72%" },
  },
];

function NextStep({
  icon,
  title,
  subtitle,
  footer,
}: {
  icon: ReactNode;
  title: string;
  subtitle: string;
  footer?: ReactNode;
}) {
  return (
    <div className="flex flex-col rounded-[12px] border border-[#e7edf6] bg-white px-4 py-4">
      <span className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-[#eef4fb] text-[#1368b9]">
        {icon}
      </span>
      <p className="mt-3 font-display text-[13px] font-bold text-[#1b2f4b]">
        {title}
      </p>
      <p className="mt-0.5 font-ui text-[11px] text-[#64748b]">{subtitle}</p>
      {footer && <div className="mt-auto pt-2.5">{footer}</div>}
    </div>
  );
}

function formatNextBilling(): string {
  const d = new Date();
  d.setMonth(d.getMonth() + 1);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function ThankYouModal({
  plan,
  nextBilling,
  sessionId,
  receiptToken,
  onClose,
  onGoToDashboard,
  onViewReceipt,
}: ThankYouModalProps) {
  const [receiptUrl, setReceiptUrl] = useState<string | null>(null);

  // Only the close (✕) button dismisses this modal — no backdrop click or
  // Escape — so we just lock body scroll while it's open.
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  // While the success modal is open, fetch the Stripe receipt so "View Receipt"
  // can jump straight to the hosted invoice.
  useEffect(() => {
    const base = process.env.NEXT_PUBLIC_DSP_BACKEND_URL;
    if (!base || !sessionId || !receiptToken) return;

    const controller = new AbortController();
    fetch(
      `${base}${RECEIPT_PATH}?session_id=${encodeURIComponent(sessionId)}`,
      {
        headers: {
          accept: "application/json",
          authorization: `Bearer ${receiptToken}`,
        },
        signal: controller.signal,
      },
    )
      .then((res) => (res.ok ? (res.json() as Promise<ReceiptResponse>) : null))
      .then((data) => {
        if (data?.hostedInvoiceUrl) setReceiptUrl(data.hostedInvoiceUrl);
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError")
          return;
      });

    return () => controller.abort();
  }, [sessionId, receiptToken]);

  const billing = nextBilling ?? formatNextBilling();

  // Free plans skip Stripe checkout, so there's no receipt to show — only offer
  // it when a session id (or an explicit override) gives us something to open.
  const canViewReceipt = Boolean(onViewReceipt) || Boolean(sessionId);

  // Open the Stripe hosted invoice in a new tab (overridable via onViewReceipt)
  // so this success modal stays open when the user returns.
  function viewReceipt() {
    if (onViewReceipt) {
      onViewReceipt();
      return;
    }
    if (receiptUrl) window.open(receiptUrl, "_blank", "noopener,noreferrer");
  }

  // Go to the dashboard app (overridable via onGoToDashboard). Opens in a new
  // tab so this success modal stays open when the user returns.
  function goToDashboard() {
    if (onGoToDashboard) {
      onGoToDashboard();
      return;
    }
    const dashboardUrl = `${process.env.NEXT_PUBLIC_DASHBOARD_URL}/#/login`;
    if (dashboardUrl) {
      window.open(dashboardUrl, "_blank", "noopener,noreferrer");
    } else {
      onClose();
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-[#0a1f4d]/55 px-4 py-8 backdrop-blur-sm">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="thank-you-title"
        className="relative my-auto w-full max-w-[680px] overflow-hidden rounded-[20px] bg-white shadow-[0_40px_120px_-40px_rgba(15,23,42,0.5)]"
      >
        {/* ── Decorative header ── */}
        <div className="relative h-[232px] overflow-hidden bg-[#0a2c58]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_30%,#2f80d6_0%,#1c66ba_36%,#11447f_66%,#0a2c58_100%)]" />
          <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(to_bottom,transparent_0px,transparent_31px,rgba(255,255,255,0.05)_31px,rgba(255,255,255,0.05)_32px)]" />

          {/* Confetti */}
          {CONFETTI.map((c, i) => (
            <span
              key={i}
              className={`pointer-events-none absolute ${c.className}`}
              style={c.style}
            />
          ))}

          {/* Close */}
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="absolute right-4 top-4 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition-colors hover:bg-white/25"
          >
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>

          {/* Success badge */}
          <div className="absolute left-1/2 top-1/2 flex h-[128px] w-[128px] -translate-x-1/2 -translate-y-1/2 items-center justify-center">
            <span className="absolute inset-0 rounded-full border border-dashed border-white/40" />
            <span className="flex h-[100px] w-[100px] items-center justify-center rounded-full bg-white/10 ring-1 ring-white/15">
              <span className="flex h-[84px] w-[84px] items-center justify-center rounded-full bg-[#22a45d] shadow-[0_16px_36px_-12px_rgba(34,164,93,0.9)] ring-[6px] ring-white">
                <svg
                  className="h-9 w-9 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="m5 12.5 4.5 4.5L19 7" />
                </svg>
              </span>
            </span>
          </div>
        </div>

        {/* ── Body ── */}
        <div className="px-6 pb-8 pt-7 sm:px-10">
          <div className="flex flex-col items-center text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#e9f8ef] px-3 py-1.5">
              <svg
                className="h-3.5 w-3.5 text-[#16a34a]"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm-1 14-4-4 1.4-1.4L11 13.2l5.6-5.6L18 9l-7 7Z" />
              </svg>
              <span className="font-display text-[12px] font-bold tracking-wide text-[#16a34a]">
                ACCOUNT CREATED
              </span>
            </span>

            <h2
              id="thank-you-title"
              className="mt-5 font-display text-[32px] font-bold leading-[1.15] text-[#1b2f4b] sm:text-[38px]"
            >
              Thank You for Joining{" "}
              <span className="text-[#ff7a01]">Chex.ai!</span>
            </h2>

            <p className="mt-4 max-w-md font-ui text-[15px] leading-relaxed text-[#475569]">
              Your {plan.name} Plan is now active. We&apos;ve sent a
              confirmation email with your login details &amp; getting started
              guide.
            </p>
          </div>

          {/* Plan summary */}
          <div className="mt-7 flex items-center gap-4 rounded-[14px] border border-[#ffe2c4] bg-[#fff7ed] px-4 py-4 sm:px-5">
            <span
              className="flex h-[52px] w-[52px] flex-none items-center justify-center rounded-[12px] text-white"
              style={{ backgroundColor: "#ff7a01" }}
            >
              <svg
                className="h-7 w-7"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="m5 12.5 4.5 4.5L19 7" />
              </svg>
            </span>

            <div className="min-w-0 flex-1">
              <p className="font-display text-[10px] font-bold tracking-wide text-[#94a3b8]">
                YOUR PLAN
              </p>
              <p className="font-display text-[18px] font-bold text-[#1b2f4b]">
                {plan.name} Plan · Active
              </p>
              <p className="mt-0.5 truncate font-ui text-[13px] text-[#475569]">
                {plan.priceLabel} · {plan.includedLabel} · Next billing:{" "}
                {billing}
              </p>
            </div>

            <span className="inline-flex flex-none items-center gap-1.5 rounded-full bg-[#172a4a] px-3 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#22c55e]" />
              <span className="font-display text-[11px] font-bold text-white">
                LIVE
              </span>
            </span>
          </div>

          {/* What's next */}
          <p className="mt-7 font-display text-[14px] font-bold text-[#1b2f4b]">
            What&apos;s Next?
          </p>
          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            <NextStep
              title="Check your email"
              subtitle="Login details sent"
              icon={
                <svg
                  className="h-[18px] w-[18px]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="m3 7 9 6 9-6" />
                </svg>
              }
            />
            <NextStep
              title="Download the app"
              subtitle="iOS & Android ready"
              icon={
                <svg
                  className="h-[18px] w-[18px]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="7" y="2.5" width="10" height="19" rx="2.5" />
                  <path d="M11 18.5h2" />
                </svg>
              }
              footer={
                <div className="flex flex-wrap gap-1.5">
                  <a
                    href={APP_STORE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded-[8px] border border-[#e7edf6] px-2 py-1 font-ui text-[11px] font-semibold text-[#1b2f4b] transition-colors hover:border-[#1368b9] hover:text-[#1368b9]"
                  >
                    <svg
                      className="h-3 w-3"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M16.4 12.7c0-2 1.6-3 1.7-3a3.7 3.7 0 0 0-2.9-1.6c-1.2-.1-2.4.7-3 .7s-1.6-.7-2.6-.7a3.9 3.9 0 0 0-3.3 2c-1.4 2.5-.4 6.1 1 8.1.7 1 1.5 2.1 2.5 2 1-.04 1.4-.65 2.6-.65s1.6.65 2.6.63c1.1-.02 1.8-1 2.4-2a8.8 8.8 0 0 0 1.1-2.3c-.03-.01-2.1-.81-2.1-3.2ZM14.5 6a3.6 3.6 0 0 0 .82-2.6 3.66 3.66 0 0 0-2.37 1.23A3.43 3.43 0 0 0 12.1 7.2 3.03 3.03 0 0 0 14.5 6Z" />
                    </svg>
                    iOS
                  </a>
                  <a
                    href={PLAY_STORE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded-[8px] border border-[#e7edf6] px-2 py-1 font-ui text-[11px] font-semibold text-[#1b2f4b] transition-colors hover:border-[#1368b9] hover:text-[#1368b9]"
                  >
                    <svg
                      className="h-3 w-3"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M3.6 2.3c-.2.2-.3.5-.3.9v17.6c0 .4.1.7.3.9l.1.1L13.4 12v-.2L3.7 2.2l-.1.1Zm13.1 13-2.2-2.2v-.2l2.2-2.2.05.03 2.6 1.5c.74.42.74 1.1 0 1.53l-2.6 1.5-.05.06Zm-.5.5L13.9 13l-9.6 9.6c.25.26.66.3 1.12.04l11-6.3-.2-.14Zm0-7.6-11-6.3c-.46-.27-.87-.22-1.12.04L13.9 11l2.3-2.3Z" />
                    </svg>
                    Android
                  </a>
                </div>
              }
            />
            <NextStep
              title="Start inspecting"
              subtitle="Add your first vehicle"
              icon={
                <svg
                  className="h-[18px] w-[18px]"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M5 11.2 6.4 7A2.2 2.2 0 0 1 8.5 5.5h7A2.2 2.2 0 0 1 17.6 7L19 11.2l.9.8a1.6 1.6 0 0 1 .6 1.2V17a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-.7H6.5V17a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-3.8c0-.46.2-.9.6-1.2l.9-.8Zm2.3-1.2h9.4l-1-3.1a.6.6 0 0 0-.6-.4H8.9a.6.6 0 0 0-.6.4l-1 3.1ZM7 13a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Zm10 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z" />
                </svg>
              }
            />
          </div>

          {/* CTAs */}
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={goToDashboard}
              className="inline-flex min-h-12 flex-1 cursor-pointer items-center justify-center gap-2 rounded-[12px] px-6 font-ui text-[15px] font-bold text-white transition hover:brightness-105"
              style={{ backgroundColor: "#ff7a01" }}
            >
              Go to Dashboard
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>
            {canViewReceipt && (
              <button
                type="button"
                onClick={viewReceipt}
                disabled={!onViewReceipt && !receiptUrl}
                className="inline-flex min-h-12 flex-1 cursor-pointer items-center justify-center rounded-[12px] border border-[#d7e3f4] bg-white px-6 font-ui text-[15px] font-bold text-[#1b2f4b] transition hover:border-[#1368b9] disabled:cursor-not-allowed disabled:opacity-50"
              >
                View Receipt
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
