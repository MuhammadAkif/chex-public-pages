import { BingUetEcommercePlaceholderScript } from './bing-uet-ecommerce-placeholder-script'
import { BingUetScript } from './bing-uet-script'
import { ClarityScript } from './clarity-script'
import { FacebookPixelScript } from './facebook-pixel-script'
import { GoogleAds405262674Script } from './google-ads-405262674-script'
import { GoogleAds408260553Script } from './google-ads-408260553-script'
import { GoogleAnalyticsScript } from './google-analytics-script'
import { GoogleTagManagerScript } from './google-tag-manager-script'
import { IdentityPixelScript } from './identity-pixel-script'
import { UberInspectionRemarketingScript } from './uber-inspection-remarketing-script'

export function MarketingScripts() {
  return (
    <>
      <GoogleAds408260553Script />
      <GoogleAds405262674Script />
      <BingUetScript />
      <BingUetEcommercePlaceholderScript />
      <GoogleTagManagerScript />
      <GoogleAnalyticsScript />
      <IdentityPixelScript />
      <ClarityScript />
      <UberInspectionRemarketingScript />
      <FacebookPixelScript />
    </>
  )
}
