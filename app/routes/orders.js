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
const { validateRequestBody, validateQuery, verifyAccessToken } = require('../middlewares')


router.get('/top-food', validateQuery(['count']), getTopOrderedFoods)
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