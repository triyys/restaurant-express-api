const order = require('./order');
const status = require('./status');

module.exports = {
  ...order,
  ...status,
};
