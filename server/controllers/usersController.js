const Users  =require('../schemas/userSchema')

const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const validator = require("validator");

const jwt_secret = process.env.JWT_SECRET;
const salt = process.env.SALT;

const register = async (req, res, next) => {
    const { password, password2, email, login } = req.body;
    try {
      if (!password || !password2 || !email || !login) {
        res.status(400);
        throw new Error("All fields required!!");
      }
      if (password.length < 8) {
        res.status(400);
        throw new Error("Password need to have at least 8 characters!!");
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
      const hash = await argon2.hash(password, salt);
      let createdUser = await Users.create({
          login,
          email,
          password:hash
        });
      if (createdUser) {
        next();
      } else {
        res.status(400);
        throw new Error("Invalid user data");
      }
    } catch (error) {
      next(error)
    }
   
  }
  
  const login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
      let userExist = await Users.findOne({ email });
      if (!userExist) {
        res.status(401);
        throw new Error("Invalid credentials. User doesn't exist");
      } else {
        const match = await argon2.verify(userExist.password, password);
        if (match) {
          const token = jwt.sign({ _id: userExist._id, email: userExist.email }, jwt_secret, {
            expiresIn: 60,
          });
          res.status(200).json({
            token,
          });
        } else {
          res.status(400);
          throw new Error("Password incorrect!");
        }
      }
    } catch (error) {
      next(error)
    }
  }

  const getCurrentUserData = async (req,res,next) => {
    try {
      let found = await Users.findById(req._id).select("-password")
      res.status(200).send(found);
    } catch (error) {
      next(error)
    }
  }


  module.exports = {
    register,
    login,
    getCurrentUserData
  };