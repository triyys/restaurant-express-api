const jwt = require('jsonwebtoken')
const { customResponse } = require('../utils')
const { jwtSecret } = require('../../config/env')

const verifyAccessToken = (req, res, next) => {
    const authorization = req.header('Authorization')
    if (!authorization) {
        return res.status(401).send(customResponse(new Error('-7')))
    }
    
    const [type, accessToken] = authorization.split(' ')
    if (type === 'Bearer') {
        try {
            const decoded = jwt.verify(accessToken, jwtSecret)
            req.userId = decoded.userId
            next()
        } catch (error) {
            console.log(error.message)
            return res.status(403).send(customResponse(new Error('-8')))
        }
    }
    else {
        return res.status(401).send(customResponse(new Error('-9')))
    }
}

module.exports = verifyAccessToken