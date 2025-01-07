const { connect } = require('../database/getDBConnection');
const Movie = require('../models/movie');

module.exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    await connect();
    const { id, ...params } = JSON.parse(event.body);
    console.log(params);
    const updatedMovie = await Movie.findOneAndUpdate(
      { _id: id },
      params,
      //   {
      //   new: true,
      //   runValidators: true,
      //   context: 'query',
      // }
    );
    console.log(updatedMovie);
    return {
      statusCode: 201,
      body: JSON.stringify({
        statusCode: 200,
        body: JSON.stringify({
          success: true,
          message: 'Successfully updated',
          data: updatedMovie,
        }),
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
