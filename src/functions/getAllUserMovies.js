const { connect } = require('../database/getDBConnection');
const Movie = require('../models/movie');

module.exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    await connect();
    const { userId } = JSON.parse(event.body);

    const movie = await Movie.find({ userId });

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: 'Successfully retrieved all movies',
        data: movie,
      }),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: err.statusCode || 500,
      body: JSON.stringify({
        success: false,
        message: err.message,
      }),
    };
  }
};
