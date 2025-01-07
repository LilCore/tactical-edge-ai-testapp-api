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
    console.log(params);
    console.log({ email });
    const user = await User.findOne({ email });
    console.log(user);

    if (!user) throw new Error('User not found');

    console.log(user.password);

    const passwordIsValid = await bcrypt.compare(password, user.password);

    console.log({ passwordIsValid });

    if (!passwordIsValid) throw new Error('Invalid password');

    console.log({ eee: AUTH_SECRET_KEY });

    const token = signJwt({ email });
    console.log({ token });

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
