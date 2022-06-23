const { isValidObjectId } = require("mongoose")
const { customResponse } = require("../../utils")

const validateObjectId = (names) => {
    if (!Array.isArray(names)) names = [names]
    return (req, res, next) => {
        for (const name of names) {
            if (!isValidObjectId(req.params[name])) {
                return res.status(400).send(customResponse(new Error('Invalid resource')))
            }
        }
        next()
    }
}

module.exports = validateObjectId