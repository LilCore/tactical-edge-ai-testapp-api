const { connect } = require('../database/getDBConnection');
const Movie = require('../models/movie');

module.exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    await connect();
    const { id } = JSON.parse(event.body);
    const movie = await Movie.findOne({ _id: id });

    if (movie) {
      return {
        statusCode: 200,
        body: JSON.stringify({
          success: true,
          message: 'Successfully retrieved',
          data: movie,
        }),
      };
    } else {
      return {
        statusCode: 404,
        body: JSON.stringify({
          success: true,
          message: 'Requested movie not present',
        }),
      };
    }
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
