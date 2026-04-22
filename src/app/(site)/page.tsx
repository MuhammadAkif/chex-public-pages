const steps = [
  'Copy .env.example to .env and update DATABASE_URL / PAYLOAD_SECRET.',
  'Start PostgreSQL with docker compose up -d postgres.',
  'Run npm install, then npm run payload:generate:importmap.',
  'Start Next.js with npm run dev and open /admin.',
]

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-16 px-6 py-12 lg:px-10">
      <section className="grid gap-8 rounded-[2rem] border border-white/70 bg-white/75 p-8 shadow-soft backdrop-blur lg:grid-cols-[1.2fr_0.8fr] lg:p-12">
        <div className="space-y-6">
          <span className="inline-flex rounded-full border border-ink/10 bg-white px-4 py-2 text-sm font-semibold tracking-[0.16em] text-ink/70 uppercase">
            Production-ready baseline
          </span>
          <div className="space-y-4">
            <h1 className="max-w-3xl font-[family-name:var(--font-display)] text-5xl font-semibold tracking-tight text-balance lg:text-7xl">
              Next.js 16 and Payload 3 wired for PostgreSQL from day one.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-ink/72">
              This repository mounts Payload inside the App Router, keeps the frontend and admin in one deployment unit, and uses PostgreSQL with Payload migrations configured for local and production workflows.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 text-sm font-medium text-ink/70">
            <span className="rounded-full bg-ink px-4 py-2 text-white">Next 16.2.4</span>
            <span className="rounded-full border border-ink/10 bg-white px-4 py-2">React 19.2.5</span>
            <span className="rounded-full border border-ink/10 bg-white px-4 py-2">Payload 3.83.0</span>
            <span className="rounded-full border border-ink/10 bg-white px-4 py-2">Tailwind 4</span>
            <span className="rounded-full border border-ink/10 bg-white px-4 py-2">PostgreSQL</span>
          </div>
        </div>
        <div className="rounded-[1.75rem] bg-ink p-6 text-white">
          <p className="text-sm font-semibold tracking-[0.18em] text-white/60 uppercase">
            Local startup
          </p>
          <ol className="mt-5 space-y-4 text-sm leading-7 text-white/86">
            {steps.map((step) => (
              <li
                key={step}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
              >
                {step}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <article className="rounded-[1.75rem] border border-ink/8 bg-white/80 p-6 shadow-soft backdrop-blur">
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold">
            App Router first
          </h2>
          <p className="mt-3 text-sm leading-7 text-ink/72">
            The frontend lives in the same Next.js application as the admin and API routes, using route groups to isolate Payload styling and layout concerns from the public site.
          </p>
        </article>
        <article className="rounded-[1.75rem] border border-ink/8 bg-white/80 p-6 shadow-soft backdrop-blur">
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold">
            PostgreSQL only
          </h2>
          <p className="mt-3 text-sm leading-7 text-ink/72">
            Payload uses <code>@payloadcms/db-postgres</code> with a standard <code>DATABASE_URL</code>, UUID IDs, migration output under <code>src/migrations</code>, and development push mode enabled only in development.
          </p>
        </article>
        <article className="rounded-[1.75rem] border border-ink/8 bg-white/80 p-6 shadow-soft backdrop-blur">
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold">
            Tailwind v4
          </h2>
          <p className="mt-3 text-sm leading-7 text-ink/72">
            Styling follows the current Next.js and Tailwind PostCSS setup, keeping the pipeline minimal while still leaving a typed config file in place for future theme expansion.
          </p>
        </article>
      </section>
    </main>
  )
}

