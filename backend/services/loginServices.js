const loginRepo = require("../repositories/loginRepository");
const jwt = require("jsonwebtoken");

require("dotenv").config();
const Secret = process.env.JWT_SECRET;

const TokenAge = "24h";

const login = async (login) => {
  try {
    const { username, email } = login;
    const { data: users } = await loginRepo.getAllUsersInfo();
    const user = users.find(
      (user) =>
        user.username.toLowerCase() === username.toLowerCase() &&
        user.email.toLowerCase() === email.toLowerCase()
    );
    if (!user) {
      throw new Error("Invalid username or email");
    }
    const token = jwt.sign({ id: username }, Secret, { expiresIn: TokenAge });
    return { token, user };
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  login,
};
