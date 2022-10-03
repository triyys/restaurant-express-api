if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

module.exports = {
    clientUrl: process.env.WEBSITE_BASE_URL || 'http://localhost:3000',
    port: process.env.PORT || 8080,
    jwtSecret: process.env.ACCESS_TOKEN_SECRET,
    paypalClientId: process.env.PAYPAL_CLIENT_ID,
    paypalClientSecret: process.env.PAYPAL_CLIENT_SECRET,
}