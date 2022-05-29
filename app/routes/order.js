const express = require('express')
const router = express.Router()
const {
    getOrdersByKeys,
    getTopOrderedFoods,
    createOrder,
    updateStatus,
    updateStatusAll,
} = require('../controllers/order')
const { validateQuery } = require('../middlewares')

router.get('/', getOrdersByKeys)
router.get('/top-food', validateQuery(['count']), getTopOrderedFoods)

router.post('/', createOrder)

router.post('/status', updateStatusAll)
router.patch('/:id', updateStatus)

module.exports = router