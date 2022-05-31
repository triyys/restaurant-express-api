const FoodModel = require('../models/FoodModel')
const ObjectId = require('mongoose').Types.ObjectId

const getCartItems = async function (req, res) {
    let preItemIds = JSON.parse(req.query.list)
    // Some id may not have type ObjectId of Mongo, hence must filter valid id value
    // NOTE: in aggregation, we must use SchemaType of value exactly 
    // (It's hard to debug because of JS dynamic type)
    let validItemIds = preItemIds.filter(value =>
        ObjectId.isValid(value)
    ).map(value => ObjectId(value.toString()))

    try {
        const items = await FoodModel.find(
            { "_id": { $in: validItemIds } },
            { 'optionIds': false } 
        )
        res.status(200).send(items)
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.code })
    }
}

module.exports = {
    getCartItems,
}