'use client'
import React, { useEffect } from 'react'

import { useRouter } from 'next/navigation'

export async function redirectToLinkedinOAuth(router) {
    const params = new URLSearchParams({
        client_id: process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID,
        response_type: 'code',
        redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URI_LINKEDIN,
        scope: 'r_liteprofile r_emailaddress w_member_social rw_ads rw_organization rw_organization_admin', // request permissions
    })
    
    try {
        await router.push(`https://www.linkedin.com/oauth/v2/authorization?${params}`)
    } catch (err) {
        console.error(err)
    }
}

export default function Linkedin() {
  const router = useRouter()

  useEffect(() => {
    redirectToLinkedinOAuth(router)
  }, [router])
  return (
    <div>Redirecting you to Linkedin login</div>
  )
}
