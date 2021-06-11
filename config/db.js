const mongoose = require('mongoose');

// mongoose.connect() returns a promise
// so we must use .then or async await

// first .connect param is the URI
// that mongoDB atlas provides to you when clicking "connect"
// this data is sensitive, so we will store it in an environment variable
// note, you can name your database in this string

// second .connect param is an object that can silence some console warnings by using some non-default updates
// if connection fails, instead of using a try / catch block...
// we will create an "unhandled rejections" handler in the server.js that kills the app
// if anything fails unexpectedly
const connectDB = async () => {
    const conn = await mongoose.connect(process.env.MONGO_URI, { 
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
     });

    console.log(`Mongo DB connected: ${conn.connection.host}`.cyan.underline.bold)
};

module.exports = connectDB;