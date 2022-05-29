/**
 * Validation middleware for checking the missing fields
 * @param {Array} fields Fields to validate
 * @returns A middleware callback function
 */
const validateQuery = (fields) => {
    return (req, res, next) => {
        fields.forEach((field) => {
            if (!req.query[field]) {
                res.status(400).send(`${field} is missing`)
            }
        })
        next()
    }
}

module.exports = validateQuery