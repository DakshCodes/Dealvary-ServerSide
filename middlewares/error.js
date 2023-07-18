module.exports.errorhandler = (res, statusCode = 500, message = "Internal Server Error") => {
  return res.status(statusCode).json({
    success: false,
    message,
  });
};

module.exports.asyncError = (passedFunc) => (req, res) => {
  return Promise.resolve(passedFunc(req, res)).catch((err) => {
    res.status(502).json({
      success: false,
      message:"Async error"
    });
  });
}