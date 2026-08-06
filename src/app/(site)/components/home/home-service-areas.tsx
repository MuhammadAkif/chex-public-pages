'use client'

import Link from 'next/link'
import type { Route } from 'next'

// Hardcoded list of the states served by the rideshare inspection service.
// Mirrors the commented "Areas we serve" navbar block in content.ts and the
// FALLBACK_LOCATION_SLUGS in sitemap.ts. Not CMS-driven by design (for now).
const SERVICE_AREAS: ReadonlyArray<{ label: string; slug: string }> = [
  { label: 'Alabama', slug: 'alabama' },
  { label: 'Arizona', slug: 'arizona' },
  { label: 'Arkansas', slug: 'arkansas' },
  { label: 'California', slug: 'california' },
  { label: 'Colorado', slug: 'colorado' },
  { label: 'Iowa', slug: 'iowa' },
  { label: 'Nebraska', slug: 'nebraska' },
  { label: 'Nevada', slug: 'nevada' },
  { label: 'New Mexico', slug: 'new-mexico' },
  { label: 'Ohio', slug: 'ohio' },
  { label: 'South Carolina', slug: 'south-carolina' },
]

export function HomeServiceAreas() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-[1240px]">
        <div className="mx-auto max-w-3xl text-center">
          <p className="type-ui-label uppercase tracking-wide text-[#ff7a01]">
            Areas We Serve
          </p>
          <h2 className="type-section-heading mt-3 text-[#1b2f4b]">
            Rideshare Inspections Near You
          </h2>
          <p className="type-body-lg mt-4 text-[#41546e]">
            Chex rideshare vehicle inspections are available across these
            states. Pick yours to see local requirements and get started in
            minutes.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICE_AREAS.map(({ label, slug }) => (
            <Link
              key={slug}
              href={`/locations/${slug}` as Route}
              className="group flex items-center justify-between rounded-[20px] border border-[#e7edf6] bg-white px-6 py-5 shadow-[0_18px_55px_-40px_rgba(20,104,186,0.55)] transition hover:border-[#1368b9] hover:shadow-[0_24px_60px_-34px_rgba(20,104,186,0.6)]"
            >
              <span className="font-display text-[18px] font-bold text-[#1b2f4b]">
                {label}
              </span>
              <svg
                className="h-5 w-5 text-[#1368b9] transition-transform group-hover:translate-x-1"
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
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
