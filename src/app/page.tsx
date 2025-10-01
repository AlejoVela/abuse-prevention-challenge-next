'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import "@assets/styles/global.css";

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    router.replace('/purchase/update-contact-data')
  }, [router])

  return <div>Loading...</div>
}
