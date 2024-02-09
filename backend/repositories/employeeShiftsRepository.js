const EmployeeShifts = require("../models/employeeShifts");

const getAllEmployeeShifts = async (filters) => {
  return await EmployeeShifts.find(filters);
};

const getEmployeeShiftsBuyId = async (id) => {
  return await EmployeeShifts.findById(id);
};

const createEmployeeShifts = async (employeeShifts) => {
  return await EmployeeShifts.create(employeeShifts);
};

const updateEmployeeShifts = async (id, employeeShifts) => {
  return await EmployeeShifts.findByIdAndUpdate(id, employeeShifts);
};

const deleteEmployeeShifts = async (id) => {
  return await EmployeeShifts.findByIdAndDelete(id);
};

module.exports = {
  getAllEmployeeShifts,
  getEmployeeShiftsBuyId,
  createEmployeeShifts,
  updateEmployeeShifts,
  deleteEmployeeShifts,
};
