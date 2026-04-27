/* eslint-disable @next/next/no-img-element */

import Image from 'next/image'
import type { StaticImageData } from 'next/image'

export type SiteImageSource = StaticImageData | string

type SiteImageProps = {
  alt: string
  className?: string
  priority?: boolean
  src: SiteImageSource
}

export function SiteImage({ alt, className, priority, src }: SiteImageProps) {
  if (typeof src === 'string') {
    return <img src={src} alt={alt} className={className} loading={priority ? 'eager' : undefined} />
  }

  return <Image src={src} alt={alt} className={className} priority={priority} />
}
