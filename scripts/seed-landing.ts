/**
 * Seeds the `home-page` Payload global (the landing design that now powers /)
 * from the canonical content file
 * src/app/(site)/landing-page/content.ts. Images are stored as `*FallbackUrl`
 * S3 links (the migration-shim pattern used across this project), so no Media
 * records are created.
 *
 * Run with: node --env-file=.env --import tsx scripts/seed-landing.ts
 */
import { getPayload } from 'payload'

import config from '../payload.config'
import { landingContent } from '../src/app/(site)/landing-page/content'

async function main() {
  const payload = await getPayload({ config })

  const c = landingContent

  await payload.updateGlobal({
    slug: 'home-page',
    overrideAccess: true,
    data: {
      meta: { title: c.meta.title, description: c.meta.description },
      hero: {
        ratingText: c.hero.ratingText,
        titleAccent: c.hero.titleAccent,
        title: c.hero.title,
        description: c.hero.description,
        buttonLabel: c.hero.buttonLabel,
        imageFallbackUrl: c.hero.image,
      },
      trusted: {
        title: c.trusted.title,
        logos: c.trusted.logos.map((logo) => ({
          imageFallbackUrl: logo.image,
          label: logo.label,
        })),
      },
      transform: {
        title: c.transform.title,
        description: c.transform.description,
        imageFallbackUrl: c.transform.image,
        features: c.transform.features.map((f) => ({
          title: f.title,
          description: f.description,
        })),
      },
      solutions: {
        title: c.solutions.title,
        description: c.solutions.description,
        blocks: c.solutions.blocks.map((b) => ({
          label: b.label,
          title: b.title,
          description: b.description,
          bullets: b.bullets.map((text) => ({ text })),
          buttonLabel: b.buttonLabel,
          imageFallbackUrl: b.image,
          variant: b.variant,
        })),
      },
      testimonials: {
        title: c.testimonials.title,
        description: c.testimonials.description,
        label: c.testimonials.label,
        items: c.testimonials.items.map((t) => ({
          name: t.name,
          quote: t.quote,
          stars: t.stars,
          avatar: t.avatar ?? null,
        })),
      },
      faq: {
        title: c.faq.title,
        items: c.faq.items.map((i) => ({ question: i.question, answer: i.answer })),
      },
      achievements: {
        title: c.achievements.title,
        description: c.achievements.description,
        backgroundImageFallbackUrl: c.achievements.backgroundImage,
        stats: c.achievements.stats.map((s) => ({ value: s.value, label: s.label })),
        note: c.achievements.note,
        buttonLabel: c.achievements.buttonLabel,
      },
      inspect: {
        eyebrow: c.inspect.eyebrow,
        titleAccentA: c.inspect.titleAccentA,
        titleMid: c.inspect.titleMid,
        titleAccentB: c.inspect.titleAccentB,
        titleTail: c.inspect.titleTail,
        subtitle: c.inspect.subtitle,
        description: c.inspect.description,
        buttonLabel: c.inspect.buttonLabel,
        testimonial: {
          name: c.inspect.testimonial.name,
          quote: c.inspect.testimonial.quote,
          role: c.inspect.testimonial.role,
          imageFallbackUrl: c.inspect.testimonial.image,
        },
      },
      articles: {
        eyebrow: c.articles.eyebrow,
        title: c.articles.title,
        items: c.articles.items.map((a) => ({
          tag: a.tag,
          title: a.title,
          imageFallbackUrl: a.image,
          href: a.href ?? null,
        })),
      },
    },
  })

  const check = await payload.findGlobal({ slug: 'home-page' })
  console.log('✓ home-page global seeded.')
  console.log('  hero.title          :', check.hero?.title)
  console.log('  trusted.logos       :', check.trusted?.logos?.length)
  console.log('  solutions.blocks    :', check.solutions?.blocks?.length)
  console.log('  solutions bullets[0]:', check.solutions?.blocks?.[0]?.bullets?.length)
  console.log('  testimonials.items  :', check.testimonials?.items?.length)
  console.log('  faq.items           :', check.faq?.items?.length)
  console.log('  articles.items      :', check.articles?.items?.length)
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('\n✗ Seed failed:', err)
    process.exit(1)
  })
