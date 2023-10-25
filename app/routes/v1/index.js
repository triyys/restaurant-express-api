const express = require('express');
const router = express.Router();

const { verifyAccessToken } = require('@/middlewares');
const authsRouter = require('./auths');
const bannersRouter = require('./banners');
const foodsRouter = require('./foods');
const ordersRouter = require('./orders');
const paymentRouter = require('./payment');

router.use('/auths', authsRouter);
router.use('/banners', bannersRouter);
router.use('/foods', foodsRouter);
router.use('/orders', verifyAccessToken, ordersRouter);
router.use('/payment', paymentRouter);

module.exports = router;
