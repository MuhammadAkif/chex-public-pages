'use client'

import Link from 'next/link'
import type { Route } from 'next'

import { SiteImage, type SiteImageSource } from '@/app/(site)/components/shared/site-image'

function FooterItemLink({ href, className, children }: { href: string; className: string; children: React.ReactNode }) {
  if (href.startsWith('/')) {
    return (
      <Link href={href as Route} className={className}>
        {children}
      </Link>
    )
  }
  return (
    <a href={href} className={className}>
      {children}
    </a>
  )
}

type FooterLink = {
  label: string
  href: string
}

type FooterProps = {
  logo: SiteImageSource
  description: string
  menuTitle: string
  menuItems: ReadonlyArray<FooterLink>
  contactTitle: string
  contactItems: ReadonlyArray<FooterLink>
  copyright: string
}

export function Footer({
  logo,
  description,
  menuTitle,
  menuItems,
  contactTitle,
  contactItems,
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
                <li key={item.label}>
                  <FooterItemLink
                    href={item.href}
                    className="type-footer-copy text-white transition-colors hover:text-[#ff7a01]"
                  >
                    {item.label}
                  </FooterItemLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="type-ui-label text-[#e1ebf9]/80">{contactTitle}</p>
            <ul className="mt-6 space-y-4">
              {contactItems.map((item) => (
                <li key={item.label}>
                  <FooterItemLink
                    href={item.href}
                    className="type-footer-copy text-white transition-colors hover:text-[#ff7a01]"
                  >
                    {item.label}
                  </FooterItemLink>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 text-center text-[#e1ebf9]/80">
          <p className="type-body-sm">{copyright}</p>
        </div>
      </div>
    </footer>
  )
}
