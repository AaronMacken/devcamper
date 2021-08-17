const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const errorHandler = require('./middleware/error');

const connectDB = require('./config/db');

const PORT = process.env.PORT || 5000;
const app = express();

// Body parser (middleware) - access req.body from our requests
app.use(express.json());

// load env vars
dotenv.config({ path: './config/config.env' });

// connect to DB
connectDB();

// Route files
const bootcamps = require('./routes/bootcamps');

// Middleware
// const logger = require('./middleware/logger');
const morgan = require('morgan');

// // tell the app to use our logger middleware in all of our routes
// app.use(logger);
// Dev logging middleware
if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// route controller methods
// tell the app to use the the `routes/bootcamps` code whenever this URL is seen
app.use('/api/v1/bootcamps', bootcamps);

// use custom error handler
// has to come AFTER your route controller methods ^
// or else the app will try to run the error handling logic
// before it knows that the route controller methods are calling `next` & passing in an `error`
app.use(errorHandler);

const server = app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`.yellow.bold));

// Handle unhandled promise rejections - kill the app if this happens
// listen for 'unhandledRejection'
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red.bold);

    // close server and exit process
    // .exit(1) = exit with a "failure"
    server.close(() => { process.exit(1);});
});