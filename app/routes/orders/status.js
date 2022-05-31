const express = require('express')
const router = express.Router()
const { updateStatusAll } = require('../../controllers/order')
const { validateRequestBody } = require('../../middlewares')

router.post('/', validateRequestBody(['selectedStatus', 'newStatus']), updateStatusAll)

module.exports = router