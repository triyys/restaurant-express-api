const EmployeeModel = require('@/models/EmployeeModel')
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')
const { jwtSecret } = require('@root/config')
const { success, failure } = require('@/responses')

const signIn = async (req, res, next) => {
    const { username, password } = req.body
    const user = await EmployeeModel.findOne({ username })
    if (user) {
        const isValidPassword = await argon2.verify(user.password, password)
        if (isValidPassword) {
            const accessToken = jwt.sign({ userId: user._id }, jwtSecret, {
                expiresIn: '1h',
            })
            return res.status(200).send(success({ accessToken }))
        } else {
            return res.status(401).send(failure({ errcode: '-5' }))
        }
    } else {
        return res.status(401).send(failure({ errcode: '-5' }))
    }
}

const signUp = async (req, res, next) => {
    const { username, password } = req.body
    const user = await EmployeeModel.findOne({ username, password })
    if (user) {
        return res.status(400).send(failure({ errcode: '-6' }))
    } else {
        const hashedPassword = await argon2.hash(password)
        const user = await EmployeeModel.create({ username, password: hashedPassword })
        const accessToken = jwt.sign({ userId: user._id }, jwtSecret, {
            expiresIn: '1h',
        })
        
        return res.status(200).send(success({ accessToken, userId: user._id }))
    }
}

module.exports = {
    signIn,
    signUp,
}