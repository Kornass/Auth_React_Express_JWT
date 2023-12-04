const express = require("express");
const router = express.Router();
const {
  register,
  login,

} = require("../controllers/usersController");

const { verify_token } = require("../middlewares/authMiddleware");

router.post("/register", register, login);
router.post("/login", login);

// router.get("/currentUser", verify_token, getCurrentUserData);
// router.post("/update", verify_token, updateUser);
// router.post("/delete", verify_token,  deleteUser);

module.exports = router;