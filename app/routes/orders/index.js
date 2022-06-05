const express = require('express')
const router = express.Router()
const {
    createOrder,
    updateStatus,
    getAllOrder,
    getOrderById,
} = require('../../controllers/order')
const topFoodRouter = require('./topFood')
const statusRouter = require('./status')
const { validateRequestBody } = require('../../middlewares')


router.use('/top-food', topFoodRouter)
router.use('/status', statusRouter)

router.get('/', getAllOrder)
router.get('/:id', getOrderById)
router.post('/', createOrder)
router.patch('/:id', validateRequestBody(['status']), updateStatus)

module.exports = router