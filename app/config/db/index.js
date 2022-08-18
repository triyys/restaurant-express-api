const mongoose = require('mongoose')

const uri = process.env.MONGODB_CONNECTION_STRING

async function connect() {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log('Database connected successfully')
    } catch (error) {
        console.log('Cannot connect to database')
        console.log(error)
        process.exit()
    }
}

module.exports = { connect }