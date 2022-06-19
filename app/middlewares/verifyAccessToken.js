const jwt = require('jsonwebtoken')
const { customResponse } = require('../utils')

const verifyAccessToken = (req, res, next) => {
    const authorization = req.header('Authorization')
    if (!authorization) {
        return res.status(401).send(customResponse(new Error('Authorization is missing')))
    }
    
    const [type, accessToken] = authorization.split(' ')
    if (type === 'Bearer') {
        try {
            const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
            return res.status(200).send(customResponse(decoded.userId))
        } catch (error) {
            return res.status(403).send(customResponse(error))
        }
    }
    else {
        return res.status(401).send(customResponse(new Error('Bearer is missing')))
    }
}

module.exports = verifyAccessToken