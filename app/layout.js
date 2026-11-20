import './globals.css'
import Script from 'next/script'

const baseUrl = 'https://vaibhavv.is-a.dev'

export const metadata = {
  metadataBase: new URL(baseUrl),
  applicationName: 'Vaibhav Bhoyate Portfolio',
  title: {
    default: 'Vaibhav Bhoyate | AI & ML Engineer | Founder @ Kryva Technologies',
    template: '%s | Vaibhav Bhoyate',
  },
  description:
    'Official portfolio of Vaibhav Bhoyate — AI & ML Engineer and Founder of Kryva Technologies. Specializing in Machine Learning, Autonomous AI Systems, Computer Vision, and Full-Stack Engineering.',
  keywords: [
    'Vaibhav Bhoyate',
    'Vaibhav Baban Bhoyate',
    'Vaibhav Bhoyate Portfolio',
    'AI ML Engineer India',
    'Machine Learning Engineer',
    'Kryva Technologies',
    'Founder Kryva Technologies',
    'SPPU AI Engineer',
    'Autonomous Business Platform',
    'Logic Coach',
    'CodeSentinel AI',
    'Python AI Engineer',
    'Full Stack AI Developer',
  ],
  authors: [{ name: 'Vaibhav Bhoyate', url: baseUrl }],
  creator: 'Vaibhav Bhoyate',
  publisher: 'Vaibhav Bhoyate',
  alternates: {
    canonical: baseUrl,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: baseUrl,
    siteName: 'Vaibhav Bhoyate Portfolio',
    title: 'Vaibhav Bhoyate | AI & ML Engineer | Founder @ Kryva Technologies',
    description:
      'Explore projects, autonomous AI systems, and engineering journey of Vaibhav Bhoyate, Founder at Kryva Technologies.',
    images: [
      {
        url: '/profile.png',
        width: 1200,
        height: 630,
        alt: 'Vaibhav Bhoyate - AI & ML Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vaibhav Bhoyate | AI & ML Engineer',
    description:
      'Explore projects, autonomous AI systems, and engineering journey of Vaibhav Bhoyate.',
    images: ['/profile.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48' },
      { url: '/icon-48.png', sizes: '48x48', type: 'image/png' },
      { url: '/icon-96.png', sizes: '96x96', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon.png', sizes: 'any', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/icon-192.png',
  },
  verification: {
    google: 'zr4JLgAcJmy5LBDCtiO-yiV-mjT51cBVsmCCWE6LSd0',
  },
}

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Vaibhav Bhoyate Portfolio',
  alternateName: ['Vaibhav Bhoyate', 'Portfolio', 'vaibhavv.is-a.dev'],
  url: 'https://vaibhavv.is-a.dev/',
}

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${baseUrl}/#person`,
  name: 'Vaibhav Bhoyate',
  alternateName: ['Vaibhav Baban Bhoyate', 'vaibhavv-labs'],
  url: `${baseUrl}/`,
  image: `${baseUrl}/profile.png`,
  jobTitle: 'AI & Machine Learning Engineer',
  worksFor: {
    '@type': 'Organization',
    name: 'Kryva Technologies',
    url: 'https://kryvatechnologies.is-a.dev/',
  },
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'Savitribai Phule Pune University',
  },
  sameAs: [
    'https://www.linkedin.com/in/vaibhav-bhoyate-6328802a9/',
    'https://github.com/vaibhavv-labs',
    'https://kryvatechnologies.is-a.dev/',
  ],
  knowsAbout: [
    'Artificial Intelligence',
    'Machine Learning',
    'Deep Learning',
    'Natural Language Processing',
    'Computer Vision',
    'Python',
    'Next.js',
    'FastAPI',
  ],
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="48x48" />
        <link rel="icon" href="/icon-48.png" sizes="48x48" type="image/png" />
        <link rel="icon" href="/icon-96.png" sizes="96x96" type="image/png" />
        <link rel="icon" href="/icon-192.png" sizes="192x192" type="image/png" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <meta name="google-site-verification" content="zr4JLgAcJmy5LBDCtiO-yiV-mjT51cBVsmCCWE6LSd0" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://vaibhavv.is-a.dev/" />
        <meta property="og:title" content="Vaibhav Bhoyate | AI & ML Engineer | Founder @ Kryva Technologies" />
        <meta property="og:description" content="Official portfolio of Vaibhav Bhoyate — AI & ML Engineer, Founder of Kryva Technologies. Specializing in Machine Learning, Autonomous AI Systems, and Full-Stack Engineering." />
        <meta property="og:image" content="https://vaibhavv.is-a.dev/profile.png" />
        <meta property="og:site_name" content="Vaibhav Bhoyate Portfolio" />
        <meta name="application-name" content="Vaibhav Bhoyate Portfolio" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Vaibhav Bhoyate | AI & ML Engineer | Founder @ Kryva Technologies" />
        <meta name="twitter:description" content="Official portfolio of Vaibhav Bhoyate — AI & ML Engineer, Founder of Kryva Technologies." />
        <meta name="twitter:image" content="https://vaibhavv.is-a.dev/profile.png" />
        <link rel="help" href="/llms.txt" />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-MJG9T9Z145"
          strategy="afterInteractive"
        />
        <Script
          src="https://www.googletagmanager.com/gtm.js?id=GTM-NGBPXRJZ"
          strategy="afterInteractive"
        />
        <Script id="gtm-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-MJG9T9Z145');
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-NGBPXRJZ');
          `}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NGBPXRJZ"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {children}
      </body>
    </html>
  )
}
