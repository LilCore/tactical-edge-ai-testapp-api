module.exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  console.log('leyendo');
  console.log(process.env.DB_URI);

  return {
    statusCode: 201,
    body: JSON.stringify('TEST SUCCESS'),
  };
};
