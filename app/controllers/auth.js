const EmployeeModel = require('../models/EmployeeModel')
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')

const signIn = async (req, res, next) => {
    const { username, password } = req.body
    const user = await EmployeeModel.findOne({ username })
    if (user) {
        const isValidPassword = await argon2.verify(user.password, password)
        if (isValidPassword) {
            const accessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET)
            const result = {
                status: true,
                message: 'Log in successfully',
                accessToken,
            }
            console.log(result)
            return res.status(200).send(result)
        } else {
            const result = {
                status: false,
                message: 'Wrong username or password',
            }
            console.log(result)
            return res.status(401).send(result)
        }
    } else {
        const result = {
            status: false,
            message: 'Wrong username or password',
        }
        console.error(result)
        return res.status(401).send(result)
    }
}

const signUp = async (req, res, next) => {
    const { username, password } = req.body
    const user = await EmployeeModel.findOne({ username, password })
    if (user) {
        const result = {
            status: false,
            message: 'Username is existed',
        }
        console.log(result)
        return res.status(400).send(result)
    } else {
        const hashedPassword = await argon2.hash(password)
        const user = await EmployeeModel.create({ username, password: hashedPassword })
        const accessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET)
        const result = {
            status: true,
            message: `Employee ${user._id} is created`,
            accessToken,
        }
        console.log(result)
        return res.status(200).send(result)
    }
}

module.exports = {
    signIn,
    signUp,
}