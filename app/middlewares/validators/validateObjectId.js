const { isValidObjectId } = require("mongoose")
const { failure } = require("@/responses")

const validateObjectId = (names) => {
    if (!Array.isArray(names)) names = [names]
    return (req, res, next) => {
        for (const name of names) {
            if (!isValidObjectId(req.params[name])) {
                return res.status(400).send(failure({ errcode: '-4' }))
            }
        }
        next()
    }
}

module.exports = validateObjectId