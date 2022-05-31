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


router.use('/top-food', topFoodRouter)
router.use('/status', statusRouter)

router.get('/', getOrdersByKeys)
router.post('/', createOrder)
router.patch('/:id', validateRequestBody(['status']), updateStatus)

module.exports = router