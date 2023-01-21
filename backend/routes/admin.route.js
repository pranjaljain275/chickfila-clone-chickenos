const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const { Employeemodel } = require("../models/admin.model");

const employeeRouter = express.Router();

// all employees
employeeRouter.get("/", async (req, res) => {
  try {
    const employee = await Employeemodel.find();
    res.send(employee);
  } catch (error) {
    console.log(error);
    res.send({ err: "Something went wrong" });
  }
});

// signup
employeeRouter.post("/register", async (req, res) => {
  try {
    const data = req.body;
    const employee = new Employeemodel(data);

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    employee.password = await bcrypt.hash(employee.password, salt);

    await employee.save();

    res.send(employee);
    console.log("employee Registered");
  } catch (error) {
    console.log(error);
    res.send({ err: "Something went wrong" });
  }
});

// login
employeeRouter.post("/login", async (req, res) => {
  try {
    const { idemp, password } = req.body;
    const employee = await Employeemodel.find({ idemp });
    if (employee.length > 0) {
      let comparePass = bcrypt.compare(password, employee[0].password);
      if (comparePass) {
        const empToken = jwt.sign(
          { employeeId: employee[0]._id },
          process.env.key2
        );
        res.send({ msg: "Login Success", empToken });
      } else {
        res.send("Wrong Credential");
      }
    } else {
      res.send("Wrong Credential");
    }
  } catch (error) {
    console.log(error);
    res.send({ err: "Something went wrong" });
  }
});

module.exports = {
  employeeRouter,
};
