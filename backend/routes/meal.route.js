const express = require("express");

const { Mealmodel } = require("../models/meal.model");

const mealRouter = express.Router();

// add meal
mealRouter.post("/create", async (req, res) => {
  try {

  } catch (error) {
    console.log(error);
    res.send({ err: "Something went wrong" });
  }
});

// all meal
mealRouter.get("/", async (req, res) => {
  try {

  } catch (error) {
    console.log(error);
    res.send({ err: "Something went wrong" });
  }
});

// particular meal
mealRouter.get("/:id", async (req, res) => {
  try {

  } catch (error) {
    console.log(error);
    res.send({ err: "Something went wrong" });
  }
});

// update meal
mealRouter.patch("/update/:id", async (req, res) => {
  try {

  } catch (error) {
    console.log(error);
    res.send({ err: "Something went wrong" });
  }
});

// delete meal
mealRouter.delete("/delete/:id", async (req, res) => {
  try {

  } catch (error) {
    console.log(error);
    res.send({ err: "Something went wrong" });
  }
});

module.exports = {
  mealRouter,
};
