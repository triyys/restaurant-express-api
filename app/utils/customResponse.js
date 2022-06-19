const customResponse = (response, payload = {}) => {
    if (response instanceof Error) {
        return {
            status: 'e',
            message: response.message,
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