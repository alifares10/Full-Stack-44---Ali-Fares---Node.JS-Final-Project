const employeeRepo = require("../repositories/employeeRepository");
const shiftRepo = require("../repositories/shiftRepository");
const departmentRepo = require("../repositories/departmentRepository");
const employyeShiftsRepo = require("../repositories/employeeShiftsRepository");

//get all employees
const getAllEmployees = async (filters) => {
  try {
    const employees = await employeeRepo.getAllEmployees(filters);
    return employees;
  } catch (error) {
    throw new Error(error);
  }
};

//get employee by id
const getEmployeeById = async (id) => {
  try {
    const employee = await employeeRepo.getEmployeeById(id);
    return employee;
  } catch (error) {
    throw new Error(error);
  }
};

// create employee
const createEmployee = async (employee) => {
  try {
    // Check if employee already exists
    const employeeExists = await employeeRepo.getAllEmployees({
      firstName: employee.firstName,
      lastName: employee.lastName,
    });
    if (employeeExists.length > 0) {
      throw new Error("Employee already exists");
    }
    //check if department exists
    const department = await departmentRepo.getDepartmentById(
      employee.departmentID
    );
    if (!department) {
      throw new Error("Department not found");
    }
    // create employee
    const newEmployee = await employeeRepo.createEmployee(employee);
    //create employee id in employeeshifts collection
    const employeeShifts = {
      employeeId: newEmployee._id,
      shifts: [],
    };
    await employyeShiftsRepo.createEmployeeShifts(employeeShifts);
    return newEmployee;
  } catch (error) {
    throw new Error(error);
  }
};

// update employee info
const updateEmployee = async (id, employee) => {
  try {
    const updatedEmployee = await employeeRepo.updateEmployee(id, employee);
    return updatedEmployee;
  } catch (error) {
    throw new Error(error);
  }
};

// delete employee
const deleteEmployee = async (id) => {
  try {
    //check if employee is a manager and delete him from departments db
    const departments = await departmentRepo.getAllDepartments({
      manager: id,
    });
    if (departments.length > 0) {
      await Promise.all(
        departments.map(async (department) => {
          await departmentRepo.updateDepartment(department._id, {
            manager: "",
          });
        })
      );
    }
    //delete employee from employeeShifts db
    const employeeShifts = await employyeShiftsRepo.getAllEmployeeShifts({
      employeeId: id,
    });
    await employyeShiftsRepo.deleteEmployeeShifts(employeeShifts[0]._id);

    //delete employee
    const deletedEmployee = await employeeRepo.deleteEmployee(id);
    return deletedEmployee;
  } catch (error) {
    throw new Error(error);
  }
};

// get employee shifts info
const getEmployeeShifts = async (id) => {
  try {
    //check if employee exists
    const employee = await employeeRepo.getEmployeeById(id);
    if (!employee) {
      throw new Error("Employee not found");
    }
    //get employee shifts
    const shifts = await employyeShiftsRepo.getAllEmployeeShifts({
      employeeId: id,
    });
    //get shift info
    const info = [];
    await Promise.all(
      shifts[0].shifts.map(async (shift, index) => {
        const shiftInfo = await shiftRepo.getShiftById(shift);
        info.push(shiftInfo);
      })
    );
    console.log(info);
    return info;
  } catch (error) {
    throw new Error(error);
  }
};

//add employee to shift
const addEmployeeToShift = async (id, info) => {
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
      await employyeShiftsRepo.getAllEmployeeShifts({ employeeId: id });
    //check if employee is already in the shift
    if (existingEmployeeShifts[0].shifts.includes(info.shiftId)) {
      throw new Error("Employee already in the shift");
    }
    //add employee to shift
    existingEmployeeShifts[0].shifts.push(info.shiftId);
    const newEmployeeShifts = existingEmployeeShifts[0];
    const updatedEmployeeShifts = await employyeShiftsRepo.updateEmployeeShifts(
      newEmployeeShifts._id,
      newEmployeeShifts
    );
    return updatedEmployeeShifts;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployeeShifts,
  addEmployeeToShift,
};
