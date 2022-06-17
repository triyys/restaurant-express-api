require('dotenv').config()
const express = require('express')
const cors = require('cors')

const db = require('./app/config/db')
const route = require('./app/routes')

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

// Routes init
route(app)

// Error handler
app.use((error, req, res, next) => {
    console.log(`Caught the error: ${error}`)
    return res.status(500).send(error.toString())
})

db.connect()

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
})