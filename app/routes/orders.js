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
const { validateRequestBody, validateQuery, inputLogger, verifyAccessToken } = require('../middlewares')


router.get('/top-food', validateQuery(['count']), inputLogger, getTopOrderedFoods)
router.post(
    '/status',
    verifyAccessToken,
    validateRequestBody(['selectedStatus', 'newStatus']),
    inputLogger,
    updateStatusAll
)

router.get('/', inputLogger, getAllOrder)
router.get('/:id', inputLogger, getOrderById)
router.post('/', verifyAccessToken, inputLogger, createOrder)
router.patch('/:id', verifyAccessToken, validateRequestBody(['status']), inputLogger, updateStatus)

module.exports = router