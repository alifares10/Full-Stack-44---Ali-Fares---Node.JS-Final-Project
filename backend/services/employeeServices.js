const employeeRepo = require("../repositories/employeeRepository");
const shiftRepo = require("../repositories/shiftRepository");
const departmentRepo = require("../repositories/departmentRepository");
const employyeShiftsRepo = require("../repositories/employeeShiftsRepository");

const getAllEmployees = async (filters) => {
  try {
    const employees = await employeeRepo.getAllEmployees(filters);
    return employees;
  } catch (error) {
    throw new Error(error);
  }
};

const getEmployeeById = async (id) => {
  try {
    const employee = await employeeRepo.getEmployeeById(id);
    return employee;
  } catch (error) {
    throw new Error(error);
  }
};

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

    //create employee id in employeeShifts collection
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

const updateEmployee = async (id, employee) => {
  try {
    const updatedEmployee = await employeeRepo.updateEmployee(id, employee);
    return updatedEmployee;
  } catch (error) {
    throw new Error(error);
  }
};

const deleteEmployee = async (id) => {
  try {
    //check if employee is a manager and delete him from departments db
    const departments = await departmentRepo.getAllDepartments({
      manager: id,
    });
    //if employee is a manager the make the manager field in department empty
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

//transfer employee to new department
const transferDepartment = async (id, newDepartment) => {
  try {
    //check if employee exists
    const employee = await employeeRepo.getEmployeeById(id);
    if (!employee) {
      throw new Error("Employee not found");
    }

    //check if department exists
    const department = await departmentRepo.getDepartmentById(newDepartment);
    if (!department) {
      throw new Error("Department not found");
    }

    //check if employee is a manager
    const departments = await departmentRepo.getAllDepartments({
      manager: id,
    });
    if (departments.length > 0) {
      //remove employee from manager
      await Promise.all(
        departments.map(async (department) => {
          await departmentRepo.updateDepartment(department._id, {
            manager: "",
          });
        })
      );
    }

    //transfer employee to new department
    const updatedEmployee = await employeeRepo.updateEmployee(id, {
      departmentID: newDepartment,
    });
    return updatedEmployee;
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
  transferDepartment,
};
