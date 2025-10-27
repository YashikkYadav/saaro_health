const apiResponse = {
  success(res, message = "Success", data = {}, statusCode = 200) {
    return res.status(statusCode).json({
      success: true,
      message,
      data
    });
  },

  error(res, message = "Something went wrong", statusCode = 500, errors = null) {
    return res.status(statusCode).json({
      success: false,
      message,
      errors
    });
  }
};

module.exports = apiResponse;