const express = require('express')
const router = express.Router()
const {
    getOrdersByKeys,
    createOrder,
    updateStatus,
} = require('../../controllers/order')
const topFoodRouter = require('./topFood')
const statusRouter = require('./status')
const { validateRequestBody } = require('../../middlewares')


router.get('/', getOrdersByKeys)
router.post('/', createOrder)
router.patch('/:id', validateRequestBody(['status']), updateStatus)

router.use('/top-food', topFoodRouter)
router.use('/status', statusRouter)

module.exports = router