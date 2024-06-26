const jwt = require("jsonwebtoken");
const { JWT_SECRET_ACCESS, JWT_SECRET_REFRESH } = process.env;

const generateAccessToken = (data) => {
  return jwt.sign({ ...data }, JWT_SECRET_ACCESS, {
    expiresIn: 90,
  });
};

const generateRefreshToken = (data) => {
  return jwt.sign({ ...data }, JWT_SECRET_REFRESH, {
    expiresIn: "1d",
  });
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
};
