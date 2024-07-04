const express = require("express");
const router = express.Router();
const {
  register,
  login,
  getCurrentUserData,
  refreshToken,
  logout,
} = require("../controllers/usersController");

const { verify_token } = require("../middlewares/authMiddleware");

// After register is successfully done, login user automatically (chaining middlewares)
router.post("/register", register, login);
router.post("/login", login);
router.post("/refreshToken/:id", refreshToken);

// Protected routes - verify user's token before fetching this user data or logging this user out
router.get("/currentUser", verify_token, getCurrentUserData);
router.post("/logout", verify_token, logout);

module.exports = router;
