const Users = require("../schemas/userSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validator = require("validator");

const jwt_secret = process.env.JWT_SECRET;

const register = async (req, res, next) => {
  const { password, password2, email, login } = req.body;
  try {
    if (!password || !password2 || !email || !login) {
      res.status(400);
      throw new Error("All fields required!!");
    }
    const specialCharacters = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (!password.match(/[A-Z]/g) || !specialCharacters.test(password)) {
      res.status(400);
      throw new Error(
        "Password need to contain at least 1 uppercase letter and 1 special character !!"
      );
    }
    if (password !== password2) {
      res.status(400);
      throw new Error("Passwords must match!!");
    }
    if (!validator.isEmail(email)) {
      res.status(400);
      throw new Error("Incorrect email!!");
    }
    let userExist = await Users.findOne({ email });
    if (userExist) {
      res.status(400);
      throw new Error("User with this email adress already exist!!");
    }
    const salted = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salted);
    let createdUser = await Users.create({
      login,
      email,
      password: hash,
    });
    if (createdUser) {
      next();
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    let userExist = await Users.findOne({ email });
    if (!userExist) {
      res.status(401);
      throw new Error("Invalid credentials. User doesn't exist");
    } else {
      const match = bcrypt.compareSync(password, userExist.password);
      if (match) {
        const token = jwt.sign(
          { _id: userExist._id, email: userExist.email },
          jwt_secret,
          {
            expiresIn: 90,
          }
        );
        res.status(200).json({
          token,
          email,
        });
      } else {
        res.status(400);
        throw new Error("Password incorrect!");
      }
    }
  } catch (error) {
    next(error);
  }
};

const getCurrentUserData = async (req, res, next) => {
  try {
    let found = await Users.findById(req._id).select("-password");
    res.status(200).send(found);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  register,
  login,
  getCurrentUserData,
};
