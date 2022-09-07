const jwt = require('jsonwebtoken')
const { jwtSecret } = require('../../config')
const { failure } = require('../responses')

const verifyAccessToken = (req, res, next) => {
    const authorization = req.header('Authorization')
    if (!authorization) {
        return res.status(401).send(failure({ errcode: '-7' }))
    }
    
    const [type, accessToken] = authorization.split(' ')
    if (type === 'Bearer') {
        try {
            const decoded = jwt.verify(accessToken, jwtSecret)
            req.userId = decoded.userId
            next()
        } catch (error) {
            console.log(error.message)
            return res.status(403).send(failure({ errcode: '-8' }))
        }
    }
    else {
        return res.status(401).send(failure({ errcode: '-9' }))
    }
}

module.exports = verifyAccessToken