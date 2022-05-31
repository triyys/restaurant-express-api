const bannersRouter = require('./banners')
const cartRouter = require('./cart')
const foodsRouter = require('./foods')
const loginRouter = require('./login')
const ordersRouter = require('./orders')
const paymentRouter = require('./payment')

function route(app) {
    app.use('/banners', bannersRouter)
    app.use('/cart', cartRouter)
    app.use('/foods', foodsRouter)
    app.use('/login', loginRouter)
    app.use('/orders', ordersRouter)
    app.use('/payment', paymentRouter)
}

module.exports = route
