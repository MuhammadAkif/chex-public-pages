import { CaseStudies } from '@/app/(site)/components/shared/case-studies'
import type { SiteImageSource } from '@/app/(site)/components/shared/site-image'

type LocationCaseStudyImage = SiteImageSource

export type LocationCaseStudiesProps = {
  title: string
  items: ReadonlyArray<{
    metric: string
    title: string
    description: string
    image: LocationCaseStudyImage
    caption?: string
    linkHref?: string
    linkLabel?: string
  }>
  arrowImage: SiteImageSource
  sectionClassName: string
  scrollClassName: string
  articleClassName: string
  imageClassName: string
  arrowClassName: string
  metricClassName: string
  titleClassName: string
  descriptionClassName: string
  captionClassName?: string
  linkClassName?: string
}

export function LocationCaseStudies(props: LocationCaseStudiesProps) {
  return <CaseStudies {...props} />
}
