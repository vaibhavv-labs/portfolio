import './globals.css'

const baseUrl = 'https://vaibhavv.is-a.dev'

export const metadata = {
  metadataBase: new URL(baseUrl),
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
    icon: '/icon.png',
    shortcut: '/icon.png',
    apple: '/icon.png',
  },
  verification: {
    google: 'zr4JLgAcJmy5LBDCtiO-yiV-mjT51cBVsmCCWE6LSd0',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${baseUrl}/#person`,
      name: 'Vaibhav Bhoyate',
      alternateName: ['Vaibhav Baban Bhoyate', 'vaibhavv-labs'],
      url: baseUrl,
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
    },
    {
      '@type': 'WebSite',
      '@id': `${baseUrl}/#website`,
      url: baseUrl,
      name: 'Vaibhav Bhoyate Portfolio',
      description:
        'Official portfolio of Vaibhav Bhoyate — AI & ML Engineer and Founder of Kryva Technologies.',
      publisher: {
        '@id': `${baseUrl}/#person`,
      },
    },
  ],
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icon.png" sizes="any" />
        <meta name="google-site-verification" content="zr4JLgAcJmy5LBDCtiO-yiV-mjT51cBVsmCCWE6LSd0" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
