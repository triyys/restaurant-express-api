const { Model } = require("mongoose")

/**
 * An RESTful API action to handle GET resources by id method
 * @param {Model} model Mongoose model
 * @returns A callback function
 */
const getMongoDocById = (model) => (req, res, next) => {
    model.findById(req.params.id)
        .then((doc) => {
            return res.status(200).send(doc)
        })
        .catch(next)
}

module.exports = getMongoDocById