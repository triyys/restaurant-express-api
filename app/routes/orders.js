const express = require('express')
const router = express.Router()
const {
    createOrder,
    updateStatus,
    getAllOrder,
    getOrderById,
    getTopOrderedFoods,
    updateStatusAll
} = require('../controllers/order')
const { validateRequestBody, validateQuery, inputLogger } = require('../middlewares')


router.get('/top-food', validateQuery(['count']), inputLogger, getTopOrderedFoods)
router.post(
    '/status',
    validateRequestBody(['selectedStatus', 'newStatus']),
    inputLogger,
    updateStatusAll
)

router.get('/', inputLogger, getAllOrder)
router.get('/:id', inputLogger, getOrderById)
router.post('/', inputLogger, createOrder)
router.patch('/:id', validateRequestBody(['status']), inputLogger, updateStatus)

module.exports = router