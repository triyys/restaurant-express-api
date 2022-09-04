const jwt = require('jsonwebtoken')
const { customResponse } = require('../utils')
const { jwtSecret } = require('../../config/env')

const verifyAccessToken = (req, res, next) => {
    const authorization = req.header('Authorization')
    if (!authorization) {
        return res.status(401).send(customResponse(new Error('Authorization is missing')))
    }
    
    const [type, accessToken] = authorization.split(' ')
    if (type === 'Bearer') {
        try {
            const decoded = jwt.verify(accessToken, jwtSecret)
            req.userId = decoded.userId
            next()
        } catch (error) {
            console.log(error.message)
            return res.status(403).send(customResponse(new Error('Invalid token')))
        }
    }
    else {
        return res.status(401).send(customResponse(new Error('Bearer is missing')))
    }
}

module.exports = verifyAccessToken