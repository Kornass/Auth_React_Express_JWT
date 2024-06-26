const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to the DB");
  } catch (error) {
    console.log(`ERROR: Your DB is not connected. Error: ${error.message}`);
  }
};

module.exports = connectDB;