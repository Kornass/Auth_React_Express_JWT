const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    res.status(statusCode);
   
    res.json({
      error: true,
      message: err.message,
      //don not throw in production
      stack: process.env.NODE_ENV === "production" ? null : err.stack,
    });
  };
  
  module.exports = {
    errorHandler,
  };