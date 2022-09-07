const { Schema } = require('mongoose')
const mongodb = require('../services/mongodb')

const Employee = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
}, {
    timestamps: {
        createdAt: true,
        updatedAt: true,
    },
})

module.exports = mongodb.model('employees', Employee)