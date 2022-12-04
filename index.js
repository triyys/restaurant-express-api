const express = require('express')
const cors = require('cors')
const path = require('path')
const moduleAlias = require('module-alias')
moduleAlias.addAliases({
    '@root': __dirname,
    '@': path.join(__dirname, 'app'),
})

const route = require('@/routes')
const { inputLogger } = require('@/middlewares')
const ErrorHandler = require('@/common/ErrorHandler')
const { port, cors: corsConfig } = require('./config')

const app = express()

// Use initial middlewares
app.use(cors(corsConfig))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(inputLogger(console))
app.use(
    '/api/docs/swagger',
    (req, res) => res.redirect('/swagger')
)

// Routes init
route(app)

// Default error handler
app.use((error, req, res, next) => {
    console.log(`Caught the error: ${error}`)
    return res.status(500).send(error.toString())
})

app.listen(port, async () => {
    console.log(`Server is running on port ${port}.`)
    try {
        await ErrorHandler.loadErrorDictionary()
        console.log('All data loaded')
    } catch (error) {
        console.log(error)
        console.error('Failed to load app data')
    }
})