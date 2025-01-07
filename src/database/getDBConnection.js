const mongoose = require('mongoose');

let conn = null;

const URI = process.env.DB_URI;

// const MONGOOSE_CONFIG = {
//   bufferCommands: true,
//   socketTimeoutMS: 65000,
//   serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   family: 4, // 4 (IPv4) or 6 (IPv6)
// };

exports.connect = async function () {
  if (conn == null) {
    console.log('CONNECTING TO ', URI);
    conn = await mongoose.connect(URI);
    // conn = mongoose
    //   .connect(URI, {
    //     serverSelectionTimeoutMS: 5000,
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   })
    //   .then(() => mongoose);

    // `await`ing connection after assigning to the `conn` variable
    // to avoid multiple function calls creating new connections
    console.log('Connected to DB');
    // await conn;
  }

  return conn;
};
