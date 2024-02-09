const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = new schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    numOfActions: {
      type: Number,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

const User = mongoose.model("user", userSchema, "users");
module.exports = User;
