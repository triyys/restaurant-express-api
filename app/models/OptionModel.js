const mongoModelClient = require('../services/mongoModelClient')

const option = {
    modelName: 'options',
    attributes: {
        name: {
            type: 'string',
            required: true,
        },
        isMultiSelect: {
            type: 'boolean',
            required: true,
        },
        items: [{
            name: String,
            price: Number,
        }],
    },
    options: {
        timestamps: true,
    },
}

module.exports = mongoModelClient.createModel(option)