const mongoose = require('mongoose')

const user = 'admin'
const password = 'admin'

const uri = `mongodb+srv://${user}:${password}@cluster0.cvwi8c5.mongodb.net/RestaurantPOS?retryWrites=true&w=majority`

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