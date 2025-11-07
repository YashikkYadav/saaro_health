const apiResponse = require("../utils/apiResponse.utils");

const validate = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
   
    return apiResponse.error(res, error.message, 400);
  }
};

module.exports = { validate };