import nextEnv from '@next/env'
import { getPayload } from 'payload'
import { defaultRegisterSection } from './register-section-defaults'

const repoRoot = process.cwd()
const { loadEnvConfig } = nextEnv
loadEnvConfig(repoRoot)

async function main() {
  const { default: config } = await import('../payload.config')
  const payload = await getPayload({ config })

  try {
    const backgroundMediaFilename = 'register-bg-image.png'
    const showcaseVideoFilename = 'chex-video.mp4'
    const backgroundMedia = await payload.find({
      collection: 'media',
      limit: 1,
      overrideAccess: true,
      where: {
        filename: {
          equals: backgroundMediaFilename,
        },
      },
    })
    const backgroundImageDoc = backgroundMedia.docs[0] as
      | { id?: string; url?: string }
      | undefined
    const backgroundImageID = backgroundImageDoc?.id ?? null
    const backgroundImageURL =
      backgroundImageDoc?.url || defaultRegisterSection.backgroundImage
    const showcaseVideoMedia = await payload.find({
      collection: 'media',
      limit: 1,
      overrideAccess: true,
      where: {
        filename: {
          equals: showcaseVideoFilename,
        },
      },
    })
    const showcaseVideoDoc = showcaseVideoMedia.docs[0] as
      | { id?: string; url?: string }
      | undefined
    const showcaseVideoID = showcaseVideoDoc?.id ?? null
    const showcaseVideoURL =
      showcaseVideoDoc?.url ||
      'https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/chex-video.mp4'

    const result = await payload.find({
      collection: 'locations',
      depth: 0,
      limit: 500,
      overrideAccess: true,
      pagination: false,
    })

    let updated = 0

    for (const location of result.docs) {
      await payload.update({
        collection: 'locations',
        id: location.id,
        overrideAccess: true,
        data: {
          hero: {
            demoHref: '#signup',
          },
          showcase: {
            ...(location.showcase ?? {}),
            video: showcaseVideoID,
            videoFallbackUrl: showcaseVideoURL,
          },
          registerSection: {
            sectionId: defaultRegisterSection.sectionId ?? null,
            backgroundImage: backgroundImageID,
            backgroundImageFallbackUrl: backgroundImageURL,
            backgroundImageAlt: defaultRegisterSection.backgroundImageAlt,
            headlineLines: defaultRegisterSection.headlineLines.map((text) => ({
              text,
            })),
            formHeadingAccent: defaultRegisterSection.formHeadingAccent,
            formHeadingRest: defaultRegisterSection.formHeadingRest,
            firstNamePlaceholder: defaultRegisterSection.firstNamePlaceholder,
            lastNamePlaceholder: defaultRegisterSection.lastNamePlaceholder,
            emailPlaceholder: defaultRegisterSection.emailPlaceholder,
            phonePlaceholder: defaultRegisterSection.phonePlaceholder,
            passwordPlaceholder: defaultRegisterSection.passwordPlaceholder,
            termsPrefix: defaultRegisterSection.termsPrefix,
            termsLinkLabel: defaultRegisterSection.termsLinkLabel,
            termsLinkHref: defaultRegisterSection.termsLinkHref,
            registerButtonLabel: defaultRegisterSection.registerButtonLabel,
            registerButtonHref: defaultRegisterSection.registerButtonHref ?? null,
            loginPrefix: defaultRegisterSection.loginPrefix,
            loginLinkLabel: defaultRegisterSection.loginLinkLabel,
            loginLinkHref: defaultRegisterSection.loginLinkHref,
          },
        },
      })

      updated += 1
    }

    console.log(
      JSON.stringify(
        {
          backgroundImageApplied: backgroundImageID ? backgroundMediaFilename : 'fallback-url-only',
          showcaseVideoApplied: showcaseVideoID ? showcaseVideoFilename : 'fallback-url-only',
          locationsFound: result.docs.length,
          locationsUpdated: updated,
        },
        null,
        2,
      ),
    )
  } finally {
    await payload.destroy()
  }
}

try {
  await main()
  process.exit(0)
} catch (error) {
  console.error(error)
  process.exit(1)
}
