const departmentRepo = require("../repositories/departmentRepository");
const employeeRepo = require("../repositories/employeeRepository");
const employeeService = require("../services/employeeServices");

const getAllDepartments = async (filters) => {
  try {
    const departments = await departmentRepo.getAllDepartments(filters);
    return departments;
  } catch (error) {
    throw new Error(error);
  }
};

const getDepartmentById = async (id) => {
  try {
    const department = await departmentRepo.getDepartmentById(id);
    return department;
  } catch (error) {
    throw new Error(error);
  }
};

const createDepartment = async (department) => {
  try {
    // Check if department already exists
    const departmentExists = await departmentRepo.getAllDepartments({
      name: department.name,
    });
    if (departmentExists.length > 0) {
      throw new Error("Department already exists");
    }

    // Create department
    const newDepartment = await departmentRepo.createDepartment(department);
    return newDepartment;
  } catch (error) {
    throw new Error(error);
  }
};

const updateDepartment = async (id, department) => {
  try {
    const updatedDepartment = await departmentRepo.updateDepartment(
      id,
      department
    );
    return updatedDepartment;
  } catch (error) {
    throw new Error(error);
  }
};

const deleteDepartment = async (id) => {
  try {
    const department = await departmentRepo.getDepartmentById(id);

    // check if department has employees
    const employees = await employeeRepo.getAllEmployees({ departmentID: id });
    if (employees.length > 0) {
      //delete the employees
      employees.forEach(async (employee) => {
        await employeeService.deleteEmployee(employee._id);
      });
    }

    //delete department
    const deletedDepartment = await departmentRepo.deleteDepartment(id);
    return deletedDepartment;
  } catch (error) {
    throw new Error(error);
  }
};

//assign department manager
const assignDepartmentManager = async (departmentID, employeeID) => {
  try {
    //check if department exists
    const department = await departmentRepo.getDepartmentById(departmentID);
    if (!department) {
      throw new Error("Department not found");
    }

    //check if employee exists
    const employee = await employeeRepo.getEmployeeById(employeeID);
    if (!employee) {
      throw new Error("Employee not found");
    }

    //check if employee works in this department
    if (employee.departmentID !== departmentID) {
      throw new Error("Employee does not work in this department");
    }

    //update department manager
    const updatedDepartment = await departmentRepo.updateDepartment(
      departmentID,
      {
        manager: employeeID,
      }
    );
    return updatedDepartment;
  } catch (error) {
    throw new Error(error);
  }
};

//get the department manager's info
const getDepartmentManagerInfo = async (id) => {
  try {
    const department = await departmentRepo.getDepartmentById(id);
    const manager = await employeeRepo.getEmployeeById(department.manager);
    return manager;
  } catch (error) {
    throw new Error(error);
  }
};

//get all employees in a department
const getDepartmentEmployees = async (id) => {
  try {
    const employees = await employeeRepo.getAllEmployees({ departmentID: id });
    return employees;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  getAllDepartments,
  getDepartmentById,
  createDepartment,
  updateDepartment,
  deleteDepartment,
  getDepartmentManagerInfo,
  getDepartmentEmployees,
  assignDepartmentManager,
};
