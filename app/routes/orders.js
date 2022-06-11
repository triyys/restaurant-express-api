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
const { validateRequestBody, validateQuery } = require('../middlewares')


router.get('/top-food', validateQuery(['count']), getTopOrderedFoods)
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