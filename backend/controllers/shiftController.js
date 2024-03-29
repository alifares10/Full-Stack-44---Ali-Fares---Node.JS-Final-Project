const express = require("express");
const shiftService = require("../services/shiftServices");

const router = express.Router();

// Get all shifts
router.get("/", async (req, res) => {
  try {
    const filters = req.query;
    const shifts = await shiftService.getAllShifts(filters);
    res.status(200).json(shifts);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get shift by id
router.get("/:id", async (req, res) => {
  try {
    const shift = await shiftService.getShiftById(req.params.id);
    res.status(200).json(shift);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Create new shift
router.post("/", async (req, res) => {
  try {
    const newShift = await shiftService.createShift(req.body);
    res.status(201).json(newShift);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update shift
router.put("/:id", async (req, res) => {
  try {
    const updatedShift = await shiftService.updateShift(
      req.params.id,
      req.body
    );
    res.status(202).json(updatedShift);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//get employees of a shift
router.get("/:id/employees", async (req, res) => {
  try {
    const employees = await shiftService.getShiftEmployees(req.params.id);
    res.status(200).json(employees);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
