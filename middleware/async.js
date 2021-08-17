// function that takes an `async func` as a parameter
// then it returns another function that uses `req, res, next` as parameters
// which will then call `Promise.resolve` (wait for an async function to finish)
// to call the original `async func` with the `req,res,next` params, or run the `.catch` block

// const asyncHandler = fn => (req, res, next) => 
// Promise.resolve(fn(req, res, next)).catch(next);

const asyncHandler = wrappedFunction => {
    return (req, res, next) => {
        return Promise.resolve(wrappedFunction(req, res, next)).catch(next);
    }
}

module.exports = asyncHandler;