const { createConnection } = require('mongoose')
const { mongodb: mongodbConfig } = require('../../config')

const mongodb = createConnection(mongodbConfig.url)

;(() => {
    mongodb.on('connected', () => console.log('MongoDB is connected successfully'))
    mongodb.on('error', (error) => {
        console.log('Cannot connect to MongoDB')
        console.log(error)
    })
})()

module.exports = mongodb