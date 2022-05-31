const express = require('express')
const router = express.Router()
const loginController = require('../controllers/login')

router.post('/', loginController.checkLogin)

module.exports = router