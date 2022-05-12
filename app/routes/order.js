const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order');

router.get('/', orderController.getOrdersByKeys);
router.post('/status', orderController.updateStatusAll);
router.post('/manage-order/reject', orderController.rejectAll);
router.patch('/:id', orderController.updateStatus);

router.get('/top-food', orderController.getTopOrderedFood);

router.post('/', orderController.createOrder);

module.exports = router;