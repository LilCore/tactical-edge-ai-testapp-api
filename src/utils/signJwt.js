const jwt = require('jsonwebtoken');

const JWT_EXPIRES_IN = '1h';

function signJwt(payload) {
  return jwt.sign(payload, process.env.AUTH_SECRET_KEY, {
    expiresIn: JWT_EXPIRES_IN,
  });
}

module.exports = signJwt;
