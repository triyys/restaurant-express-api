const EmployeeModel = require('../models/EmployeeModel')
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')
const { customResponse } = require('../utils')

const signIn = async (req, res, next) => {
    const { username, password } = req.body
    const user = await EmployeeModel.findOne({ username })
    if (user) {
        const isValidPassword = await argon2.verify(user.password, password)
        if (isValidPassword) {
            const accessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET)
            return res.status(200).send(customResponse('Log in successfully', accessToken))
        } else {
            return res.status(401).send(customResponse(new Error('Wrong username or password')))
        }
    } else {
        return res.status(401).send(customResponse(new Error('Wrong username or password')))
    }
}

const signUp = async (req, res, next) => {
    const { username, password } = req.body
    const user = await EmployeeModel.findOne({ username, password })
    if (user) {
        return res.status(400).send(customResponse(new Error('Username is existed')))
    } else {
        const hashedPassword = await argon2.hash(password)
        const user = await EmployeeModel.create({ username, password: hashedPassword })
        const accessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET)
        
        return res.status(200).send(customResponse(`Employee ${user._id} is created`, accessToken))
    }
}

module.exports = {
    signIn,
    signUp,
}