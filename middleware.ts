import { NextRequest, NextResponse } from 'next/server'

const locales = ['es-AR', 'en-US', 'pt-BR']
const defaultLocale = 'es-AR'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  
  // Check if there is any supported locale in the pathname
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    // Detect language from Accept-Language header
    const acceptLanguage = request.headers.get('accept-language') || ''
    let detectedLocale = defaultLocale
    
    if (acceptLanguage.includes('en')) detectedLocale = 'en-US'
    else if (acceptLanguage.includes('pt')) detectedLocale = 'pt-BR'
    
    return NextResponse.redirect(
      new URL(`/${detectedLocale}${pathname}`, request.url)
    )
  }
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|assets).*)',
  ],
}