"use client";

import { Button } from "@/app/(site)/components/ui/button";
import { useRegisterModal } from "@/app/(site)/components/home/register-modal";

type BlogCtaSidebarProps = {
  title: string;
  description: string;
  secondaryLabel: string;
};

// Vertical, narrow variant of HomeCallToAction used as a sticky sidebar next to
// the blog content. Shares the same gradient/copy but stacks in a single column.
export function BlogCtaSidebar({
  title,
  description,
  secondaryLabel,
}: BlogCtaSidebarProps) {
  const { openModal } = useRegisterModal();

  return (
    <div className="relative overflow-hidden rounded-[24px] bg-[radial-gradient(circle_at_50%_100%,rgba(19,104,185,0.9)_0%,rgba(19,104,185,0.2)_26%,rgba(255,122,1,0.35)_58%,rgba(27,28,32,1)_100%)] shadow-[0_40px_120px_-70px_rgba(19,104,185,0.8)]">
      <div className="absolute inset-0 bg-[#1b1c20]/60" />
      <div className="relative z-10 flex flex-col items-center px-6 py-8 text-center text-white">
        <h2 className="font-display text-[20px] font-bold leading-[1.25] tracking-tight text-white">
          {title}
        </h2>
        <p className="mt-3 font-ui text-[13px] leading-[1.6] text-white/85">
          {description}
        </p>
        <Button
          onClick={openModal}
          fullWidth
          className="mt-6 cursor-pointer"
        >
          {secondaryLabel}
        </Button>
      </div>
    </div>
  );
}
