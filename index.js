const express = require('express')
const cors = require('cors')

const route = require('./app/routes')
const { inputLogger } = require('./app/middlewares')
const ErrorHandler = require('./app/common/ErrorHandler')
const { port, cors: corsConfig } = require('./config')

const app = express()

// Use initial middlewares
app.use(cors(corsConfig))
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(inputLogger(console))

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