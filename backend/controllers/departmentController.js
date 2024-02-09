const express = require("express");
const departmentService = require("../services/departmentServices");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const filters = req.query;
    const departments = await departmentService.getAllDepartments(filters);
    res.status(200).json(departments);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const department = await departmentService.getDepartmentById(req.params.id);
    res.status(200).json(department);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const newDepartment = await departmentService.createDepartment(req.body);
    res.status(201).json(newDepartment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedDepartment = await departmentService.updateDepartment(
      req.params.id,
      req.body
    );
    res.status(200).json(updatedDepartment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedDepartment = await departmentService.deleteDepartment(
      req.params.id
    );
    res.status(200).json(deletedDepartment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put("/:id/manager", async (req, res) => {
  try {
    const updatedDepartment = await departmentService.assignDepartmentManager(
      req.params.id,
      req.body.managerId
    );
    res.status(200).json(updatedDepartment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/:id/manager", async (req, res) => {
  try {
    const manager = await departmentService.getDepartmentManagerInfo(
      req.params.id
    );
    res.status(200).json(manager);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/:id/employees", async (req, res) => {
  try {
    const employees = await departmentService.getDepartmentEmployees(
      req.params.id
    );
    res.status(200).json(employees);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
