const express = require('express')
const router = express.Router()
const { getAllOptions } = require('../../controllers/food')

router.get('/', getAllOptions)

module.exports = router