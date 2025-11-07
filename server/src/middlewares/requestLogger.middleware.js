const requestLogger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const url = req.url;
  
  // Log the incoming request
  console.log(`[${timestamp}] ${method} ${url}`);
  
  // Capture response data
  // const originalSend = res.send;
  // res.send = function(data) {
  //   // Log response details
  //   const responseTime = Date.now() - req.timestamp;
  //   console.log(`[${new Date().toISOString()}] ${method} ${url} - Status: ${res.statusCode} - Response Time: ${responseTime}ms`);
    
  //   // Call the original send method
  //   originalSend.call(this, data);
  // };
  
  // // Add timestamp to request for calculating response time
  // req.timestamp = Date.now();
  
  next();
};

module.exports = requestLogger;