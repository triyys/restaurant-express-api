const { Schema } = require('mongoose')
const mongodb = require('../services/mongodb')

const Order = new Schema({
    customerInfo: {
        name: String,
        address: String,
        phone: String,
        district: String,
        ward: String,
        typeOrder: String, 
    },
    shipFee: Number,
    status: { type : String, default : 'Đang chờ xử lý'},
    items: [{
        options: String,
        name: String,
        imageUrl: String,
        price: Number,
        // discount: String, // 'x%' or number
        quantity: Number
    }]
}, {
    timestamps: {
        createdAt: true,
        updatedAt: false
    }
})

module.exports = mongodb.model('orders', Order)