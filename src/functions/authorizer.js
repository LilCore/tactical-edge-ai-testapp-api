const jwt = require('jsonwebtoken');

const AUTH_SECRET_KEY = process.env.AUTH_SECRET_KEY;

module.exports.handler = async (event, context, callback) => {
  try {
    // Extract the Authorization header
    // console.log(event.headers);
    const tokenBearer = event.headers?.authorization;
    const token = tokenBearer?.replace('Bearer ', '');
    console.log({ token });

    if (!token) {
      throw new Error('Authorization token required');
    }

    const decoded = jwt.verify(token, AUTH_SECRET_KEY);
    console.log({ decoded });

    return {
      isAuthorized: true,
      context: {
        success: true,
        message: 'User Authorized',
      },
    };
  } catch (error) {
    console.log('Error in authorizer:', error.message);
    return {
      isAuthorized: false,
      context: {
        success: false,
        message: error.message,
      },
    };
  }
};
