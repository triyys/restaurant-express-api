const OptionModel = require('../../models/OptionModel')
const { getMongoDocById } = require('../../utils')

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
    getAllOptions,
    getOptionById,
}