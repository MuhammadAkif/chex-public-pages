import Script from 'next/script'

const GOOGLE_ANALYTICS_ID = 'G-T752DF0YXS'

export function GoogleAnalyticsScript() {
  return (
    <>
      <Script
        id="google-analytics-loader"
        src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`}
        strategy="beforeInteractive"
      />
      <Script id="google-analytics-config" strategy="beforeInteractive">{`
        window.dataLayer = window.dataLayer || [];
        function gtag() {
          dataLayer.push(arguments);
        }
        gtag("js", new Date());
        gtag("config", "${GOOGLE_ANALYTICS_ID}");
      `}</Script>
    </>
  )
}
