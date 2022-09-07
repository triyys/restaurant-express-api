const { Schema } = require('mongoose')
const mongodb = require('../services/mongodb')

const Option = new Schema({
    name: String,
    isMultiSelect: Boolean,
    items: [{
        name: String,
        price: Number,
    }],
})

module.exports = mongodb.model('options', Option)