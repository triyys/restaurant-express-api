const ModelClient = require('@/domain/ModelClient');
const { MongoAdapter } = require('./mongodb');

const modelClient = new ModelClient(new MongoAdapter());

module.exports = modelClient;
