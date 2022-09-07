const datastores = require('./datastores')
const env = require('./env')
const security = require('./security')

module.exports = {
    ...datastores,
    ...env,
    ...security,
}