const OrderModel = require('../models/OrderModel')
const FoodModel = require('../models/FoodModel')

// [POST] /orders
const createOrder = function(req, res, next) {
    OrderModel.create(req.body)
        .then((order) => {
            const result = {
                status: true,
                message: `Order ${order._id} is created`,
            }
            console.log(result)
            return res.status(200).send(result)
        })
        .catch(next)
}

// [GET] /orders?
const getOrdersByKeys = function(req, res, next){
    OrderModel.find(req.query)
        .then((orders) => {
            return res.status(200).send(orders)
        })
        .catch(next)
}

// [PATCH] /orders/:id
const updateStatus = function(req, res, next){
    const { id } = req.params
    const { status } = req.body

    OrderModel.findByIdAndUpdate({ _id: id }, { status })
        .then(() => {
            const result = {
                status: true,
                message: `Order ${id} is updated`,
            }
            console.log(result)
            return res.status(200).send(result)
        })
        .catch(next)
}

// [POST] /orders/status
const updateStatusAll = function(req, res, next){
    const { selectedStatus, newStatus } = req.body
    OrderModel
        .updateMany({ status: selectedStatus }, { status: newStatus })
        .then((data) => {
            const {
                acknowledged,
                modifiedCount,
                matchedCount,
            } = data
            const result = {
                status: acknowledged,
                message: matchedCount > 0 ? `${modifiedCount} document(s) updated` : 'No documents found',
            }
            console.log(result)
            return res.status(200).send(result)
        })
        .catch(next)
}

// [GET] /orders/top-food?count={int}
const getTopOrderedFoods = function(req, res, next) {
    const { count } = req.query
    OrderModel
        .aggregate()
        .project({_id: 0, items: 1})
        .unwind('items')
        .group({_id: "$items.name", orderCount: {$sum: 1}})
        .sort('-orderCount')
        .limit(parseInt(count))
        .then(topOrderedFoods => {
            const foodCallbacks = []
            topOrderedFoods.forEach(topOrderedFood => {
                foodCallbacks.push(FoodModel.findOne({ name: topOrderedFood._id }))
            })
            Promise.all(foodCallbacks)
                .then(foods => {
                    foods.forEach(function(food, index) {
                        if (this[index]) {
                            this[index] = this[index].toObject()
                            this[index].no = topOrderedFoods[index].orderCount
                        }
                    }, foods)
                    res.send(foods.filter(food => food))
                })
                .catch(next)
        })
        .catch(next)
}

module.exports = {
    createOrder,
    getOrdersByKeys,
    updateStatus,
    updateStatusAll,
    getTopOrderedFoods,
}