const express = require('express');
const router = express.Router();
const { signIn, signUp } = require('@/controllers/auth');
const { validateRequestBody } = require('@/middlewares');
const { useError } = require('@/utils');

router.post('/login', validateRequestBody(['username', 'password']), useError(signIn));
router.post('/register', validateRequestBody(['username', 'password']), useError(signUp));

module.exports = router;
