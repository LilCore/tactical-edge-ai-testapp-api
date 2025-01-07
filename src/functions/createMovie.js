const { connect } = require('../database/getDBConnection');
const Movie = require('../models/movie');

module.exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    await connect();
    const { title, publishingYear, poster, userId } = JSON.parse(event.body);
    const params = {
      title,
      publishingYear,
      poster,
      userId,
    };
    console.log(params);
    const createdMovie = await Movie.create(params);
    console.log(createdMovie);
    return {
      statusCode: 201,
      body: JSON.stringify({
        success: true,
        message: 'Movie created successfully',
        data: {
          movie: createdMovie,
        },
      }),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 201,
      body: JSON.stringify({
        success: false,
        message: err.message.includes('duplicate key')
          ? 'Movie already exists'
          : err.message,
      }),
    };
  }
};
