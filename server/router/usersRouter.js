const express = require("express");
const router = express.Router();
const {
  register,
  login,
getCurrentUserData
} = require("../controllers/usersController");

const { verify_token } = require("../middlewares/authMiddleware");

// After register is successfully done, login user automatically (chaining middlewares)
router.post("/register", register, login);
router.post("/login", login);

// Protected route - verify user's token before fetching this user data
router.get("/currentUser", verify_token, getCurrentUserData);


module.exports = router;