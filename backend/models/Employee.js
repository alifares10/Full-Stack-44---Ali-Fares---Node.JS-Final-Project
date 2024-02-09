const mongoose = require("mongoose");
const schema = mongoose.Schema;

const employeeSchema = new schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    startWorkYear: {
      type: Number,
      required: true,
    },
    departmentID: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

const Employee = mongoose.model("employee", employeeSchema, "employees");
module.exports = Employee;
