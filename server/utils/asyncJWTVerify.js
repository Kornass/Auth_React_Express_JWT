const jwt = require("jsonwebtoken");

async function jwtVerify(token, secret) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) return reject(err);
      console.log("DECODED", decoded);
      resolve(decoded);
    });
  });
}

module.exports = {
  jwtVerify,
};
