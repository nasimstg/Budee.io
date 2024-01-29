import axios from "axios"
import qs from "qs"
export async function exchangeCodeForTokens(code) {
    try {
        const { data } = await axios.post('https://oauth2.googleapis.com/token', {
            code,
            client_id: process.env.NEXT_PUBLIC_GOOGLE_ADS_CLIENT_ID,
            client_secret: process.env.NEXT_PUBLIC_GOOGLE_ADS_CLIENT_SECRET,
            redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URI,
            grant_type: 'authorization_code',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            
        });

        // Use the access token to get the user's email address
        const { data: userInfo } = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
            headers: { Authorization: `Bearer ${data.access_token}` },
        });

        return { accessToken: data.access_token, refreshToken: data.refresh_token, email: userInfo.email };
    } catch (err) {
        console.error(err);
    }
}

export async function POST(req, res) {
    const body = await req.json()
    const code = body.code
    try {
        const { accessToken, refreshToken, email } = await exchangeCodeForTokens(code)
        return new Response(JSON.stringify({ accessToken, refreshToken, email }), {
            headers: { 'content-type': 'application/json' },
            status: 200,
        })
    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), {
            headers: { 'content-type': 'application/json' },
            status: 500,
        })
    }
}