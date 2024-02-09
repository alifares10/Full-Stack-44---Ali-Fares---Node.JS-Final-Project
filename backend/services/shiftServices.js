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
    //update shift
    const updatedShift = await shiftRepo.updateShift(id, shift);
    return updatedShift;
  } catch (error) {
    throw new Error(error);
  }
};

const getShiftEmployees = async (id) => {
  try {
    const shift = await shiftRepo.getShiftById(id);
    const employees = await employeeRepo.getAllEmployees({
      _id: { $in: shift.employees },
    });
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
