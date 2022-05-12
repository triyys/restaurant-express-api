const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/payment');

router.post('/process', paymentController.processPayment);
router.get('/success', paymentController.successPayment);
router.get('/cancel', paymentController.cancelPayment);

module.exports = router;