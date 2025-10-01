import type { Metadata } from 'next'
import '../../public/assets/styles/global.scss'

export const metadata: Metadata = {
  title: 'Abuse Prevention Challenge',
  description: 'Contact form with validation and i18n',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body>
        {children}
      </body>
    </html>
  )
}
