export const ErrorHandler = (err, req, res, next) => {
    console.error(err.stack);
    const status = err.status || 501;
    const message = "Internal Server Error";
    const error = err.message || "An unxpected error occured";
    return res.error(message, error, status)
};