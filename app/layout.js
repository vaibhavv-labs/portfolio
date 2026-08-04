import './globals.css'

export const metadata = {
  title: 'Vaibhav Bhoyate | AI & ML Engineer',
  description: 'Professional portfolio of Vaibhav Bhoyate - AI, Machine Learning & Data Science Engineer',
  keywords: 'AI, Machine Learning, Data Science, Engineer, Portfolio',
  icons: {
    icon: '/icon.png',
    shortcut: '/icon.png',
    apple: '/icon.png',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icon.png" sizes="any" />
      </head>
      <body>{children}</body>
    </html>
  )
}
