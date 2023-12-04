const jwt = require("jsonwebtoken");

const verify_token = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    res.status(401);
    throw new Error("Not authorized!!");
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, verified) => {
    if (err) {
      res.status(401);
      throw new Error("Not authorized!!");
    } else {
      req._id = verified._id;
      req.token = token;
      next();
    }
  });
};

module.exports = {
  verify_token,
};