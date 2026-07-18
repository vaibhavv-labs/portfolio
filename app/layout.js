import './globals.css'

export const metadata = {
  title: 'Vaibhav Bhoyate | AI & ML Engineer',
  description: 'Professional portfolio of Vaibhav Bhoyate - AI, Machine Learning & Data Science Engineer',
  keywords: 'AI, Machine Learning, Data Science, Engineer, Portfolio',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
