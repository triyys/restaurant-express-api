const express = require('express')
const router = express.Router()
const { getCartItems } = require('../../controllers/cart')

router.get('/', getCartItems)

module.exports = router