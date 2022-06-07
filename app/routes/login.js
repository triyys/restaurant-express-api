const express = require('express')
const router = express.Router()
const { checkLogin } = require('../controllers/login')
const { validateRequestBody } = require('../middlewares')

router.post('/', validateRequestBody(['account', 'password']), checkLogin)

module.exports = router