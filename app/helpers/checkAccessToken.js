const axios = require('@/services/axios')

/**
 * Check Bearer token by calling external authorization server
 * @param {string} accessToken 
 * @returns username
 */
const checkAccessToken = async (accessToken) => {
    const response = await axios.get('/oauth/profile', { headers: {
        Authorization: `Bearer ${accessToken}`,
    }})

    return response.data.username
}

module.exports = checkAccessToken