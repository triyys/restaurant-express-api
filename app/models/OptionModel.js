const mongoose = require('mongoose')

const Schema = mongoose.Schema

const Option = new Schema({
    name: String,
    isMultiSelect: Boolean,
    items: [{
        name: String,
        price: Number,
    }],
})

module.exports = mongoose.model('options', Option)