const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const { Usermodel } = require("../models/user.model");

const userRouter = express.Router();

// all users
userRouter.get("/", async (req, res) => {
  try {
    const user = await Usermodel.find();
    res.send(user);
  } 
  catch (error) {
    console.log(error);
    res.send({ err: "Something went wrong" });
  }
});

// signup
userRouter.post("/signup", async (req, res) => {
  try {
    const data = req.body;
    const user = new Usermodel(data);

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();
    
    res.send(user);
    console.log("User Registered");
  } 
  catch (error) {
    console.log(error);
    res.send({ err: "Something went wrong" });
  }
});

// login
userRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Usermodel.find({ email });
    if (user.length > 0) {
      let comparePass = bcrypt.compare(password, user[0].password);
      if (comparePass) {
        const token = jwt.sign({ userId: user[0]._id }, process.env.key1);
        res.send({ msg: "Login Success", token });
      } 
      else {
        res.send("Wrong Credential");
      }
    } 
    else {
      res.send("Wrong Credential");
    }
  } 
  catch (error) {
    console.log(error);
    res.send({ err: "Something went wrong" });
  }
});

module.exports = {
  userRouter,
};
