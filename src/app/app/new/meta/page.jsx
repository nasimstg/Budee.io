'use client'
import React, { useEffect } from 'react'

import { useRouter } from 'next/navigation'

export async function redirectToFacebookOAuth( router) {
  console.log(process.env.NEXT_PUBLIC_META_ADS_CLIENT_ID);

  const params = new URLSearchParams({
      client_id: process.env.NEXT_PUBLIC_META_ADS_CLIENT_ID,
      redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URI_META,
      response_type: 'code',
      scope: 'email,ads_management', // adjust the scope as needed
  })

  try {
      await router.push(`https://www.facebook.com/v13.0/dialog/oauth?${params}`)
  } catch (err) {
      console.error(err)
  }
}

export default function Meta() {
  const router = useRouter()

  useEffect(() => {
    redirectToFacebookOAuth(router)
  }, [router])
  return (
    <div>Meta</div>
  )
}
