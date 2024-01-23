'use client'
import React, { useEffect } from 'react'

import { useRouter } from 'next/navigation'

export async function redirectToBingOAuth( router) {

    const params = new URLSearchParams({
        client_id: process.env.NEXT_PUBLIC_BING_ADS_CLIENT_ID,
        response_type: 'code',
        redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URI_BING,
        scope: 'openid offline_access user.read email https://ads.microsoft.com/ads.manage', // request permissions
        response_mode: 'query'
    })
    
    try {
        await router.push(`https://login.microsoftonline.com/common/oauth2/v2.0/authorize?${params}`)
    } catch (err) {
        console.error(err)
    }
}

export default function Bing() {
  const router = useRouter()

  useEffect(() => {
    redirectToBingOAuth(router)
  }, [router])
  return (
    <div>Redrirecting you to bing login page...</div>
  )
}
