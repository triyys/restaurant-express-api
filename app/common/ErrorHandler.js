const getErrorDictionary = require("../helpers/getErrorDictionary")

let errorDict = {}

module.exports = {
    getErrorMessageByCode(code, lang) {
        const language = lang || 'vi'
        const errorMessage = errorDict[language][code] || errorDict[language]['-1'] || 'Internal error'
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