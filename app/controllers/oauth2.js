const axios = require('@/services/axios')
const { oauth2ClientId, oauth2ClientSecret, clientUrl } = require('@root/config')
const { failure } = require('../responses')

const exchangeCodeForToken = async (req, res, next) => {
    axios.post('/v2/oauth/token', {
        client_id: oauth2ClientId,
        client_secret: oauth2ClientSecret,
        code: req.query.code,
    })
        .then((response) => {
            // return res.redirect(`${clientUrl}/login`)
            return res.status(response.status).send(response.data)
        })
        .catch((error) => {
            return res.status(401).send(failure({ errcode: '-8' }))
        })
}

module.exports = {
    exchangeCodeForToken,
}