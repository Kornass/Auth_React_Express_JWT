const Users = require("../schemas/userSchema");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/generateToken");
const { jwtVerify } = require("../utils/asyncJWTVerify");

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
      refreshToken: "",
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
        const tokenData = {
          _id: userExist._id,
          email: userExist.email,
        };
        const accessToken = generateAccessToken(tokenData);
        const refreshToken = generateRefreshToken(tokenData);
        userExist.refreshToken = refreshToken;
        await userExist.save();
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: false,
          sameSite: "Strict",
          maxAge: 86400000, // 1 day
        });
        res.status(200).json({
          accessToken,
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
    next(error);
  }
};

const refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;
    const { id: _id } = req.params;

    if (!refreshToken) {
      res.status(401);
      throw new Error("Not authorized!! - No refresh token !!");
    }
    // validate refresh token
    const user = await jwtVerify(refreshToken, process.env.JWT_SECRET_REFRESH);

    const foundUser = await Users.findById(user._id);
    if (!foundUser) {
      res
        .status(403)
        .send("Not authorized!! - No user with this ID from refresh token!!");
    }

    if (user._id !== _id) {
      res
        .status(403)
        .send(
          "Not authorized!! - This token doesn't belong to the user that sent a request !"
        );
    }

    if (foundUser.refreshToken !== refreshToken) {
      res.status(403).send("Not authorized!! - Invalid refresh token !!");
    } else {
      const tokenData = {
        _id: foundUser._id,
        email: foundUser.email,
      };

      const newAccessToken = generateAccessToken(tokenData);
      const newRefreshToken = generateRefreshToken(tokenData);

      foundUser.refreshToken = newRefreshToken;
      await foundUser.save();
      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "Strict",
        maxAge: 86400000, // 1 day
      });
      res.status(200).json({
        _id: foundUser._id,
        accessToken: newAccessToken,
        email: foundUser.email,
      });
    }
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    const deleteToken = await Users.findByIdAndUpdate(
      { _id: req._id },
      { refreshToken: "" }
    );
    if (deleteToken) {
      res.cookie("refreshToken", "", {
        expires: new Date(0),
        httpOnly: true,
        secure: false,
        sameSite: "Strict",
      });
      res.status(200).json({ ok: true });
    } else {
      res
        .status(403)
        .send("Something went wrong when reseting refresh token!!");
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  getCurrentUserData,
  refreshToken,
  logout,
};
