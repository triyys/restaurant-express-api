const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const SchemaTypes = mongoose.SchemaTypes;

const Food = new Schema({
    name: String,
    price: Number,
    discount: String, // 'x%' or number
    imageUrls: [String],
    description: String,
    optionIds: [SchemaTypes.ObjectId],
    type: { type: String },
});

module.exports = mongoose.model('foods', Food);