const OrderModel = require('../../models/OrderModel')
const { getMongoDocById } = require('../../utils')

// [GET] /orders
const getAllOrder = (req, res, next) => {
    OrderModel.find(req.query)
        .then((orders) => {
            return res.status(200).send(orders)
        })
        .catch(next)
}

// [GET] /orders/:id
const getOrderById = getMongoDocById(OrderModel)

// [POST] /orders
const createOrder = function(req, res, next) {
    OrderModel.create(req.body)
        .then((order) => {
            const result = {
                status: true,
                message: `Order ${order._id} is created`,
            }
            return res.status(200).send(result)
        })
        .catch(next)
}

module.exports = {
    getAllOrder,
    getOrderById,
    createOrder,
}