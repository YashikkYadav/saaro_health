const apiResponse = require("../utils/apiResponse.utils");

const validate = (schema) => (req, res, next) => {
  try {
    const parsedData = schema.parse(req.body);
    // Replace req.body with the parsed data
    req.body = parsedData;
    next();
  } catch (error) {
    if (error.errors) {
      // Extract and format error messages
      const errorMessages = error.errors.map(err => {
        // Handle nested path errors
        const path = err.path ? err.path.join('.') : 'unknown';
        return `${path}: ${err.message || 'Validation failed'}`;
      }).join(', ');
      return apiResponse.error(res, errorMessages, 400);
    }
    return apiResponse.error(res, error.message || 'Validation failed', 400);
  }
};

module.exports = { validate };