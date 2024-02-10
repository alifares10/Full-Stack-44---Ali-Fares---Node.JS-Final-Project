const jwt = require("jsonwebtoken");
require("dotenv").config();
const Secret = process.env.JWT_SECRET;

const requireAuth = (req, res, next) => {
  // Get the authentication token from the request header
  const token = req.headers["x-access-token"];
  // Check if the JWT token exists
  if (token) {
    // Verify the provided token
    jwt.verify(token, Secret, (err, decodedToken) => {
      if (err) {
        // If token verification fails, log the error and redirect the user to the login page.
        console.log(`Token verification failed: ${err.message}`);
        res
          .status(500)
          .json("You need to be logged in to access this. Please log in");
      } else {
        // If token verification is successful, log the decoded token (optional) and proceed.
        console.log(`Middleware Decoded token: ${decodedToken}`);
        next();
      }
    });
  } else {
    // If no token is provided, redirect the user to the login page.
    res
      .status(500)
      .json("No authentication token found. Please log in to continue.");
  }
};

module.exports = { requireAuth };
