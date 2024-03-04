const shiftRepo = require("../repositories/shiftRepository");
const employeeRepo = require("../repositories/employeeRepository");
const employeeShiftsRepo = require("../repositories/employeeShiftsRepository");

const getAllShifts = async (filters) => {
  try {
    const shifts = await shiftRepo.getAllShifts(filters);
    return shifts;
  } catch (error) {
    throw new Error(error);
  }
};

const getShiftById = async (id) => {
  try {
    const shift = await shiftRepo.getShiftById(id);
    return shift;
  } catch (error) {
    throw new Error(error);
  }
};

const createShift = async (shift) => {
  try {
    const newShift = await shiftRepo.createShift(shift);
    return newShift;
  } catch (error) {
    throw new Error(error);
  }
};

const updateShift = async (id, shift) => {
  try {
    const updatedShift = await shiftRepo.updateShift(id, shift);
    return updatedShift;
  } catch (error) {
    throw new Error(error);
  }
};

const getShiftEmployees = async (id) => {
  try {
    const shift = await shiftRepo.getShiftById(id);
    const employeesShifts = await employeeShiftsRepo.getAllEmployeeShifts();
    const employees = employeesShifts.filter((employee) =>
      employee.shifts.includes(id)
    );
    return employees;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  getAllShifts,
  getShiftById,
  createShift,
  updateShift,
  getShiftEmployees,
};
