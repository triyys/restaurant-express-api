const express = require('express')
const cors = require('cors')
const path = require('path')

// Module alias config
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

// Routes init
route(app)

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