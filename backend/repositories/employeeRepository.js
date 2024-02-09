const Employee = require("../models/Employee");

const getAllEmployees = async (filters) => {
  return await Employee.find(filters);
};

const getEmployeeById = async (id) => {
  return await Employee.findById(id);
};

const createEmployee = async (employee) => {
  const newEmployee = new Employee(employee);
  await newEmployee.save();
  return newEmployee;
};

const updateEmployee = async (id, employee) => {
  return await Employee.findByIdAndUpdate(id, employee);
};

const deleteEmployee = async (id) => {
  return await Employee.findByIdAndDelete(id);
};

module.exports = {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
