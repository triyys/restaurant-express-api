require('dotenv').config()

module.exports = {
    port: process.env.PORT || 8080,
    jwtSecret: process.env.ACCESS_TOKEN_SECRET,
}