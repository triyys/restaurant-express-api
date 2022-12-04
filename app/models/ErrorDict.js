const postgresModelClient = require('@/services/postgresModelClient')

const errorDict = {
    modelName: 'errordict',
    attributes: {
        code: {
            type: 'string',
            primaryKey: true,
            allowNull: false,
        },
        vi: {
            type: 'string',
        },
        en: {
            type: 'string',
        }
    },
    options: {
        freezeTableName: true,
        timestamps: false,
    },
}

module.exports = postgresModelClient.createModel(errorDict)