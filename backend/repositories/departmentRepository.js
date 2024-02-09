const Department = require("../models/Department");

const getAllDepartments = async (filters) => {
  return await Department.find(filters);
};

const getDepartmentById = async (id) => {
  return await Department.findById(id);
};

const createDepartment = async (department) => {
  const newDepartment = new Department(department);
  await newDepartment.save();
  return newDepartment;
};

const updateDepartment = async (id, department) => {
  return await Department.findByIdAndUpdate(id, department);
};

const deleteDepartment = async (id) => {
  return await Department.findByIdAndDelete(id);
};

module.exports = {
  getAllDepartments,
  getDepartmentById,
  createDepartment,
  updateDepartment,
  deleteDepartment,
};
