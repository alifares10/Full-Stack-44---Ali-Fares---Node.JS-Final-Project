const mongoose = require("mongoose");

require("dotenv").config();

const URL = process.env.MongoDB_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(URL);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed");
    console.error(error);
    process.exit(1);
  }
};

module.exports = connectDB;
