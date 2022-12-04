const OrderModel = require('@/models/OrderModel')
const FoodModel = require('@/models/FoodModel')

// [GET] /foods/top-food?count={int}
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
    getTopOrderedFoods,
}