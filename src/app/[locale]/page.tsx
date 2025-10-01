'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const router = useRouter()
  const [locale, setLocale] = useState<string>('')

  useEffect(() => {
    const getParams = async () => {
      const resolvedParams = await params
      setLocale(resolvedParams.locale)
      router.replace(`/${resolvedParams.locale}/purchase/update-contact-data`)
    }
    
    getParams()
  }, [router, params])

  return null
}