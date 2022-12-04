const mongoModelClient = require('@/services/mongoModelClient')

const transaction = {
    modelName: 'transactions',
    attributes: {
        amount: 'ref',
        payee: 'ref',
        description: 'string',
        item_list: 'ref',
        related_resources: 'array',
    },
    options: {
        timestamps: true,
    },
}

module.exports = mongoModelClient.createModel(transaction)