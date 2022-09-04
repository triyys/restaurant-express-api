require('dotenv').config()

module.exports = {
    postgresql: {
        url: process.env.POSTGRESQL_CONNECTION_STRING,
    },
    mongodb: {
        url: process.env.MONGODB_CONNECTION_STRING,
    },
}