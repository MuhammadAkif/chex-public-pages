import { InspectionSignupForm } from "@/app/(site)/components/inspection-form/inspection-signup-form";
import { SiteImage } from "@/app/(site)/components/shared/site-image";
import type { RidesharePricingSchedule } from "@/app/(site)/rideshare-pricing/content";

export function ScheduleInspection({
  schedule,
}: {
  schedule: RidesharePricingSchedule;
}) {
  return (
    <section
      id="signup"
      className="scroll-mt-24 bg-white px-4 py-16 sm:px-6 lg:px-10 lg:py-20"
    >
      <div className="mx-auto grid max-w-[1200px] items-stretch gap-8 lg:grid-cols-[1.75fr_1fr]">
        {/* Left — image card with overlay copy */}
        <div className="relative min-h-[440px] overflow-hidden rounded-[32px] border-[3px] border-[#ff7a01]/40 lg:min-h-[600px]">
          <SiteImage
            src={schedule.image}
            alt={schedule.imageAlt}
            className="absolute inset-0 h-full w-full scale-105 object-cover blur-[3px]"
          />
          {/* Blue tint — mirrors the Figma #1368b9 multiply overlay. */}
          <div className="absolute inset-0 bg-[#1368b9] opacity-80 mix-blend-multiply" />
          <div className="relative flex h-full items-center justify-center px-8 py-12 text-center">
            <p className="max-w-[520px] font-display text-[30px] leading-[1.4] tracking-[-0.02em] text-white lg:text-[42px] lg:leading-[1.35]">
              {schedule.textSegments.map((segment, index) => (
                <span
                  key={index}
                  className={segment.bold ? "font-black" : "font-normal"}
                >
                  {segment.text}
                </span>
              ))}
            </p>
          </div>
        </div>

        {/* Right — Start My Inspection form (reused from inspection-form page).
            `[&>div]:h-full` makes the form's root card fill the taller row so it
            matches the image height (orange bar stays pinned to the top). */}
        <div className="flex">
          <div className="w-full [&>div]:h-full">
            <InspectionSignupForm
              title={schedule.formTitle}
              subtitle={schedule.formSubtitle}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
