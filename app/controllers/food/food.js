const FoodModel = require('@/models/FoodModel')
const OptionModel = require('@/models/OptionModel')
const { success } = require('@/responses')
const { getMongoDocById } = require('@/utils')

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

// [GET] /foods/count
const getOnlyFoodCount = (req, res, next) => {
    FoodModel.count(req.query)
        .then((count) => {
            return res.status(200).send(success({ count }))
        })
        .catch(next)
}

// [GET] /foods
const getAllFood = (req, res, next) => {
    const { sort, limit, offset } = req.query
    let query = FoodModel.find(req.query)

    if (sort === 'asc' || sort === 'desc') {
        query = query.sort({ price: sort })
    }
    if (Number.isInteger(Number(offset)) && Number(offset) > 0) {
        query = query.skip(Number(offset))
    }
    query = query.limit(Number(limit) || 5)

    query
        .then((foods) => {
            return res.status(200).send(foods)
        })
        .catch(next)
}

// [POST] /foods
const createFood = (req, res, next) => {
    FoodModel.create(req.body)
        .then((food) => {
            return res
                .location(`${req.originalUrl}/${food._id}`)
                .status(201)
                .send(success())
        })
        .catch(next)
}

// [PUT] /foods/:id
const updateFood = (req, res, next) => {
    const { id } = req.params
    FoodModel.findByIdAndUpdate(id, { $set: req.body })
        .then(() => res.status(204).send())
        .catch(next)
}

// [DELETE] /foods/:id
const deleteFood = (req, res, next) => {
    const { id } = req.params
    FoodModel.findByIdAndDelete(id)
        .then(() => res.status(204).send())
        .catch(next)
}

module.exports = {
    getFoodById,
    getFoodDetailById,
    getOnlyFoodCount,
    getAllFood,
    getAllFood,
    createFood,
    updateFood,
    deleteFood,
}
