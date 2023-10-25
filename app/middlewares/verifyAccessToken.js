const jwt = require('jsonwebtoken');
const { jwtSecret } = require('@root/config');
const { failure } = require('@/responses');
// const checkAccessToken = require('../helpers/checkAccessToken')

const verifyAccessToken = async (req, res, next) => {
  const authorization = req.header('Authorization');
  if (!authorization) {
    return res.status(401).send(failure({ errcode: '-7' }));
  }

  const [type, accessToken] = authorization.split(' ');
  if (type === 'Bearer') {
    try {
      const decoded = jwt.verify(accessToken, jwtSecret);
      // const decoded = await checkAccessToken(accessToken)

      if (decoded.username) {
        req.username = decoded.username;
        next();
      } else throw new Error('verifyAccessToken failed');
    } catch (error) {
      console.error(error.toString());
      return res.status(403).send(failure({ errcode: '-8' }));
    }
  } else {
    return res.status(401).send(failure({ errcode: '-9' }));
  }
};

module.exports = verifyAccessToken;
