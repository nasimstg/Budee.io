'use client'
import React, { useEffect } from 'react'

import { useRouter } from 'next/navigation'

export async function redirectToTwitterOAuth(router) {
    const params = new URLSearchParams({
        client_id: process.env.NEXT_PUBLIC_TWITTER_CLIENT_ID,
        response_type: 'code',
        redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URI_TWITTER,
        scope: 'ads_management read write', // request permissions
    })
    
    try {
        await router.push(`https://api.twitter.com/oauth2/authorize?${params}`)
    } catch (err) {
        console.error(err)
    }
}

export default function Twitter() {
  const router = useRouter()

  useEffect(() => {
    redirectToTwitterOAuth(router)
  }, [router])
  return (
    <div>Redirecting you to twitter login</div>
  )
}
