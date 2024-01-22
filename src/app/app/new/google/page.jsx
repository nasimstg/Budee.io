'use client'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'

async function RedirectToGoogleOAuth(router) {
  const params = new URLSearchParams({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_ADS_CLIENT_ID,
      redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URI, // Use environment variable
      response_type: 'code',
      scope: 'https://www.googleapis.com/auth/adwords',
      access_type: 'offline',
  })

  try {
      await router.push(`https://accounts.google.com/o/oauth2/v2/auth?${params}`)
  } catch (err) {
      console.error(err)
  }
}


export default function GAds() {
  const router = useRouter()
  RedirectToGoogleOAuth(router)
  return (
    <section>
      <h1>Redirecting to Google OAuth...</h1>
    </section>
  )
}
