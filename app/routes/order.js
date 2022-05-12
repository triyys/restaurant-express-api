const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order');

router.get('/', orderController.getOrdersByKeys);
router.get('/top-food', orderController.getTopOrderedFoods);

router.post('/', orderController.createOrder);

router.post('/status', orderController.updateStatusAll);
router.patch('/:id', orderController.updateStatus);

module.exports = router;