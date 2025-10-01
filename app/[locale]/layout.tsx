import I18nProvider from '@/providers/I18nProvider'

export async function generateStaticParams() {
  return [
    { locale: 'es-AR' },
    { locale: 'en-US' }, 
    { locale: 'br' }
  ]
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  
  return (
    <html lang={locale}>
      <body>
        <I18nProvider>
          {children}
        </I18nProvider>
      </body>
    </html>
  )
}