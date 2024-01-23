'use client'
import React, { useEffect } from 'react'

import { useRouter } from 'next/navigation'

export async function redirectToTiktokOAuth(router) {
    /*const params = new URLSearchParams({
        client_id: process.env.NEXT_PUBLIC_TIKTOK_CLIENT_ID,
        response_type: 'code',
        redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URI_TIKTOK,
        scope: 'user.info.basic', // request permissions
    })
    
    try {
        await router.push(`https://open-api.tiktok.com/platform/oauth/connect/?${params}`)
    } catch (err) {
        console.error(err)
    }*/
}

export default function Tiktok() {
  const router = useRouter()

  useEffect(() => {
    //redirectToTiktokOAuth(router)
  }, [router])
  return (
    <div>TikToks API does not provide a specific scope for Ads Manager permissions.</div>
  )
}
