const inputLogger = (viewport) => {
    return (req, res, next) => {
        const input = {
            ...req.params,
            ...req.query,
            ...req.body,
        }
        viewport.log(`[${req.method}] ${req.originalUrl}: `, input)
        next()
    }
}

module.exports = inputLogger