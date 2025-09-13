import { Metadata } from 'next'
import './globals.css'
import Script from 'next/script'


export const metadata = {
  title: 'Locaddo - Turn Local News Into SEO Content | AI-Powered Content Marketing',
  description: 'Transform local news stories into SEO-optimized blog content automatically. Built for law firms, medical practices, and real estate professionals.',
  keywords: 'local SEO, AI content creation, WordPress automation, local news content, law firm marketing',
  metadataBase: new URL('https://locaddo.com'),
  openGraph: {
    title: 'Locaddo - Turn Local News Into SEO Content',
    description: 'The world\'s first AI platform that transforms local news into SEO-optimized blog content.',
    url: 'https://locaddo.com',
    siteName: 'Locaddo',
    images: ['/og-image.jpg'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Locaddo - Turn Local News Into SEO Content',
    description: 'Transform local news into SEO-optimized content automatically.',
    images: ['/twitter-img.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.png" />
  {/* Google Tag Manager - Script part */}
        <Script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-NSTDDFHH');
            `,
          }}
        />




      </head>
      <body>

        <noscript
          dangerouslySetInnerHTML={{
            __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NSTDDFHH"
            height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
          }}
        />
        
        {children}</body>
    </html>
  )
}