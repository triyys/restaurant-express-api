const express = require('express')
const router = express.Router()
const {
    createOrder,
    updateStatus,
    getAllOrder,
    getOrderById,
    updateStatusAll
} = require('../controllers/order')
const { validateRequestBody } = require('../middlewares')


router.post(
    '/status',
    validateRequestBody(['selectedStatus', 'newStatus']),
    updateStatusAll
)

router.get('/', getAllOrder)
router.get('/:id', getOrderById)
router.post('/', createOrder)
router.patch('/:id', validateRequestBody(['status']), updateStatus)

module.exports = router