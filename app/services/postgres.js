const { Sequelize } = require('sequelize')

const postgres = new Sequelize(process.env.POSTGRESQL_CONNECTION_STRING)

module.exports = postgres