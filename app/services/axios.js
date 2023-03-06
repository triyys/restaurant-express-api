const axios = require('axios')
const { oauth2Url } = require('@root/config')

const instance = axios.default.create({
    baseURL: oauth2Url,
    withCredentials: true,
})

instance.interceptors.request.use((request) => {
    console.log(`External API call: [${request.method.toUpperCase()}] ${request.baseURL}${request.url}`)
    console.log(request.data)

    return request
}, (error) => {
    return Promise.reject(error)
})

module.exports = instance