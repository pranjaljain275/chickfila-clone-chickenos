const express = require("express");
require("dotenv").config();
const cors = require("cors");

const { connection } = require("./config/db");
// const { userAuthenticator } = require("./middlewares/userAuthenticator");
// const { adminAuthenticator } = require("./middlewares/adminAuthenticator");
const { mealRouter } = require("./routes/meal.route");
const { userRouter } = require("./routes/user.route");
const { employeeRouter } = require("./routes/admin.route");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/users", userRouter);
app.use("/employees", employeeRouter);
// app.use(adminAuthenticator);
app.use("/meals", mealRouter);
// app.use(userAuthenticator);

app.get("/", (req, res) => {
  res.send("WELCOME to CHICKENOS");
});

app.listen(process.env.port, async (req, res) => {
  try {
    await connection;
    console.log("Connected to DB");
  } catch (error) {
    console.log(error);
  }
  console.log(`Running Server on Port ${process.env.port}`);
});
