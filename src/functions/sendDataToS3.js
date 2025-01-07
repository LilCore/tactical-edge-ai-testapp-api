const axios = require('axios');
const AWS = require('aws-sdk');

module.exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    const s3 = new AWS.S3();
    const { file, key } = JSON.parse(event.body);
    const Body = Buffer.from(file, 'base64');

    console.log({ Body });
    // return '';

    const Key = key.replaceAll(' ', '');
    const params = {
      Body,
      Bucket: process.env.FILES_BUCKET,
      Key,
      // ACL: 'public-read'
    };
    console.log({ params });

    const result = await s3
      .putObject(params, function (err, data) {
        if (err) console.log(err, err.stack);
        else console.log('DATA: ', data);
      })
      .promise();

    // s3.upload
    console.log('RESULT: ', result);

    return {
      statusCode: 201,
      body: JSON.stringify({
        success: true,
        message: 'The file has been uploaded',
        data: `https://${process.env.FILES_BUCKET}.s3.amazonaws.com/${Key}`,
      }),
    };
  } catch (error) {
    console.log('sendDataTos3 error catched: ', error);
    return {
      statusCode: 201,
      body: JSON.stringify({
        success: false,
        message: error.message,
      }),
    };
  }
};
