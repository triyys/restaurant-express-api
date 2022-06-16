const inputLogger = (req, res, next) => {
    const input = {
        ...req.params,
        ...req.query,
        ...req.body,
    }
    console.log(`${req.originalUrl}: `, input)
    next()
}

module.exports = inputLogger