export const ResponseHandler = (req, res, next) => {

    res.success = (message = "Success", data = null, success = true) => {
      return res.status(200).json({
        success,
        message: message,
        data: data
      });
    };
  
    res.error = (message = "Internal Server Error", error, status = 400) => {
      return res.status(status).json({
        success: false,
        message,
        error,
      });
    };
  
    next();
};