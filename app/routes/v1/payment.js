const express = require('express');
const router = express.Router();
const { processPayment, successPayment, cancelPayment } = require('@/controllers/payment');
const { verifyAccessToken } = require('@/middlewares');

router.post('/', verifyAccessToken, processPayment);
router.get('/', successPayment);
router.get('/cancel', cancelPayment);

module.exports = router;
