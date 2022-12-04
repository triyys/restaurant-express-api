const mongoModelClient = require('@/services/mongoModelClient')

const employee = {
    modelName: 'employees',
    attributes: {
        username: {
            type: 'string',
            required: true,
        },
        password: {
            type: 'string',
            required: true,
        },
    },
    options: {
        timestamps: true,
    }
}

module.exports = mongoModelClient.createModel(employee)