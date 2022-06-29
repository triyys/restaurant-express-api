const food = require('./food')
const option = require('./option')
const cart = require('./cart')
const topFood = require('./topFood')

module.exports = {
    ...food,
    ...option,
    ...cart,
    ...topFood,
}