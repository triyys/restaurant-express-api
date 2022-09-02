const mongoose = require('mongoose')
const postgres = require('../app/services/postgres')

const connectToMongoDB = () => {
    mongoose.connect(process.env.MONGODB_CONNECTION_STRING)
        .then(() => {
            console.log('MongoDB is connected successfully')
        })
        .catch((error) => {
            console.log('Cannot connect to MongoDB')
            console.log(error)
        })
}

const connectToPostgres = () => {
    postgres.authenticate()
        .then(() => {
            console.log('PostgreSQL is connected successfully')
        })
        .catch((error) => {
            console.log('Cannot connect to PostgreSQL')
            console.log(error)
        })
}

function connect() {
    connectToMongoDB()
    connectToPostgres()
}

module.exports = { connect, postgres }