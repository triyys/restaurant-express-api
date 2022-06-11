const mongoose = require('mongoose')

const Schema = mongoose.Schema

const Employee = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
}, {
    timestamps: {
        createdAt: true,
        updatedAt: true,
    },
})

module.exports = mongoose.model('employees', Employee)