const express = require('express')
const router = express.Router()
const { getTopOrderedFoods } = require('../../controllers/order')
const { validateQuery } = require('../../middlewares')

router.get('/', validateQuery(['count']), getTopOrderedFoods)

module.exports = router