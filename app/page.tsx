'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    router.replace('/purchase/update-contact-data')
  }, [router])

  return <div>Loading...</div>
}
