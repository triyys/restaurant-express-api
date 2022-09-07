const getErrorDictionary = require("../helpers/getErrorDictionary")

let errorDict = {}

module.exports = {
    getErrorMessageByCode(code, lang = 'vi') {
        const errorMessage = errorDict[lang][code] || errorDict[lang]['-1'] || 'Internal error'
        return errorMessage
    },
    async loadErrorDictionary() {
        try {
            errorDict = await getErrorDictionary()
        } catch (error) {
            console.log(error)
        }
    },
}