const mongoose = require('mongoose')

const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.CLUSTER_NAME}.mongodb.net/RestaurantPOS?retryWrites=true&w=majority`

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