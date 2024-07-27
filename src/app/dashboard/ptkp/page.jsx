'use client'

import { useEffect } from 'react'

import { useRouter } from 'next/navigation'

import { useSession } from 'next-auth/react'

const HalamanPtkp = () =>{
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'loading') return // Jangan lakukan apa pun saat sesi sedang dimuat

    if (!session) {
      router.push('/error/401')
    }
  }, [session, status, router])

  if (!session) {
    return null
  }

  return(
    <div>
      <div>
        <h1 className="text-lg font-bold">
          Data Nilai PTKP
        </h1>
      </div>
    </div>
  )
}

export default HalamanPtkp
