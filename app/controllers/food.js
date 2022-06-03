const FoodModel = require('../models/FoodModel')
const OptionModel = require('../models/OptionModel')

// [GET] /foods/:id
const getFoodById = (req, res, next) => {
    FoodModel.findById(req.params.id)
        .then((food) => {
            return res.status(200).send(food)
        })
        .catch(next)
}

const getFoodDetailById = async function (req, res) {
    const { id: foodId } = req.params
    var food = await FoodModel.findById(foodId)
    food = food.toObject()
    food.orderOptions = []
    for (let i = 0; i < food.optionIds.length; i++) {
        var option = await OptionModel.findById(food.optionIds[i])
        option = option.toObject()
        option.options = option.items.map((item) => {
            return item.name
        })

        option.price = option.items.map((item) => {
            return item.price
        })

        option.answer = option.items.map((item, idx) => { return false })
        if (!option.isMultiSelect) {
            option.answer[0] = true
        }

        delete option.items

        option.title = option.name
        delete option.name
        food.orderOptions[i] = option
    }
    food.images = food.imageUrls
    delete food.imageUrls

    food.unitPrice = food.price
    delete food.price

    res.status(200).send(food)
}

// [GET] /foods
const getAllFood = (req, res, next) => {
    FoodModel.find()
        .then((foods) => {
            return res.status(200).send(foods)
        })
        .catch(next)
}

// [POST] /foods
const createFood = (req, res, next) => {
    FoodModel.create(req.body)
        .then((food) => {
            const result = {
                status: true,
                message: `Food ${food._id} is created`,
            }
            console.log(result)
            return res.status(200).send(result)
        })
        .catch(next)
}

// [PUT] /foods/:id
const updateFood = (req, res, next) => {
    const { id } = req.params
    FoodModel.findByIdAndUpdate(id, { $set: req.body })
        .then(() => {
            const result = {
                status: true,
                message: `Food ${id} is updated`,
            }
            console.log(result)
            return res.status(200).send(result)
        })
        .catch(next)
}

// [DELETE] /foods/:id
const deleteFood = (req, res, next) => {
    const { id } = req.params
    FoodModel.findByIdAndDelete(id)
        .then(() => {
            const result = {
                status: true,
                message: `Food ${id} is deleted`,
            }
            return res.status(200).send(result)
        })
        .catch(next)
}

// [GET] /foods/options
const getAllOptions = (req, res, next) => {
    OptionModel.find()
        .then((options) => {
            return res.status(200).send(options)
        })
        .catch(next)
}

module.exports = {
    getFoodById,
    getFoodDetailById,
    getAllFood,
    getAllFood,
    createFood,
    updateFood,
    deleteFood,
    getAllOptions,
}
