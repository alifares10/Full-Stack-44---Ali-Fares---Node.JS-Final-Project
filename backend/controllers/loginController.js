const express = require("express");
const loginServcice = require("../services/loginServices");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const data = await loginServcice.login(req.body);
    res.status(200).json({ accessToken: data.token, userInfo: data.user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
