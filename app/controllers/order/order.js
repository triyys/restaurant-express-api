const OrderModel = require('../../models/OrderModel')
const { success } = require('../../responses')
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
            return res
                .location(`${req.originalUrl}/${order._id}`)
                .status(201)
                .send(success())
        })
        .catch(next)
}

module.exports = {
    getAllOrder,
    getOrderById,
    createOrder,
}