const { Sequelize } = require('sequelize')
const { postgresql } = require('../../config')

const postgres = new Sequelize(postgresql.url)

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

module.exports = postgres