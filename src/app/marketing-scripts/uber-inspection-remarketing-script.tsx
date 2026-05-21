import Script from 'next/script'

export function UberInspectionRemarketingScript() {
  return (
    <Script id="uber-inspection-remarketing" strategy="beforeInteractive">{`
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        dataLayer.push(arguments);
      }

      gtag("event", "conversion", {
        send_to: "AW-405262674/2atUCOSf_vcDENKin8EB",
        value: 1.0,
        currency: "USD",
        aw_remarketing_only: true,
      });
    `}</Script>
  )
}
