const express = require("express");
const cors = require("cors");
const connectDB = require("./configs/db");
const session = require("express-session");
const userController = require("./controllers/userController");
const departmentController = require("./controllers/departmentController");
const employeeController = require("./controllers/employeeController");
const shiftController = require("./controllers/shiftController");
const employeeShiftsController = require("./controllers/employeeShiftsController");
const loginController = require("./controllers/loginController");
const { requireAuth } = require("./middleware/authMiddleware");
const { limitAPICalls } = require("./middleware/userActionsMiddleware");
const { requestLogger } = require("./middleware/requestLogger");

require("dotenv").config();
const Secret = process.env.JWT_SECRET;
const allowedOrigin = process.env.FRONTEND_URL;

const app = express();
const PORT = 3001;

connectDB();

app.use(
  cors({
    origin: allowedOrigin,
    credentials: true,
  })
);

app.use(express.json());
app.use(
  session({
    secret: Secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.use("/users", limitAPICalls, requestLogger, userController);
app.use("/departments", requireAuth, departmentController);
app.use("/employees", requireAuth, limitAPICalls, employeeController);
app.use("/shifts", requireAuth, shiftController);
app.use("/employeeShifts", requireAuth, employeeShiftsController);
app.use("/login", loginController);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
