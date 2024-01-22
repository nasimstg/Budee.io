import { GoogleAdsApi, types } from 'google-ads-api'
import { useRouter } from 'next/router'
import axios from 'axios'

export async function RedirectToGoogleOAuth() {
    const router = useRouter()

    const params = new URLSearchParams({
        client_id: process.env.GOOGLE_ADS_CLIENT_ID,
        redirect_uri: process.env.REDIRECT_URI, // Use environment variable
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

export async function exchangeCodeForTokens(code) {
    try {
        const { data } = await axios.post('https://oauth2.googleapis.com/token', {
            code,
            client_id: process.env.GOOGLE_ADS_CLIENT_ID,
            client_secret: process.env.GOOGLE_ADS_CLIENT_SECRET,
            redirect_uri: process.env.REDIRECT_URI, // Use environment variable
            grant_type: 'authorization_code',
        })

        return { accessToken: data.access_token, refreshToken: data.refresh_token }
    } catch (err) {
        console.error(err)
    }
}

export async function createClient(accessToken, refreshToken) {
    const client = new GoogleAdsApi({
        client_id: process.env.GOOGLE_ADS_CLIENT_ID,
        client_secret: process.env.GOOGLE_ADS_CLIENT_SECRET,
        developer_token: process.env.GOOGLE_ADS_DEVELOPER_TOKEN,
        refresh_token: refreshToken,
    })

    try {
        await client.credentials.refreshAccessToken()
    } catch (err) {
        console.error(err)
    }

    return client
}

export async function listClientAccounts(client) {
    try {
        const response = await client.service.CustomerService.listAccessibleCustomers();
        return response.resourceNames.map(resourceName => resourceName.split('/')[1]);
    } catch (err) {
        console.error(err);
    }
}

export async function listCampaigns(client, customerId) {
    try {
        const response = await client.service.CampaignService.list({
            customerId,
            limit: 1000,
        })

        return response.results
    } catch (err) {
        console.error(err)
    }
}