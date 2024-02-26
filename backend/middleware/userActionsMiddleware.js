const userServices = require("../services/userServices");

const limitAPICalls = async (req, res, next) => {
  // Get user by name from the session

  const user = await userServices.getAllUsers({
    fullName: req.session.userName,
  });
  if (user.length === 0) {
    return res.status(403).json({
      message: "User not found",
    });
  }
  //get the maximum number of actions for the user
  const MAX_CALLS_PER_DAY = user[0].numOfActions;

  console.log("Max Actions count: ", MAX_CALLS_PER_DAY);
  //if the user has not made any actions today
  if (!req.session.actions || req.session.actions === 0) {
    req.session.actions = 1;
    req.session.maxActions = MAX_CALLS_PER_DAY;
  } else {
    //increment the number of actions
    req.session.actions++;
    console.log("API call count incremented");
  }
  //check if the user has reached the maximum number of actions
  if (req.session.actions > MAX_CALLS_PER_DAY) {
    return res.status(403).json({
      message:
        "Maximum Number Of Actions exceeded.  Please Try Again Tomorrow.",
    });
  }

  next();
};

module.exports = { limitAPICalls };
