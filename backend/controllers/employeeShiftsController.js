const express = require("express");
const employeeShiftsService = require("../services/employeeShiftsServices");

const router = express.Router();

// Get all employees Shifts
router.get("/", async (req, res) => {
  try {
    const filters = req.query;
    const employeeShifts = await employeeShiftsService.getAllEmployeeShifts(
      filters
    );
    res.status(200).json(employeeShifts);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get employee's shifts by id
router.get("/:id", async (req, res) => {
  try {
    const employeeShifts = await employeeShiftsService.getEmployeeShiftsById(
      req.params.id
    );
    res.status(200).json(employeeShifts);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// update employee's shifts
router.put("/:id", async (req, res) => {
  try {
    const updatedEmployeeShifts =
      await employeeShiftsService.updateEmployeeShifts(req.params.id, req.body);
    res.status(200).json(updatedEmployeeShifts);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete employee's shifts
router.delete("/:id", async (req, res) => {
  try {
    const deletedEmployeeShifts =
      await employeeShiftsService.deleteEmployeeShifts(req.params.id);
    res.status(200).json(deletedEmployeeShifts);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
