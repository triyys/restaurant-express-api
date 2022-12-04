const v1 = require('./v1')

function route(app) {
    app.use('/api/v1', v1)

    // Api documents
    app.use('/api/docs/swagger', (req, res) => res.redirect('/swagger'))

    // Default error handler
    app.use((error, req, res, next) => {
        console.log(`Caught the error: ${error}`)
        return res.status(500).send(error.toString())
    })
}

module.exports = route
