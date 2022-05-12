const bannerRouter = require('./banner');
const cartRouter = require('./cart');
const foodRouter = require('./food');
const loginRouter = require('./login');
const optionsRouter = require('./option');
const orderRouter = require('./order');
const paymentRouter = require('./payment');

function route(app) {
    app.use('/banner', bannerRouter);
    app.use('/cart', cartRouter);
    app.use('/food', foodRouter);
    app.use('/login', loginRouter);
    app.use('/options', optionsRouter);
    app.use('/order', orderRouter);
    app.use('/payment', paymentRouter);
}

module.exports = route;
