const { connect } = require('../database/getDBConnection');
const signJwt = require('../utils/signJwt');
const User = require('../models/user');

module.exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    await connect();
    const { email, password, name } = JSON.parse(event.body);
    let params = {
      email,
      name,
      password,
    };
    console.log(params);
    const createdUser = await User.create(params);
    console.log(createdUser);

    const token = signJwt({ email });
    console.log({ token });

    return {
      statusCode: 201,
      body: JSON.stringify({
        success: true,
        message: 'User registered successfully',
        data: {
          user: createdUser,
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
        message: err.message.includes('duplicate key')
          ? 'User already exists'
          : err.message,
      }),
    };
  }
};
