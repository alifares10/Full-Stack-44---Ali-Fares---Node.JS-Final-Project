const authSerrvices = require("../services/authServices");
const express = require("express");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await authSerrvices.isAuth();
    res.status(200).json(result);
  } catch (error) {
    console.log(error.message);
    res.status(401).json({ message: error.message });
  }
});

module.exports = router;
