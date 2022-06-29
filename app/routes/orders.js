const express = require('express')
const router = express.Router()
const {
    createOrder,
    updateStatus,
    getAllOrder,
    getOrderById,
    updateStatusAll
} = require('../controllers/order')
const { validateRequestBody, verifyAccessToken } = require('../middlewares')


router.post(
    '/status',
    verifyAccessToken,
    validateRequestBody(['selectedStatus', 'newStatus']),
    updateStatusAll
)

router.get('/', verifyAccessToken, getAllOrder)
router.get('/:id', verifyAccessToken, getOrderById)
router.post('/', verifyAccessToken, createOrder)
router.patch('/:id', verifyAccessToken, validateRequestBody(['status']), updateStatus)

module.exports = router