const employeeShiftsRepo = require("../repositories/employeeShiftsRepository");
const employeeRepo = require("../repositories/employeeRepository");
const shiftRepo = require("../repositories/shiftRepository");

const getAllEmployeeShifts = async (filters) => {
  try {
    const employeeShifts = await employeeShiftsRepo.getAllEmployeeShifts(
      filters
    );
    return employeeShifts;
  } catch (error) {
    throw new Error(error);
  }
};

const getEmployeeShiftsById = async (id) => {
  try {
    const employeeShifts = await employeeShiftsRepo.getEmployeeShiftsBuyId(id);
    return employeeShifts;
  } catch (error) {
    throw new Error(error);
  }
};

// const createEmployeeShifts = async (employeeShifts) => {
//   //check if employee exists
//   const employee = await employeeRepo.getEmployeeById(
//     employeeShifts.employeeId
//   );
//   if (!employee) {
//     throw new Error("Employee does not exist in the employee database");
//   }
//   try {
//     const newEmployeeShifts = await employeeShiftsRepo.createEmployeeShifts(
//       employeeShifts
//     );
//     return newEmployeeShifts;
//   } catch (error) {
//     throw new Error(error);
//   }
// };

const updateEmployeeShifts = async (id, info) => {
  try {
    //check if employee exists
    const employee = await employeeRepo.getEmployeeById(id);
    if (!employee) {
      throw new Error("Employee does not exist in the employee database");
    }
    //check if shifts exists
    const shift = await shiftRepo.getShiftById(info.shiftId);
    if (!shift) {
      throw new Error("Shift does not exist in the shift database");
    }
    const existingEmployeeShifts =
      await employeeShiftsRepo.getAllEmployeeShifts({ employeeId: id });
    existingEmployeeShifts[0].shifts.push(info.shiftId);
    const newEmployeeShifts = existingEmployeeShifts[0];
    const updatedEmployeeShifts = await employeeShiftsRepo.updateEmployeeShifts(
      newEmployeeShifts._id,
      newEmployeeShifts
    );
    return updatedEmployeeShifts;
  } catch (error) {
    throw new Error(error);
  }
};

const deleteEmployeeShifts = async (id) => {
  try {
    const deletedEmployeeShifts = await employeeShiftsRepo.deleteEmployeeShifts(
      id
    );
    return deletedEmployeeShifts;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  getAllEmployeeShifts,
  getEmployeeShiftsById,
  updateEmployeeShifts,
  deleteEmployeeShifts,
  // createEmployeeShifts,
};
