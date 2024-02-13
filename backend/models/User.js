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
      default: 10,
    },
  },
  {
    versionKey: false,
  }
);

const User = mongoose.model("user", userSchema, "users");
module.exports = User;
