const { Schema, SchemaTypes, connect: connectMongo, model } = require('mongoose')
const { mongodb: mongodbConfig } = require('@root/config')

const connect = async () => {
    try {
        await connectMongo(mongodbConfig.url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log('MongoDB is connected successfully')
    } catch (error) {
        console.log('Cannot connect to MongoDB')
        console.log(error)
    }
}

const typeMap = {
    '_id': SchemaTypes.ObjectId,
    'string': SchemaTypes.String,
    'number': SchemaTypes.Number,
    'boolean': SchemaTypes.Boolean,
    'array': SchemaTypes.Array,
    'ref': SchemaTypes.Mixed,
    '[_id]': [SchemaTypes.ObjectId],
    '[string]': [SchemaTypes.String],
    '[ref]': [SchemaTypes.Mixed],
}

class MongoAdapter {
    getModel(config) {
        const { modelName, attributes, options } = config

        for (const [key, value] of Object.entries(attributes)) {
            if (typeof value === 'object' && value != null) {
                if (typeof value['type'] === 'string') {
                    config.attributes[key]['type'] = typeMap[value['type']]
                }
            } else {
                if (typeof value === 'string') {
                    config.attributes[key] = typeMap[value]
                }
            }
        }

        return model(modelName, new Schema(attributes, options))
    }
}

module.exports = {
    MongoAdapter,
    connect,
}