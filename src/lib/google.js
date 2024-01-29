import { GoogleAdsApi } from 'google-ads-api'
import axios from 'axios'

export async function exchangeCodeForTokens(code) {
    console.log('code:', code)
    console.log('redirect_uri:', process.env.NEXT_PUBLIC_REDIRECT_URI)
    console.log('client_id:', process.env.NEXT_PUBLIC_GOOGLE_ADS_CLIENT_ID)
    console.log('client_secret:', process.env.NEXT_PUBLIC_GOOGLE_ADS_CLIENT_SECRET)
    try {
        const { data } = await axios.post('https://www.googleapis.com/oauth2/v4/token', {
            code,
            client_id: process.env.NEXT_PUBLIC_GOOGLE_ADS_CLIENT_ID,
            client_secret: process.env.NEXT_PUBLIC_GOOGLE_ADS_CLIENT_SECRET,
            redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URI,
            grant_type: 'authorization_code',
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