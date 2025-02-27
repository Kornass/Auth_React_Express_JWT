const jwt = require("jsonwebtoken");

const verify_token = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    res.status(401);
    throw new Error("Not authorized!! - No token!!");
  }
  jwt.verify(token, process.env.JWT_SECRET_ACCESS, (err, user) => {
    if (err) {
      res.status(403);
      throw new Error("Not authorized!! - Token not validated!!");
    } else {
      // if successfully verified - user data in verified parameter
      req._id = user._id;
      req.token = token;
      next();
    }
  });
};

module.exports = {
  verify_token,
};
