const FoodModel = require('../models/FoodModel')
const OptionModel = require('../models/OptionModel')
const { getMongoDocById } = require('../utils')

// [GET] /foods/:id
const getFoodById = getMongoDocById(FoodModel)

// [GET] /foods/:id/detail
const getFoodDetailById = (req, res, next) => {
    const { id } = req.params
    FoodModel.findById(id)
        .then((food) => {
            const foodDetail = food.toObject()
            foodDetail.images = foodDetail.imageUrls
            foodDetail.unitPrice = foodDetail.price
            delete foodDetail.imageUrls
            delete foodDetail.price
            
            const optionQueries = []
            foodDetail.optionIds.forEach((optionId) => {
                optionQueries.push(OptionModel.findById(optionId))
            })
            foodDetail.orderOptions = []
            Promise.all(optionQueries)
                .then((options) => options.map((option) => option.toObject()))
                .then((options) => {
                    options.forEach((option) => {
                        const { items, name, isMultiSelect } = option
                        const orderOption = {
                            options: items.map((item) => item.name),
                            price: items.map((item) => item.price),
                            answer: items.map((item) => false),
                            title: name,
                            isMultiSelect,
                        }
                        if (!isMultiSelect) {
                            orderOption.answer[0] = true
                        }
                    
                        foodDetail.orderOptions.push(orderOption)
                    })

                    return res.status(200).send(foodDetail)
                })
                .catch(next)
        })
        .catch(next)
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

// [GET] /foods/options/:id
const getOptionById = getMongoDocById(OptionModel)

module.exports = {
    getFoodById,
    getFoodDetailById,
    getAllFood,
    getAllFood,
    createFood,
    updateFood,
    deleteFood,
    getAllOptions,
    getOptionById,
}
