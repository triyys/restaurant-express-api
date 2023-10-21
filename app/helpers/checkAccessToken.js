const axios = require('@/services/axios')

/**
 * Check Bearer token by calling external authorization server
 * @param {string} accessToken 
 * @returns user payload
 */
const checkAccessToken = async (accessToken) => {
    const response = await axios.get('/oauth/profile', { headers: {
        Authorization: `Bearer ${accessToken}`,
    }})

    return response.data
}

module.exports = checkAccessToken