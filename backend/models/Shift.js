const mongoose = require("mongoose");
const schema = mongoose.Schema;

const shiftSchema = new schema(
  {
    date: {
      type: Date,
      default: Date.now,
      required: true,
    },
    startingHour: {
      type: Number,
      required: true,
    },
    endingHour: {
      type: Number,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

const Shift = mongoose.model("shift", shiftSchema, "shifts");
module.exports = Shift;
