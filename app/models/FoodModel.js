const mongoModelClient = require('../services/mongoModelClient')

const food = {
    modelName: 'foods',
    attributes: {
        name: {
            type: 'string',
            required: true,
        },
        price: {
            type: 'number',
            required: true,
        },
        discount: 'string',
        imageUrls: '[string]',
        description: 'string',
        optionIds: {
            type: '[_id]',
        },
        type: {
            type: 'string',
        },
    },
    options: {
        timestamps: true,
    }
}

module.exports = mongoModelClient.createModel(food)