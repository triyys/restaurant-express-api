const express = require('express')
const router = express.Router()

const { exchangeCodeForToken } = require('../controllers/oauth2')

router.get('/', exchangeCodeForToken)

module.exports = router