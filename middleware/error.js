const ErrorResponse = require('../utils/errorResponse');

// We call `next(error)` from within our catch blocks
// then check the name of the error and create specific error handling cases here
const errorHandler = (err, req, res, next) => {
    let error = { ...err };
    error.message = err.message;

    // Log to console for dev
    // log the `stack` which is data from the error object
    // add `.red` to make it red (capability coming from the colors package)
    // console.log(err.stack.red);

    console.log(err.name);

    // Mongoose bad ObjectId
    // log the error object and make a conditional statement based off of the values
    if(err.name === 'CastError') {
        const message = `Bootcamp not found with ID of ${err.value}`;
        error = new ErrorResponse(message, 404);
    }

    // Mongoose duplicate key
    if(err.code === 11000) {
        const message = 'Duplicate field value entered';
        // 400 - bad request from client
        error = new ErrorResponse(message, 400);
    }

    // Mongoose validation error
    // (trying to create something but provided bad values)
    if(err.name === 'ValidationError') {
        const message = err.message;

        error = new ErrorResponse(message, 400);
    }

    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || 'Server error'
    });
}

module.exports = errorHandler;

// since this is a middleware, it needs to be run through `app.use` in our `server.js` file
// must come AFTER your app.use('<routes>') statement or else the routes won't use this middleware