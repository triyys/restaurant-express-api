const success = (data = {}) => {
    return {
        status: 's',
        message: 'ok',
        ...data,
    }
}

module.exports = success