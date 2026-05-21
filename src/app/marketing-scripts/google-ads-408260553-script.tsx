import Script from 'next/script'

const GOOGLE_ADS_ID = 'AW-408260553'

export function GoogleAds408260553Script() {
  return (
    <>
      <Script
        id="google-ads-408260553-loader"
        src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
        strategy="beforeInteractive"
      />
      <Script id="google-ads-408260553-config" strategy="beforeInteractive">{`
        window.dataLayer = window.dataLayer || [];
        function gtag() {
          dataLayer.push(arguments);
        }
        gtag("js", new Date());
        gtag("config", "${GOOGLE_ADS_ID}");
      `}</Script>
    </>
  )
}
