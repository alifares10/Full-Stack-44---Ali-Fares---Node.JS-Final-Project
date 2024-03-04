const loginRepo = require("../repositories/loginRepository");
const userServices = require("./userServices");
const jwt = require("jsonwebtoken");

require("dotenv").config();
const Secret = process.env.JWT_SECRET;

const TokenAge = "24h";

const login = async (req, res) => {
  try {
    const { username, email } = req.body;
    const { data: users } = await loginRepo.getAllUsersInfo();

    //check if user exists in the database without case sensitivity
    const user = users.find(
      (user) =>
        user.username.toLowerCase() === username.toLowerCase() &&
        user.email.toLowerCase() === email.toLowerCase()
    );
    if (!user) {
      throw new Error("Invalid username or email");
    }

    //check if this is first time logging in
    const userExists = await userServices.getAllUsers({ fullName: user.name });
    if (userExists.length === 0) {
      //create new user in mongoDB
      console.log("Creating new user");
      await userServices.createUser({ fullName: user.name });
    }

    //create token
    const token = jwt.sign({ id: username }, Secret, { expiresIn: TokenAge });

    //check the users number of actions
    if (req.session.userName) {
      //check if it is the same user logging back in
      if (req.session.userName === user.name) {
        //check if user has reached the maximum number of actions
        if (req.session.actions > req.session.maxActions) {
          throw new Error(
            "Maximum Number Of Actions exceeded.  Please Try Again Tomorrow."
          );
        }
      } else {
        //if its another user logging in reset the actions and user name in the session
        req.session.userName = user.name;
        req.session.actions = 0;
        console.log("New API call count initialized");
      }
    } else {
      //initialize the session
      req.session.userName = user.name;
      console.log("API call count initialized");
    }

    return { token, user };
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  login,
};
