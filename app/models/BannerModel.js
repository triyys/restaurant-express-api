const mongoose = require('mongoose')

const Schema = mongoose.Schema

const Banner = new Schema({
    imageUrls: [String]
}, {
    timestamps: {
        createdAt: true,
        updatedAt: false,
    },
})

module.exports = mongoose.model('banners', Banner)