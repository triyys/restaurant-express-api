const order = require('./order')
const status = require('./status')
const topFood = require('./topFood')

module.exports = {
    ...order,
    ...status,
    ...topFood,
}