const { Schema } = require('mongoose')
const mongodb = require('../services/mongodb')

const Banner = new Schema({
    imageUrls: [String]
}, {
    timestamps: {
        createdAt: true,
        updatedAt: false,
    },
})

module.exports = mongodb.model('banners', Banner)