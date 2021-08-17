// Create a class that Extends the Error Class
class ErrorResponse extends Error {
    // method that runs when an object is being created from the class
    // we will pass in message and status code
    constructor(message, statusCode) {
        // error class has access to message in it's constructor, so call super on that
        // instead of `this.message = message`
        super(message);

        // create a custom class property called `statusCode`
        // which is whatever param was passed in
        this.statusCode = statusCode;
    }
}

module.exports = ErrorResponse;