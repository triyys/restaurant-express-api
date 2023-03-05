if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

module.exports = {
    clientUrl: process.env.WEBSITE_BASE_URL || 'http://localhost:3000',
    oauth2Url: process.env.OAUTH2_BASE_URL || 'http://localhost:8080',
    oauth2ClientId: process.env.OAUTH2_CLIENT_ID,
    oauth2ClientSecret: process.env.OAUTH2_CLIENT_SECRET,
    port: process.env.PORT || 8080,
    jwtSecret: process.env.ACCESS_TOKEN_SECRET,
    paypalClientId: process.env.PAYPAL_CLIENT_ID,
    paypalClientSecret: process.env.PAYPAL_CLIENT_SECRET,
}