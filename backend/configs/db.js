const mongoose = require("mongoose");

const URL = "mongodb://127.0.0.1/factoryDB";

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
