const express = require('express')
const router = express.Router()
const { processPayment, successPayment, cancelPayment } = require('../controllers/payment')
const { verifyAccessToken } = require('../middlewares')

router.post('/process', verifyAccessToken, processPayment)
router.get('/success', successPayment)
router.get('/cancel', cancelPayment)

module.exports = router