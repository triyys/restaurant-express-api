class ModelClient {
    #ModelRepository
    constructor(modelRepository) {
        this.#ModelRepository = modelRepository
    }

    createModel(config) {
        return this.#ModelRepository.getModel(config)
    }
}

module.exports = ModelClient