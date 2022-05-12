const OrderModel = require('../models/OrderModel');
const FoodModel = require('../models/FoodModel');

const createOrder = function(req, res, next) {
    OrderModel.create(req.body)
        .then(() => res.send('LƯU ORDER: ', req.body))
        .catch(next);
}

// [GET] /order?
const getOrdersByKeys = function(req, res, next){
    OrderModel.find(req.query)
        .then(orders => res.send(orders))
        .catch(next);
}

// [PATCH] /order/:id
const updateStatus = function(req, res, next){
    const { status } = req.body;

    OrderModel.findByIdAndUpdate({ _id: req.params.id }, { status })
        .then(() => res.send('Update successfully'))
        .catch(next);
}

// [POST] /order/status
const updateStatusAll = function(req, res, next){
    OrderModel.updateMany({ status: req.body.statusCurr }, { status: req.body.statusUpdate })
        .then(() => res.send('Accept all successfully'))
        .catch(next);
}

// [POST] /order/manage-order/reject
const rejectAll = function(req, res, next){
    OrderModel.updateMany({ status: req.body.status }, { status: 'Đã từ chối' })
        .then(() => res.send('Reject all successfully'))
        .catch(next);
}

// [GET] /order/top-food
const getTopOrderedFood = function(req, res, next) {
    OrderModel
        .aggregate()
        .project({_id: 0, items: 1})
        .unwind('items')
        .group({_id: "$items.name", orderCount: {$sum: 1}})
        .sort('-orderCount')
        .limit(8)
        .then(topOrderedFoods => {
            const foodCallbacks = [];
            topOrderedFoods.forEach(topOrderedFood => {
                foodCallbacks.push(FoodModel.findOne({ name: topOrderedFood._id }));
            });
            Promise.all(foodCallbacks)
                .then(foods => {
                    foods.forEach(function(food, index) {
                        if (this[index]) {
                            this[index] = this[index].toObject();
                            this[index].no = topOrderedFoods[index].orderCount;
                        }
                    }, foods);
                    res.send(foods.filter(food => food));
                })
                .catch(next);
        })
        .catch(next);
}

module.exports = {
    createOrder,
    getOrdersByKeys,
    updateStatus,
    updateStatusAll,
    rejectAll,
    getTopOrderedFood,
}