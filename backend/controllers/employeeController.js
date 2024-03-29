const express = require("express");
const employeeService = require("../services/employeeServices");

const router = express.Router();

// Get all employees
router.get("/", async (req, res) => {
  try {
    const filters = req.query;
    const employees = await employeeService.getAllEmployees(filters);
    res.status(200).json(employees);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get employee by id
router.get("/:id", async (req, res) => {
  try {
    const employee = await employeeService.getEmployeeById(req.params.id);
    res.status(200).json(employee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Create new employee
router.post("/", async (req, res) => {
  try {
    const newEmployee = await employeeService.createEmployee(req.body);
    res.status(201).json(newEmployee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update employee
router.put("/:id", async (req, res) => {
  try {
    const updatedEmployee = await employeeService.updateEmployee(
      req.params.id,
      req.body
    );
    res.status(200).json(updatedEmployee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete employee
router.delete("/:id", async (req, res) => {
  try {
    const deletedEmployee = await employeeService.deleteEmployee(req.params.id);
    res.status(200).json(deletedEmployee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get the employee's shifts
router.get("/:id/shifts", async (req, res) => {
  try {
    const shifts = await employeeService.getEmployeeShifts(req.params.id);
    res.status(200).json(shifts);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Add employee to shift
router.put("/:id/shifts", async (req, res) => {
  try {
    const updatedEmployeeShifts = await employeeService.addEmployeeToShift(
      req.params.id,
      req.body
    );
    res.status(200).json(updatedEmployeeShifts);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Transfer employee to another department
router.put("/:id/department", async (req, res) => {
  try {
    const updatedEmployee = await employeeService.transferDepartment(
      req.params.id,
      req.body.newDepartment
    );
    res.status(200).json(updatedEmployee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
