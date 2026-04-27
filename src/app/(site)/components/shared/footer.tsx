'use client'

import { SiteImage, type SiteImageSource } from '@/app/(site)/components/shared/site-image'

type FooterProps = {
  logo: SiteImageSource
  description: string
  menuTitle: string
  menuItems: ReadonlyArray<string>
  contactTitle: string
  contactItems: ReadonlyArray<string>
  socialItems: ReadonlyArray<string>
  copyright: string
}

export function Footer({
  logo,
  description,
  menuTitle,
  menuItems,
  contactTitle,
  contactItems,
  socialItems,
  copyright,
}: FooterProps) {
  return (
    <footer id="footer" className="border-t border-white/10 bg-[#101010] px-4 py-14 text-white sm:px-6 lg:px-10">
      <div className="mx-auto max-w-[1280px]">
        <div className="grid gap-10 border-b border-[#2563eb]/15 pb-12 lg:grid-cols-[1.05fr_0.9fr_0.9fr] lg:gap-16">
          <div>
            <div className="inline-flex rounded-[8px] bg-white px-4 py-2">
              <SiteImage src={logo} alt="Chex.AI" className="h-11 w-auto" />
            </div>
            <p className="type-footer-copy mt-8 max-w-sm text-[#e1ebf9]/80">{description}</p>
          </div>

          <div>
            <p className="type-ui-label text-[#e1ebf9]/80">{menuTitle}</p>
            <ul className="mt-6 space-y-4">
              {menuItems.map((item) => (
                <li key={item}>
                  <a href="/home" className="type-footer-copy text-white transition-colors hover:text-[#ff7a01]">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="type-ui-label text-[#e1ebf9]/80">{contactTitle}</p>
            <ul className="mt-6 space-y-4">
              {contactItems.map((item) => (
                <li key={item}>
                  <a href="/home#footer" className="type-footer-copy text-white transition-colors hover:text-[#ff7a01]">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-8 text-[#e1ebf9]/80 sm:flex-row sm:items-center sm:justify-between">
          <p className="type-body-sm">{copyright}</p>
          <div className="flex items-center gap-6">
            {socialItems.map((item) => (
              <a key={item} href="/home" className="type-body-sm transition-colors hover:text-[#ff7a01]">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
