const express = require('express')
const router = express.Router()
const { getOptions } = require('../../controllers/food')

router.get('/', getOptions)

module.exports = router