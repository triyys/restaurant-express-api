const FoodModel = require('../models/FoodModel')
const { ObjectId } = require('mongoose').Types

const getCartItems = (req, res, next) => {
    const cartIds = JSON.parse(req.query.list)
    // Some id may not have type ObjectId of Mongo, hence must filter valid id value
    // NOTE: in aggregation, we must use SchemaType of value exactly 
    // (It's hard to debug because of JS dynamic type)
    const foodIds = cartIds
    .filter(id => ObjectId.isValid(id))
    .map(value => ObjectId(value.toString()))

    FoodModel.find({"_id": { $in: foodIds }}, {'optionIds': false})
        .then((foods) => {
            return res.status(200).send(foods)
        })
        .catch(next)
}

module.exports = {
    getCartItems,
}