const express = require('express')
const cors = require('cors')
const path = require('path')

const route = require('@/routes')
const { inputLogger } = require('@/middlewares')
const { cors: corsConfig } = require('./config')

const app = express()

// Use initial middlewares
app.use(cors(corsConfig))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(inputLogger(console))

// Routes init
route(app)

module.exports = app;
