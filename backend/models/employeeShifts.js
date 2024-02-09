const mongoose = require("mongoose");
const schema = mongoose.Schema;

const employeeShiftsSchema = new schema(
  {
    employeeId: {
      type: String,
      required: true,
    },
    shifts: {
      type: [String],
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

const EmployeeShifts = mongoose.model("employeeShifts", employeeShiftsSchema);
module.exports = EmployeeShifts;
