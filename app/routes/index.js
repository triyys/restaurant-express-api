const { verifyAccessToken } = require('../middlewares')
const authsRouter = require('./auths')
const bannersRouter = require('./banners')
const foodsRouter = require('./foods')
const ordersRouter = require('./orders')
const paymentRouter = require('./payment')

function route(app) {
    app.use('/auths', authsRouter)
    app.use('/banners', bannersRouter)
    app.use('/foods', foodsRouter)
    app.use('/orders', verifyAccessToken, ordersRouter)
    app.use('/payment', paymentRouter)
}

module.exports = route
