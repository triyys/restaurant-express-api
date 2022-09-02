const { DataTypes } = require('sequelize')
const { postgres } = require('../../config/datastores')

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