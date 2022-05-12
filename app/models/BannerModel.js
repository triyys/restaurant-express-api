const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Banner = new Schema({
    imageUrls: [String]
});

module.exports = mongoose.model('banners', Banner);