import type { ReactNode } from 'react'

import { siteContent } from '@/app/(site)/content'
import { AnnouncementHeader } from '@/app/(site)/components/shared/announcement-header'
import { Footer } from '@/app/(site)/components/shared/footer'
import { Navbar } from '@/app/(site)/components/shared/navbar'
import { SiteShell } from '@/app/(site)/components/shared/site-shell'

type SiteLayoutProps = {
  children: ReactNode
}

export default function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <SiteShell>
      <div className="flex min-h-screen flex-col">
        <div className="sticky top-0 z-50">
          <AnnouncementHeader message={siteContent.announcement} />
          <Navbar logo={siteContent.logo} links={siteContent.navigationLinks} />
        </div>

        <div className="flex-1">{children}</div>

        <Footer
          logo={siteContent.logo}
          description={siteContent.footer.description}
          menuTitle={siteContent.footer.menuTitle}
          menuItems={siteContent.footer.menuItems}
          contactTitle={siteContent.footer.contactTitle}
          contactItems={siteContent.footer.contactItems}
          socialItems={siteContent.footer.socialItems}
          copyright={siteContent.footer.copyright}
        />
      </div>
    </SiteShell>
  )
}
