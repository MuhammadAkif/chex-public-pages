import Script from 'next/script'

export function IdentityPixelScript() {
  return (
    <Script
      id="identity-pixel"
      src="https://cdn.v3.identitypxl.app/pixels/69e9cfdb-fe0b-4cbc-9a83-95bed4efe4b0/p.js"
      strategy="beforeInteractive"
    />
  )
}
