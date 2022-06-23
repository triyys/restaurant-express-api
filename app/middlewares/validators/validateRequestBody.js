/**
 * Validation middleware for checking the missing keys
 * @param {Array<string>} keys Keys to validate
 * @returns A middleware callback function
 */
const validateRequestBody = (keys) => {
    return (req, res, next) => {
        for (const key of keys) {
            if (!req.body[key]) {
                return res.status(400).send(`${key} is missing`)
            }
        }
        next()
    }
}

module.exports = validateRequestBody