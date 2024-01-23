import axios from 'axios'
import { useRouter } from 'next/router'



export async function exchangeCodeForTokens(code) {
    try {
        const { data } = await axios.get('https://graph.facebook.com/v13.0/oauth/access_token', {
            params: {
                code,
                client_id: process.env.NEXT_PUBLIC_META_ADS_CLIENT_ID,
                client_secret: process.env.NEXT_PUBLIC_META_ADS_CLIENT_SECRET,
                redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URI_META,
            },
        })

        return { accessToken: data.access_token }
    } catch (err) {
        console.error(err)
    }
}