const express = require("express");
const cors = require("cors");
const connectDB = require("./configs/db");
// const session = require("express-session");
const userController = require("./controllers/userController");
const departmentController = require("./controllers/departmentController");
const employeeController = require("./controllers/employeeController");
const shiftController = require("./controllers/shiftController");
const employeeShiftsController = require("./controllers/employeeShiftsController");
const loginController = require("./controllers/loginController");
const { requireAuth } = require("./middleware/authMiddleware");

const app = express();
const PORT = 3001;

connectDB();

app.use(cors());
app.use(express.json());

app.use("/users", userController);
app.use("/departments", requireAuth, departmentController);
app.use("/employees", requireAuth, employeeController);
app.use("/shifts", requireAuth, shiftController);
app.use("/employeeShifts", requireAuth, employeeShiftsController);
app.use("/login", loginController);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
