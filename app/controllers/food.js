const FoodModel = require('../models/FoodModel');
const OptionModel = require('../models/OptionModel');
const ObjectId = require('mongoose').Types.ObjectId;
var paypal = require('paypal-rest-sdk');

paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'AdtWJe_iauGK_BYkayDGxnJkFwlpzGcjX7n6pLG7rbZAD87T9kyoSJD6N2RYnpHTpyNNdpe3E0tU5HqL',
    'client_secret': 'ENJeGQ5ctfVzIjeqMBUCLlJZDdFhShCOWvy_ZL5YiwYd0Ge3Gg1siDR81rS2FjW86Ceu2YcS05_5lg2C'
});

const getFoodById = async function (req, res) {
    const foodId = req.params.id;
    try {
        const food = await FoodModel.findById(foodId).exec();
        res.status(200).send(food);
    }
    catch (err) {
        console.log(err);
        res.status(500).send({ msg: "INTERNAL SERVER ERROR !!!" });
    }
}

const getFoodDetailById = async function (req, res) {
    const foodId = req.params.id;
    var food = await FoodModel.findById(foodId);
    food = food.toObject();
    food.orderOptions = [];
    for (let i = 0; i < food.optionIds.length; i++) {
        var option = await OptionModel.findById(food.optionIds[i]);
        option = option.toObject();
        option.options = option.items.map((item) => {
            return item.name;
        })

        option.price = option.items.map((item) => {
            return item.price;
        })

        option.answer = option.items.map((item, idx) => { return false });
        if (!option.isMultiSelect) {
            option.answer[0] = true;
        }

        delete option.items;

        option.title = option.name;
        delete option.name;
        food.orderOptions[i] = option;
    }
    food.images = food.imageUrls;
    delete food.imageUrls;

    food.unitPrice = food.price;
    delete food.price;

    res.status(200).send(food);
}

const getAllFood = async function(req, res) {
    const food = await FoodModel.find().exec();
    res.status(200).send(food);
}

const createFood = async function (req, res) {
    const foodData = req.body
    const optionIds = foodData.optionIds.map(value => new ObjectId(value))
    const newFood = { ...foodData, optionIds: optionIds, discount: String(foodData.discount) + '%' }
    try {
        await FoodModel.create(newFood)
        res.send({ msg: 'ADDED OK' })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: "ERROR" })
    }
}

const getOptions = async function (req, res) {
    try {
        const options = await OptionModel.find().exec()
        res.status(200).send(options)
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: 'Error' })
    }
}

const updateFood = async function (req, res) {
    const foodId = req.params.id
    const foodData = req.body
    const optionIds = foodData.optionIds.map(value => new ObjectId(value))

    const newFood = { ...foodData, optionIds: optionIds, discount: foodData.discount + '%' }

    try {
        await FoodModel.findByIdAndUpdate(foodId, { $set: newFood })
        res.send({ msg: 'UPDATED OK' })
    } catch (err) {
        console.log(err)
        res.status(500).send({ msg: 'INTERAL SERVER ERROR' })
    }
}

const deleteFood = async function(req, res) {
    const foodId = req.params.id
    try {
        await FoodModel.findByIdAndDelete(foodId)
        res.send({ msg: 'DELETED OK' })
    } catch (err) {
        console.log(err)
        res.status(500).send({ msg: 'INTERAL SERVER ERROR' })
    }
}

module.exports = {
    getFoodById,
    getFoodDetailById,
    getAllFood,
    getAllFood,
    createFood,
    getOptions,
    updateFood,
    deleteFood,
}
