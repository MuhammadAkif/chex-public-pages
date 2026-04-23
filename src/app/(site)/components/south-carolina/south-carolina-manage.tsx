'use client'
/* eslint-disable @next/next/no-img-element */

import { Button } from '@/app/(site)/components/ui/button'

type SouthCarolinaManageProps = {
  title: string
  bullets: ReadonlyArray<string>
  buttonLabel: string
  frameImage: string
  screenImage: string
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="12" fill="#1368b9" />
      <path
        d="m7.5 12.2 2.9 2.9 6.1-6.2"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function SouthCarolinaManage({
  title,
  bullets,
  buttonLabel,
  frameImage,
  screenImage,
}: SouthCarolinaManageProps) {
  return (
    <section className="bg-white px-4 pb-20 sm:px-6 lg:px-10 lg:pb-28">
      <div className="mx-auto grid max-w-[1240px] items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="relative mx-auto w-full max-w-[520px]">
          <div className="absolute right-2 top-16 h-36 w-52 rounded-[8px] bg-[#1362b2] shadow-[0_12px_12px_0_rgba(0,0,0,0.02)]" />
          <div className="absolute bottom-12 left-0 h-28 w-36 rounded-[6px] bg-[#1364b4] shadow-[0_12px_12px_0_rgba(0,0,0,0.02)]" />
          <div className="relative mx-auto h-[380px] max-w-[230px] overflow-hidden rounded-[20px] bg-white shadow-[0_24px_80px_-40px_rgba(27,47,75,0.65)]">
            <img src={frameImage} alt="Chex mobile inspection app" className="absolute inset-0 h-full w-full object-cover" />
            <img
              src={screenImage}
              alt=""
              className="absolute left-[-154px] top-[72px] h-[186px] w-[252px] max-w-none rounded-[14px] object-cover opacity-95"
            />
          </div>
          <div className="absolute right-0 top-24 max-w-[206px] rounded-[8px] bg-[#1362b2] p-5 text-white">
            <p className="font-display text-[16px] font-bold capitalize text-[#ff7a01]">AI based solution</p>
            <p className="mt-4 font-display text-[13px] font-medium leading-normal">
              Simplifies vehicle inspections and automates damage documentation for the mobility industry.
            </p>
          </div>
          <div className="absolute bottom-16 left-0 max-w-[140px] rounded-[6px] bg-[#1364b4] p-3 text-white">
            <p className="font-display text-[10px] font-bold capitalize text-[#ff7a01]">Complete Inspection</p>
            <p className="mt-2 font-display text-[8px] font-medium leading-normal">
              Please complete your inspection and click on submit button to see the details of your car.
            </p>
          </div>
        </div>

        <div>
          <h2 className="type-section-title text-[#1b2f4b]">
            {title}
          </h2>
          <ul className="mt-8 space-y-5">
            {bullets.map((bullet) => (
              <li key={bullet} className="type-location-list flex items-start gap-3 text-[#41546e]">
                <span className="mt-1 inline-flex h-6 w-6 flex-none items-center justify-center">
                  <CheckIcon />
                </span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
          <a href="#south-carolina-demo" className="type-location-body mt-8 inline-block font-medium text-[#41546e] underline">
            Learn more
          </a>
          <div className="mt-8">
            <Button href="#south-carolina-demo">{buttonLabel}</Button>
          </div>
        </div>
      </div>
    </section>
  )
}
