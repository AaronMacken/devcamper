const errorHandler = (err, req, res, next) => {
    // Log to console for dev
    // log the `stack` which is data from the error object
    // add `.red` to make it red (capability coming from the colors package)
    console.log(err.stack.red);

    res.status(500).json({
        success: false,
        error: err.message
    });
}

module.exports = errorHandler;

// since this is a middleware, it needs to be run through `app.use` in our `server.js` file
// must come AFTER your app.use('<routes>') statement or else the routes won't use this middleware