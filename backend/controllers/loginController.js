const express = require("express");
const loginServcice = require("../services/loginServices");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const token = await loginServcice.login(req.body);
    res.status(200).json({ accessToken: token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
