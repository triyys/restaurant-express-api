const { Model } = require('mongoose');

/**
 * An RESTful API action to handle GET all resources method
 * @param {Model} model Mongoose model
 * @returns A callback function
 */
const getMongoCollection = (model) => (req, res, next) => {
  return model
    .find()
    .then((collection) => {
      return res.status(200).send(collection);
    })
    .catch(next);
};

module.exports = getMongoCollection;
