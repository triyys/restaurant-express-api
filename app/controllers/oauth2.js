const https = require('https')
const { oauth2Url, oauth2ClientId, oauth2ClientSecret } = require('@root/config')

const exchangeCodeForToken = async (req, res, next) => {
    const data = []
    const url = `${oauth2Url}/v2/oauth/token`
    console.log(`External API call: ${url}`)
    const request = https.request(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Cache-Control': 'no-cache',
        }
    }, (response) => {
        response.on('data', (chunk) => {
            data.push(chunk)
        })
        response.on('end', () => {
            return res.status(201).send(data.toString())
        })
    })
    
    request.end((new URLSearchParams({
        'client_id': oauth2ClientId,
        'client_secret': oauth2ClientSecret,
        'code': req.query.code,
    })).toString())
}

module.exports = {
    exchangeCodeForToken,
}