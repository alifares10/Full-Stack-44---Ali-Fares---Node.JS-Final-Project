const express = require("express");
const userService = require("../services/userServices");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const filters = req.query;
    const users = await userService.getAllUsers(filters);
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const newUser = await userService.createUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedUser = await userService.deleteUser(req.params.id);
    res.status(200).json(deletedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/:id/actions", async (req, res) => {
  try {
    const actions = await userService.getUserCurrnetActions(req, res);
    res.status(200).json(actions);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
