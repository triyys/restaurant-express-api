const { Schema, SchemaTypes } = require('mongoose')
const mongodb = require('../services/mongodb')

const Food = new Schema({
    name: String,
    price: Number,
    discount: String, // 'x%' or number
    imageUrls: [String],
    description: String,
    optionIds: [SchemaTypes.ObjectId],
    type: { type: String },
})

module.exports = mongodb.model('foods', Food)