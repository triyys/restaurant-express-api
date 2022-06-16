const express = require('express')
const router = express.Router()
const { signIn, signUp } = require('../controllers/auth')
const { validateRequestBody, inputLogger } = require('../middlewares')
const { useError } = require('../utils')

router.post(
    '/login',
    validateRequestBody(['username', 'password']),
    inputLogger,
    useError(signIn)
)
router.post(
    '/register',
    validateRequestBody(['username', 'password']),
    inputLogger,
    useError(signUp)
)

module.exports = router