require('dotenv').config()
const express = require('express')
const cors = require('cors')

const datastores = require('./config/datastores')
const route = require('./app/routes')
const { inputLogger } = require('./app/middlewares')
const ErrorHandler = require('./app/common/ErrorHandler')

const app = express()

const corsOptions = {
    origin: 'http://localhost:3000'
}

// Use initial middlewares
app.use(cors(corsOptions))
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())
app.use(inputLogger(console))

// Routes init
route(app)

// Error handler
app.use((error, req, res, next) => {
    console.log(`Caught the error: ${error}`)
    return res.status(500).send(error.toString())
})

datastores.connect()

const PORT = process.env.PORT || 8080
app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}.`)
    await ErrorHandler.loadErrorDictionary()
    console.log('All data loaded')
})