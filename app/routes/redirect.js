const express = require('express')
const router = express.Router()

const { exchangeCodeForToken } = require('@/controllers/redirect')

router.get('/', exchangeCodeForToken)

module.exports = router