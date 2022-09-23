const ModelClient = require('../domain/ModelClient');
const { PostgresAdapter } = require('./postgres');

const modelClient = new ModelClient(new PostgresAdapter())

module.exports = modelClient