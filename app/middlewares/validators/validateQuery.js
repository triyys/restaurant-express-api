/**
 * Validation middleware for checking the missing fields
 * @param {Array<string>} fields Fields to validate
 * @returns A middleware callback function
 */
const validateQuery = (fields) => {
    return (req, res, next) => {
        for (const field of fields) {
            if (!req.query[field]) {
                return res.status(400).send(`${field} is missing`)
            }
        }
        next()
    }
}

module.exports = validateQuery