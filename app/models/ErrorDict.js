const { DataTypes } = require('sequelize')
const postgres = require('../services/postgres')

const ErrorDict = postgres.define('errordict', {
    code: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
    },
    vi: {
        type: DataTypes.STRING,
    },
    en: {
        type: DataTypes.STRING,
    },
}, {
    freezeTableName: true,
    timestamps: false,
})

module.exports = ErrorDict