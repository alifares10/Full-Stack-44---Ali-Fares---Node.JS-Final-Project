const mongoose = require("mongoose");
const schema = mongoose.Schema;

const departmentSchema = new schema(
  {
    name: {
      type: String,
      required: true,
    },
    manager: {
      type: String,
      required: true,
      default: "Unassigned",
    },
  },
  {
    versionKey: false,
  }
);

const Department = mongoose.model(
  "department",
  departmentSchema,
  "departments"
);
module.exports = Department;
