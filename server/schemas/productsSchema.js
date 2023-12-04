const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Please add products name"] },
    price : { type: String, required: [true, "Please add products price"] },
    user_id: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "user",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("products", productSchema);