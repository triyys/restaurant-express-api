const { Sequelize, DataTypes } = require('sequelize')
const { postgresql } = require('../../config')

const postgres = new Sequelize(postgresql.url, {
    dialect: postgresql.dialect,
})

;(() => {
    postgres.authenticate()
        .then(() => {
            console.log('PostgreSQL is connected successfully')
        })
        .catch((error) => {
            console.log('Cannot connect to PostgreSQL')
            console.log(error)
        })
})()

const typeMap = {
    'string': DataTypes.STRING,
    'number': DataTypes.NUMBER,
}

class PostgresAdapter {
    getModel(config) {
        const { modelName, attributes, options } = config

        for (const [key, value] of Object.entries(attributes)) {
            config.attributes[key]['type'] = typeMap[value['type']]
        }

        return postgres.define(modelName, attributes, options)
    }
}

module.exports = {
    PostgresAdapter,
}