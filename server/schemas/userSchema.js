const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  login: { type: String, required: [true, "Please add your login"] },
  email: {
    type: String,
    required: [true, "Please add your email"],
    unique: true,
  },
  password: { type: String, required: true },
  location:{ type: String },
  gender:{ type: String },

});

module.exports = mongoose.model("users", userSchema);