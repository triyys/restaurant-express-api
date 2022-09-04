const ErrorHandler = require("../common/ErrorHandler")

const customResponse = (response, payload = {}, language = 'vi') => {
    if (response instanceof Error) {
        return {
            status: 'e',
            message: ErrorHandler.getErrorMessageByCode(response.message, language),
            ...payload,
        }
    } else {
        return {
            status: 's',
            message: response,
            ...payload,
        }
    }
}

module.exports = customResponse