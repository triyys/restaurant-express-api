const ErrorDict = require('../models/ErrorDict')

const getErrorDictionary = async () => {
    try {
        const rows = await ErrorDict.findAll()
        // Put all non-primary keys (languages) into an array
        const languages = Object
            .keys(ErrorDict.getAttributes())
            .filter((column) => column !== ErrorDict.primaryKeyAttribute)
        // Each language contains all error messages respectively
        const result = {}
        languages.forEach((language) => {
            result[language] = rows.reduce((prev, curr) => ({
                ...prev,
                [curr.getDataValue(ErrorDict.primaryKeyAttribute)]: curr.getDataValue(language),
            }), {})
        })
        return result
    } catch (error) {
        console.log(error)
        return error
    }
}

module.exports = getErrorDictionary