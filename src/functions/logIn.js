const { connect } = require('../database/getDBConnection');
const User = require('../models/user');
const signJwt = require('../utils/signJwt');
const bcrypt = require('bcryptjs');

const AUTH_SECRET_KEY = process.env.AUTH_SECRET_KEY;

module.exports.handler = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    await connect();
    const { email, password } = JSON.parse(event.body);
    let params = {
      email,
      password,
    };
    const user = await User.findOne({ email });

    if (!user) throw new Error('User not found');

    const passwordIsValid = await bcrypt.compare(password, user.password);

    console.log({ passwordIsValid });

    if (!passwordIsValid) throw new Error('Invalid password');

    const token = signJwt({ email });

    return {
      statusCode: 201,
      body: JSON.stringify({
        success: true,
        message: 'User logged',
        data: {
          user,
          token,
        },
      }),
    };
  } catch (err) {
    console.error(err);
    return {
      // statusCode: err.statusCode || 500,
      statusCode: 201,
      body: JSON.stringify({
        success: false,
        message: err.message,
      }),
    };
  }
};
