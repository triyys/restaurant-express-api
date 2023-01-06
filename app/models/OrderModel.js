const mongoModelClient = require('@/services/mongoModelClient')

const order = {
    modelName: 'orders',
    attributes: {
        customerInfo: 'ref',
        shipFee: {
            type: 'number',
            required: true,
        },
        status: {
            type: 'string',
            default: 'Đang chờ xử lý',
        },
        items: {
            type: '[ref]',
            required: true,
        },
    },
    options: {
        timestamps: true,
    },
}

// const Order = new Schema({
//     customerInfo: {
//         name: String,
//         address: String,
//         phone: String,
//         district: String,
//         ward: String,
//         typeOrder: String, 
//     },
//     shipFee: Number,
//     status: { type : String, default : 'Đang chờ xử lý'},
//     items: [{
//         options: String,
//         name: String,
//         imageUrl: String,
//         price: Number,
//         // discount: String, // 'x%' or number
//         quantity: Number
//     }]
// }, {
//     timestamps: {
//         createdAt: true,
//         updatedAt: false
//     }
// })

module.exports = mongoModelClient.createModel(order)