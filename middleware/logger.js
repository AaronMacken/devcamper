// @desc    Logs request to console
const logger = (req, res, next) => {
    console.log(`${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl}`);
    next();
}

// DEMO
// middleware function - they all take these 3 params
const demoLogger = (req, res, next) => {
    // make `.hello` available on the `req` object in all of our routes
    // used to set logged in users if a valid token comes in
    req.hello = 'Hello World';
    console.log('Middleware ran');
    // next tells the app to go onto the next piece of middleware in the cycle
    next();
}

// we will use the third party package `morgan` as a third party logger

module.exports = logger;